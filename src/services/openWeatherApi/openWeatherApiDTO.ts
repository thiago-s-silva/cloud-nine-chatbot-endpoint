export interface IOpenWeatherRequestDTO {
  lat: number; // Latitude (required)
  lon: number; // Longitude (required)
  exclude?: string; // Comma-separated list of parts to exclude (optional)
  units?: "standard" | "metric" | "imperial"; // Units of measurement (optional)
  lang?: string; // Language code for output (optional)
}

// Coordinates of the location
interface Coord {
  lon: number; // Longitude
  lat: number; // Latitude
}

// Weather details
interface Weather {
  id: number; // Weather condition ID
  main: string; // Group of weather parameters (Rain, Snow, Extreme, etc.)
  description: string; // Weather condition within the group
  icon: string; // Weather icon ID
}

// Main weather data
interface Main {
  temp: number; // Current temperature in Kelvin
  feels_like: number; // Temperature as perceived by humans in Kelvin
  temp_min: number; // Minimum temperature at the moment in Kelvin
  temp_max: number; // Maximum temperature at the moment in Kelvin
  pressure: number; // Atmospheric pressure in hPa (hectopascals)
  humidity: number; // Humidity percentage
}

// Wind data
interface Wind {
  speed: number; // Wind speed in meters/second
  deg: number; // Wind direction in degrees (meteorological)
}

// Cloudiness data
interface Clouds {
  all: number; // Cloudiness percentage
}

// System data
interface Sys {
  type: number; // Internal parameter
  id: number; // Internal parameter/system ID
  country: string; // Country code (e.g., "US")
  sunrise: number; // Sunrise time in Unix timestamp
  sunset: number; // Sunset time in Unix timestamp
}

// Complete weather response
export interface IOpenWeatherResponseDTO {
  coord: Coord; // Coordinates of the location
  weather: Weather[]; // Array of weather details
  base: string; // Internal parameter
  main: Main; // Main weather data
  visibility: number; // Visibility in meters
  wind: Wind; // Wind data
  clouds: Clouds; // Cloudiness data
  dt: number; // Data calculation time in Unix timestamp
  sys: Sys; // System data
  timezone: number; // Shift in seconds from UTC
  id: number; // City ID
  name: string; // City name
  cod: number; // HTTP status code of the response
}
