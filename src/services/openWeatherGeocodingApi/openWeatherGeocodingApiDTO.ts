export interface IOpenWeatherGeocodingApiRequestDTO {
  q: string; // City name, state code (only for the US) and country code divided by comma. Please use ISO 3166 country codes.
  limit?: number; // Number of the locations in the API response (up to 5 results can be returned in the API response)
}
interface LocalName {
  [key: string]: string; // Flexible key-value pairs for different language codes
}

interface Location {
  name: string;
  local_names?: LocalName; // Optional, as not all locations have this
  lat: number;
  lon: number;
  country: string;
  state?: string; // Optional, some locations might not have a state
}

export type IOpenWeatherGeocodingApiResponseDTO = Location[];
