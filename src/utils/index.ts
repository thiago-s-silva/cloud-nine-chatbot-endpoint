import { HTTP_STATUS_CODE } from "./http-status-code-enum";

export class Utils {
  // Private class instance
  private static instance: Utils;

  // Static function to apply the singleton design pattern to avoid multiple utils instances
  public static getInstance(): Utils {
    if (!this.instance) {
      this.instance = new Utils();
    }
    return this.instance;
  }

  // HTTP status code enum
  public HttpStatus = HTTP_STATUS_CODE;

  // Encode query parameters
  public encodeQueryParams<T extends Record<string, any>>(params: T): string {
    return Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&");
  }
}
