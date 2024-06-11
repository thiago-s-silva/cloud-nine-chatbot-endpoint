import { IOpenWeatherRequestDTO, IOpenWeatherResponseDTO } from "./openWeatherApiDTO";
import utils from "../../utils";

export default class OpenWeatherAPI {
  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY;
    this.apiUrl = process.env.OPENWEATHER_ENDPOINT;
  }

  public async getWeather(params: IOpenWeatherRequestDTO): Promise<IOpenWeatherResponseDTO> {
    return new Promise(async (resolve, reject) => {
      try {
        // Parse the params to an encoded URI for query params
        const encodedParams = utils.encodeQueryParams(params);

        // Fetch data from API
        const response = await fetch(`${this.apiUrl}?${encodedParams}&appid=${this.apiKey}`);

        // Check the response status code
        const OKAY_STATUS_CODES = 200;
        if (response.status !== OKAY_STATUS_CODES) {
          reject(new Error(`Failed to fetch weather data. Status code: ${response.status}`));
        }

        // Parse the response data
        const data: IOpenWeatherResponseDTO = await response.json();

        // Resolve the promise with the parsed data
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
}
