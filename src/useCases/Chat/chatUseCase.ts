import { IChatUseCaseResponseDTO } from "./chatDTO";
import { Utils } from "../../utils";
import { OpenAiService } from "../../services/openAI";
import { WeatherUseCase } from "../Weather/weatherUseCase";

export class ChatUseCase {
  constructor(private readonly utils: Utils, private readonly openAiService: OpenAiService, private readonly weatherUseCase: WeatherUseCase) {
    if (!this.utils) {
      throw new Error("Utils is required");
    }
    if (!this.openAiService) {
      throw new Error("OpenAiService is required");
    }
    if (!this.weatherUseCase) {
      throw new Error("WeatherUseCase is required");
    }
  }

  public async execute(message: string): Promise<IChatUseCaseResponseDTO> {
    // Create a new open ai thread
    const thread = await this.openAiService.createNewThread();
    console.debug(`\n[ChatUseCase] New thead created: ${thread.id}`);

    // Create a new thread message for the current conversation
    const threadMessage = await this.openAiService.sendMessage(thread.id, message);
    console.debug(`\n[ChatUseCase] New thead message created: ${threadMessage.id}`);

    // Create a pool run for the new thread
    const threadPoolRun = await this.openAiService.createPollRun(thread.id);
    console.debug(`\n[ChatUseCase] Thread run initiated: ${threadPoolRun.id}`);
    console.debug("required action:", JSON.stringify(threadPoolRun.required_action, null, 2));

    // Handle the thread message run processing
    const threadResponse = await this.openAiService.handleRunStatus(threadPoolRun, thread.id, {
      getCurrentTemperature: this.weatherUseCase.getWeatherForLocation,
    });
    console.debug(`\n[ChatUseCase] Thread response: ${threadResponse}`);

    return {
      statusCode: this.utils.HttpStatus.OK,
      data: {
        message,
        response: threadResponse,
      },
    };
  }
}
