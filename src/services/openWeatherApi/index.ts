import { Utils } from "../../utils";
import { IOpenWeatherRequestDTO, IOpenWeatherResponseDTO } from "./openWeatherApiDTO";
import "dotenv/config";

export class OpenWeatherAPI {
  private static instance: OpenWeatherAPI;

  public static getInstance(utils: Utils): OpenWeatherAPI {
    if (!OpenWeatherAPI.instance) {
      OpenWeatherAPI.instance = new OpenWeatherAPI(utils);
    }
    return OpenWeatherAPI.instance;
  }

  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor(private readonly utils: Utils) {
    this.apiKey = process.env.OPENWEATHER_API_KEY;
    this.apiUrl = process.env.OPENWEATHER_ENDPOINT;
  }

  public async getWeather(params: IOpenWeatherRequestDTO): Promise<IOpenWeatherResponseDTO> {
    return new Promise(async (resolve, reject) => {
      try {
        // Parse the params to an encoded URI for query params
        const encodedParams = this.utils.encodeQueryParams(params);

        const endpointRequest = `${this.apiUrl}?${encodedParams}&appid=${this.apiKey}`;

        // Fetch data from API
        const response = await fetch(endpointRequest);

        // Check the response status code
        const OKAY_STATUS_CODES = 200;
        if (response.status !== OKAY_STATUS_CODES) {
          console.debug(
            `[OpenWeather API]: Failed to fetch weather data.\nRequest: ${endpointRequest}\nResponse: ${JSON.stringify(response, null, 2)}`
          );
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
