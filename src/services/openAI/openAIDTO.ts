import { IWeatherResponseDTO } from "../../useCases/Weather/weatherDTO";

export interface IOpenAiToolFunctions {
  getCurrentTemperature: (location: string) => Promise<IWeatherResponseDTO>;
}

export interface IOpenAiFunctionResponse {
  tool_call_id: string;
  output: string | object | number;
}
