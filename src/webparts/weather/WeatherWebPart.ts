import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
  PropertyPaneDropdown,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
// import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'WeatherWebPartStrings';
import { Weather } from './components/Weather';
import { IWeatherProps } from './components/IWeatherProps';
import { configurations } from './constants/constants';

export interface IWeatherWebPartProps {
  APIKey: string;
  location: string;
  temperatureUnits: string;
  context: WebPartContext;
  errorMessage: string
  isVerified: boolean;
  cityOrZip: string;
}

export default class WeatherWebPart extends BaseClientSideWebPart<IWeatherWebPartProps> {
  private temperatureUnits: IPropertyPaneDropdownOption[] = [{ key: configurations.Imperial, text: configurations.Imperial }, { key: configurations.Metric, text: configurations.Metric }];
  private cityOrZip: IPropertyPaneDropdownOption[] = [{ key: configurations.City, text: configurations.City }, { key: configurations.Zip, text: configurations.Zip }];


  public render(): void {
    const element: React.ReactElement<IWeatherProps> = React.createElement(
      Weather,
      {
        APIKey: this.properties.APIKey,
        location: this.properties.location,
        temperatureUnits: this.properties.temperatureUnits,
        context: this.context,
        isVerified: this.properties.isVerified,
        errorMessage: this.properties.errorMessage,
        cityOrZip: this.properties.cityOrZip
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('APIKey', {
                  label: strings.APIKeyFieldLabel,
                  maxLength: 32
                }),
                PropertyPaneDropdown('cityOrZip', {
                  label: strings.cityOrZipFieldLabel,
                  options: this.cityOrZip
                }),
                PropertyPaneTextField('location', {
                  label: strings.LocationFieldLabel
                }),
                PropertyPaneDropdown('temperatureUnits', {
                  label: strings.TemperatureFieldLabel,
                  options: this.temperatureUnits
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
