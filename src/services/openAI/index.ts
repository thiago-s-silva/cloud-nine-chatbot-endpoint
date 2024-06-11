import "dotenv/config";
import OpenAI from "openai";
import { IOpenAiToolFunctions } from "./openAIDTO";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class OpenAiService extends OpenAI {
  private openai: OpenAI;
  private assistantId: string;

  constructor() {
    super({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.openai = openai;
    this.assistantId = process.env.DEV_ASSISTANT_ID;
  }

  public async getAssistant(): Promise<OpenAI.Beta.Assistants.Assistant> {
    return this.openai.beta.assistants.retrieve(this.assistantId);
  }

  public async createNewThread(): Promise<OpenAI.Beta.Threads.Thread> {
    return this.openai.beta.threads.create();
  }

  public async sendMessage(threadId: string, message: string): Promise<OpenAI.Beta.Threads.Messages.Message> {
    return this.openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: message,
    });
  }

  public async runThreadMessage(message: string): Promise<OpenAI.Beta.Threads.Runs.Run> {
    return this.openai.beta.threads.createAndRun({
      assistant_id: this.assistantId,
      thread: {
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      },
    });
  }

  public async createPollRun(threadId: string): Promise<OpenAI.Beta.Threads.Runs.Run> {
    return this.openai.beta.threads.runs.createAndPoll(threadId, {
      assistant_id: this.assistantId,
    });
  }

  public async handleRunStatus(run: OpenAI.Beta.Threads.Runs.Run, threadId: string, toolFunctions: IOpenAiToolFunctions) {
    // Check if the run is completed
    if (run.status === "completed") {
      let messages = await this.openai.beta.threads.messages.list(threadId);

      console.debug("\n[OpenAiService] Run completed!", JSON.stringify(messages.data));

      return messages.data;
    } else if (run.status === "requires_action") {
      console.debug("\n[OpenAiService] Run needs tool function action. RAG trigged!!!");

      return await this.handleRequiresAction(run, threadId, toolFunctions);
    } else {
      console.error("\n[OpenAiService] Run did not complete:", JSON.stringify(run.last_error, null, 2));
      throw new Error(run.last_error.message);
    }
  }

  private async handleRequiresAction(run: OpenAI.Beta.Threads.Runs.Run, threadId: string, toolFunctions: IOpenAiToolFunctions) {
    // Check if there are tools that require outputs
    if (run.required_action && run.required_action.submit_tool_outputs && run.required_action.submit_tool_outputs.tool_calls) {
      // Loop through each tool in the required action section
      const toolOutputs = await Promise.all(
        run.required_action.submit_tool_outputs.tool_calls.map(async (tool) => {
          // Try to retrieve the current pending tool function
          const pendingToolFunction = toolFunctions[tool.function.name];

          // Check if the pending tool function was matched
          if (pendingToolFunction) {
            console.debug(`\n[OpenAIService] Pending tool function matched: ${tool.function.name}`);

            // Get the tool function parameter catched from the user message
            const toolFunctionParameter = tool.function.arguments["location"];

            if (!toolFunctionParameter) {
              throw new Error("toolFunctionParameter location is undefined");
            }

            console.debug(`\n[OpenAIService] Tool Function parameter catched: ${toolFunctionParameter}`);

            // Call the tool function
            const toolFunctionOutput = await pendingToolFunction(toolFunctionParameter);
            console.debug("[OpenAIService] Tool Function Output:", toolFunctionOutput);

            return {
              tool_call_id: tool.id,
              output: toolFunctionOutput,
            };
          } else {
            throw new Error(`tool function ${tool.function.name} not mapped`);
          }
        })
      );

      // Submit all tool outputs at once after collecting them in a list
      if (toolOutputs.length > 0) {
        run = await this.openai.beta.threads.runs.submitToolOutputsAndPoll(threadId, run.id, { tool_outputs: toolOutputs });
        console.log("Tool outputs submitted successfully.");
      } else {
        console.log("No tool outputs to submit.");
      }

      // Check status after submitting tool outputs
      return this.handleRunStatus(run, threadId, toolFunctions);
    }
  }
}
