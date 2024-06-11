import { Utils } from "../../utils";
import { IOpenWeatherGeocodingApiRequestDTO, IOpenWeatherGeocodingApiResponseDTO } from "./openWeatherGeocodingApiDTO";
import "dotenv/config";

export default class OpenWeatherGeocodingAPI {
  private static instance: OpenWeatherGeocodingAPI;

  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor(private readonly utils: Utils) {
    this.apiKey = process.env.OPENWEATHER_API_KEY;
    this.apiUrl = process.env.OPENWEATHER_GEOCODING_ENDPOINT;

    if (!this.apiKey) {
      throw new Error("OPENWEATHER_API_KEY environment variable is not set.");
    }

    if (!this.apiUrl) {
      throw new Error("OPENWEATHER_GEOCODING_ENDPOINT environment variable is not set.");
    }
  }

  public static getInstance(utils: Utils): OpenWeatherGeocodingAPI {
    if (!OpenWeatherGeocodingAPI.instance) {
      OpenWeatherGeocodingAPI.instance = new OpenWeatherGeocodingAPI(utils);
    }
    return OpenWeatherGeocodingAPI.instance;
  }

  public async getGeolocation(params: IOpenWeatherGeocodingApiRequestDTO): Promise<IOpenWeatherGeocodingApiResponseDTO> {
    return new Promise(async (resolve, reject) => {
      try {
        // Parse the params to an encoded URI for query params
        const encodedParams = this.utils.encodeQueryParams(params);

        const endpoint = `${this.apiUrl}?${encodedParams}&appid=${this.apiKey}`;

        // Fetch data from API
        const response = await fetch(endpoint);

        // Check the response status code
        const OKAY_STATUS_CODES = 200;
        if (response.status !== OKAY_STATUS_CODES) {
          reject(new Error(`\n[OpenWeather Geocoding API] Failed to fetch geocoding data. Status code: ${response.status}`));
        }

        // Parse the response data
        const data: IOpenWeatherGeocodingApiResponseDTO = await response.json();
        console.debug(`\n[OpenWeather Geocoding API] Successfully fetched geocoding data`);

        // Resolve the promise with the parsed data
        resolve(data);
      } catch (error) {
        console.debug(`\n[OpenWeather Geocoding API] Failed fetched geocoding data`);
        reject(error);
      }
    });
  }
}
