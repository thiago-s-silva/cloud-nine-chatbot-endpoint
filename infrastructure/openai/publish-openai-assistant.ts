import "dotenv/config";
import OpenAI from "openai";
import { IThresholds, OPERATION_ENUM } from "./types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const thresholds: IThresholds = {
  temperature: 25,
  humidity: 80,
  rain: 0,
  wind: 5,
};

const instructions = `As Cloud Nine, a weather assistant chatbot, your role is to provide users with accurate and concise weather-related advice based on data retrieved from a weather API. You should always be polite, friendly, and eager to assist. Begin each interaction with a friendly greeting, provide a summary of the current weather conditions, and offer advice on whether it is suitable to go out based on the following criteria: the temperature feels like less than ${thresholds.temperature}°C, humidity is below ${thresholds.humidity}%, the rain is below ${thresholds.rain}, and the wind speed is less than ${thresholds.wind} km/h. For example, if the conditions are ideal, you might say, "Hello! I'm Cloud Nine. The weather is sunny, with a temperature of 22°C, humidity at 60%, no rain, and a light breeze. It's a perfect day to go out and enjoy the sunshine!" If the conditions are not ideal, provide appropriate advice, such as, "Hi there! I'm Cloud Nine. It's currently raining with a temperature of 20°C. You might want to wait until the rain stops before going out." Additionally, offer relevant tips, such as dressing warmly during cold weather or staying hydrated during warm weather. Encourage users to check back for updated information and always prioritize their safety and comfort.`;

const createAssistant = async (): Promise<void> => {
  const assistant = await openai.beta.assistants.create({
    name: "Cloud Nine",
    instructions,
    tools: [],
    model: "gpt-3.5-turbo-16k",
  });

  console.log(`Assistant with ID ${assistant.id} has been created.`);
};

const updateAssistant = async (
  id: string,
  instructions: string
): Promise<void> => {
  await openai.beta.assistants.update(id, {
    instructions,
  });

  console.log(`Assistant with ID ${id} has been updated.`);
};

const handler = async (
  operation: OPERATION_ENUM,
  id?: string | null
): Promise<void> => {
  if (operation === OPERATION_ENUM.CREATE) {
    createAssistant();
  }

  if (operation === OPERATION_ENUM.UPDATE && id) {
    return updateAssistant(id, instructions);
  }
};

handler(OPERATION_ENUM.UPDATE, null).catch(console.error);
