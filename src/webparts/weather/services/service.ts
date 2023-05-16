import axios from "axios";
import { configurations } from "../constants/constants";
import { IApiResponse, IWeatherInformation, IWeatherRes } from "../models/models";

export class service {
    //service to check if the API key is valid
    public checkAPIKey = async (apiKey:string): Promise<IApiResponse> => {
        const apiResponse:IApiResponse = {} as IApiResponse
        try{
            const checkifValid = await (axios.get(`${configurations.APIValidation}${apiKey}`))
            apiResponse.message = configurations.APIStatusValid
            apiResponse.status = checkifValid.status
            return apiResponse
        }catch(ex){
            apiResponse.message = ex.response.data.message
            apiResponse.status = ex.response.data.cod
            return apiResponse
        }
        
    }
    //service to get the weather information if the location is valid. This only executes if the API key is valid. All checkes before calling this function are made in Weather.tsx
    public getWeatherInformation = async (location:string,APIKey:string,units:string,type:string): Promise<IWeatherInformation> => {
        const weatherInfo:IWeatherInformation = {} as IWeatherInformation
        try {
          const weatherForLoccation: IWeatherRes = (
            await axios.get(
              `${configurations.WeatherAPI}${type===configurations.City?"q=":"zip="}${location}&units=${units}&appid=${APIKey}`
            )
          ).data;
          weatherInfo.locationName = weatherForLoccation.name
          weatherInfo.currentTemperature = weatherForLoccation.main.temp
          weatherInfo.description = weatherForLoccation.weather[0].description
          weatherInfo.humidity = weatherForLoccation.main.humidity
          weatherInfo.windSpeed = weatherForLoccation.wind.speed
          weatherInfo.weatherIcon = weatherForLoccation.weather[0].icon
          return weatherInfo
        }
        catch (ex) {
          // we can add a logger here to log the error.
        }
      };
}