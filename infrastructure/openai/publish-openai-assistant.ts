import "dotenv/config";
import OpenAI from "openai";
import { IThresholds, OPERATION_ENUM } from "./types";
import fs from "fs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const thresholds: IThresholds = {
  temperature: 25,
  humidity: 80,
  rain: 0,
  wind: 5,
};

const instructions = fs.readFileSync("infrastructure/openai/instructions.txt", { encoding: "utf-8" });
const weatherFunctionCalling: OpenAI.Beta.Assistants.AssistantTool = {
  type: "function",
  function: {
    name: "getCurrentTemperature",
    description: "Returns the current temperature in Celsius for the given location",
    parameters: {
      type: "object",
      properties: {
        location: {
          type: "string",
          description: "The location for which you want the temperature e.g., San Francisco, CA",
        },
      },
      required: ["location"],
    },
  },
};

const createAssistant = async (): Promise<void> => {
  const assistant = await openai.beta.assistants.create({
    name: "Cloud Nine",
    instructions,
    tools: [weatherFunctionCalling],
    model: "gpt-3.5-turbo-16k",
  });

  console.log(`Assistant with ID ${assistant.id} has been created.`);
};

const updateAssistant = async (id: string, instructions: string): Promise<void> => {
  await openai.beta.assistants.update(id, {
    instructions,
    tools: [weatherFunctionCalling],
    model: "gpt-3.5-turbo-16k",
  });

  console.log(`Assistant with ID ${id} has been updated.`);
};

const handler = async (operation: OPERATION_ENUM, id?: string | null): Promise<void> => {
  if (operation === OPERATION_ENUM.CREATE) {
    createAssistant();
  }

  if (operation === OPERATION_ENUM.UPDATE && id) {
    return updateAssistant(id, instructions);
  }
};

handler(OPERATION_ENUM.CREATE, null).catch(console.error);
