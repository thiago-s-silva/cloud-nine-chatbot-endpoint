export interface IOpenWeatherRequestDTO {
  lat: number; // Latitude (required)
  lon: number; // Longitude (required)
  exclude?: string; // Comma-separated list of parts to exclude (optional)
  units?: "standard" | "metric" | "imperial"; // Units of measurement (optional)
  lang?: string; // Language code for output (optional)
}

export interface IOpenWeatherResponseDTO {
  lat: number; // Latitude of location
  lon: number; // Longitude of location
  timezone: string; // Timezone name (e.g., "America/Chicago")
  timezone_offset: number; // Timezone offset in seconds (e.g., -18000 for GMT-5)

  current: {
    dt: number; // Current time in Unix timestamp
    sunrise: number; // Sunrise time in Unix timestamp
    sunset: number; // Sunset time in Unix timestamp
    temp: number; // Current temperature in Kelvin
    feels_like: number; // Temperature feels like in Kelvin
    pressure: number; // Atmospheric pressure in hPa
    humidity: number; // Relative humidity as a percentage
    dew_point: number; // Dew point in Kelvin
    uvi: number; // Current UV index
    clouds: number; // Cloudiness as a percentage
    visibility: number; // Average visibility in meters
    wind_speed: number; // Wind speed in meter/sec
    wind_deg: number; // Wind direction in degrees
    wind_gust: number; // Wind gust speed in meter/sec
    weather: Array<{
      // Weather conditions (typically only one)
      id: number; // Weather condition ID
      main: string; // Group of weather parameters (e.g., "Rain")
      description: string; // Weather condition description
      icon: string; // Weather icon ID
    }>;
  };

  minutely: Array<{
    // Minutely forecast (if available)
    dt: number; // Time of the minutely data in Unix timestamp
    precipitation: number; // Precipitation amount in mm
  }>;

  hourly: Array<{
    // Hourly forecast
    dt: number; // Time of the hourly data in Unix timestamp
    temp: number; // Temperature in Kelvin
    feels_like: number; // Temperature feels like in Kelvin
    pressure: number; // Atmospheric pressure in hPa
    humidity: number; // Relative humidity as a percentage
    dew_point: number; // Dew point in Kelvin
    uvi: number; // UV index
    clouds: number; // Cloudiness as a percentage
    visibility: number; // Average visibility in meters
    wind_speed: number; // Wind speed in meter/sec
    wind_deg: number; // Wind direction in degrees
    wind_gust: number; // Wind gust speed in meter/sec
    weather: Array<{
      // Weather conditions (typically only one)
      id: number; // Weather condition ID
      main: string; // Group of weather parameters (e.g., "Rain")
      description: string; // Weather condition description
      icon: string; // Weather icon ID
    }>;
    pop: number; // Probability of precipitation as a percentage
  }>;

  daily: Array<{
    // Daily forecast
    dt: number; // Time of the daily data in Unix timestamp
    sunrise: number; // Sunrise time in Unix timestamp
    sunset: number; // Sunset time in Unix timestamp
    moonrise: number; // Moonrise time in Unix timestamp
    moonset: number; // Moonset time in Unix timestamp
    moon_phase: number; // Moon phase illumination fraction 0-1
    summary: string; // Summary of the daily weather conditions
    temp: {
      // Temperature for the day
      day: number; // Daytime temperature in Kelvin
      min: number; // Minimum temperature in Kelvin
      max: number; // Maximum temperature in Kelvin
      night: number; // Nighttime temperature in Kelvin
      eve: number; // Evening temperature in Kelvin
      morn: number; // Morning temperature in Kelvin
    };
    feels_like: {
      // Temperature feels like for the day
      day: number; // Daytime temperature feels like in Kelvin
      night: number; // Nighttime temperature feels like in Kelvin
      eve: number; // Evening temperature feels like in Kelvin
      morn: number; // Morning temperature feels like in Kelvin
    };
    pressure: number; // Atmospheric pressure in hPa
    humidity: number; // Relative humidity as a percentage
    dew_point: number; // Dew point in Kelvin
    wind_speed: number; // Wind speed in meter/sec
    wind_deg: number; // Wind direction in degrees
    wind_gust: number; // Wind gust speed in meter/sec
    weather: Array<{
      // Weather conditions (typically only one)
      id: number; // Weather condition ID
      main: string; // Group of weather parameters (e.g., "Rain")
      description: string; // Weather condition description
      icon: string; // Weather icon ID
    }>;
    clouds: number; // Cloudiness as a percentage
    pop: number; // Probability of precipitation as a percentage
    rain: number; // Rain volume for the last 24 hours in mm
    uvi: number; // Maximum UV index for the day
  }>;

  alerts: Array<{
    sender_name: string;
    event: string;
    start: number;
    end: number;
    description: string;
    tags: Array<string>;
  }>;
}
