import { OpenWeatherAPI } from "../../services/openWeatherApi";
import OpenWeatherGeocodingAPI from "../../services/openWeatherGeocodingApi";
import { IWeatherResponseDTO } from "./weatherDTO";

export class WeatherUseCase {
  constructor(private readonly openWeatherApi: OpenWeatherAPI, private readonly openWeatherGeocodingApi: OpenWeatherGeocodingAPI) {
    if (!openWeatherApi) {
      throw new Error("OpenWeatherAPI is required");
    }
    if (!openWeatherGeocodingApi) {
      throw new Error("OpenWeatherGeocodingAPI is required");
    }
  }

  public async getWeatherForLocation(location: string): Promise<IWeatherResponseDTO> {
    // Get the lat and lon for the provided location
    const { lat, lon } = await this.getLatAndLonForLocation(location);

    // Get the weather information based on the location latitute and longitude
    const locationWeather = await this.getWeatherForLatAndLon(lat, lon);

    return locationWeather;
  }

  private async getWeatherForLatAndLon(lat: number, lon: number): Promise<IWeatherResponseDTO> {
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

  private async getLatAndLonForLocation(location: string): Promise<{ lat: number; lon: number }> {
    const geoResponse = await this.openWeatherGeocodingApi.getGeolocation({
      q: location,
    });

    return {
      lat: geoResponse[0].lat,
      lon: geoResponse[0].lon,
    };
  }
}
