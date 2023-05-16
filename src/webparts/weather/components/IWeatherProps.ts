import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IWeatherProps {
  APIKey: string;
  location: string;
  temperatureUnits: string;
  context: WebPartContext;
  isVerified: boolean;
  errorMessage: string;
  cityOrZip: string;
}
