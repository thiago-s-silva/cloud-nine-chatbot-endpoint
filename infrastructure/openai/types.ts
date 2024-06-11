export enum OPERATION_ENUM {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
}

export interface IThresholds {
  temperature: number;
  humidity: number;
  rain: number;
  wind: number;
}
