import { IChatUseCaseResponseDTO } from "./chatDTO";
import { Utils } from "../../utils";
import OpenWeatherGeocodingAPI from "../../services/openWeatherGeocodingApi";
import { OpenWeatherAPI } from "../../services/openWeatherApi";

export class ChatUseCase {
  constructor(
    private readonly utils: Utils,
    private readonly openWeatherGeocodingApi: OpenWeatherGeocodingAPI,
    private readonly openWeatherApi: OpenWeatherAPI
  ) {
    if (!this.utils) {
      throw new Error("Utils is required");
    }
    if (!this.openWeatherGeocodingApi) {
      throw new Error("OpenWeatherGeocodingAPI is required");
    }

    if (!this.openWeatherApi) {
      throw new Error("OpenWeatherAPI is required");
    }
  }

  public async execute(): Promise<IChatUseCaseResponseDTO> {
    const location = "New York";

    const weather = await this.getWeatherForLatAndLon(40.7127281, -74.0060152);

    return {
      statusCode: this.utils.HttpStatus.OK,
      data: {
        message: "Successfull API call",
        weather,
      },
    };
  }

  private async getLatAndLonForLocation(location: string): Promise<{ lat: number; lon: number }> {
    const geoResponse = await this.openWeatherGeocodingApi.getGeolocation({
      q: location,
    });

    return {
      lat: geoResponse[0].lat,
      lon: geoResponse[0].lon,
    };
  }

  private async getWeatherForLatAndLon(lat: number, lon: number) {
    const weatherResponse = await this.openWeatherApi.getWeather({
      lat,
      lon,
    });

    const temperatureFeelsLike = weatherResponse.main.feels_like - 273.15; // Convert from Kelvin to Celsius
    const humidity = weatherResponse.main.humidity;
    const rain = weatherResponse.weather.some((condition) => condition.main.toLowerCase() === "rain") ? 1 : 0;
    const windSpeed = weatherResponse.wind.speed;

    return {
      temperatureFeelsLike,
      humidity,
      rain,
      windSpeed,
    };
  }
}
