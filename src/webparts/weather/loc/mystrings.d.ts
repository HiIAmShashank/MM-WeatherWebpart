declare interface IWeatherWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  APIKeyFieldLabel: string;
  LocationFieldLabel: string;
  cityOrZipFieldLabel: string;
  TemperatureFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
}

declare module 'WeatherWebPartStrings' {
  const strings: IWeatherWebPartStrings;
  export = strings;
}
