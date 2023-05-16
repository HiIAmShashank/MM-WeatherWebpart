import * as React from "react";
import { IWeatherProps } from "./IWeatherProps";
import { Placeholder } from "./Placeholder";
import { service } from "../services/service";
import { IApiResponse, IWeatherInformation } from "../models/models";
import styles from "./Weather.module.scss";
import { configurations } from "../constants/constants";
import { capitalizeAllFirstLetters } from "../utils/utils";
export const Weather = (props: IWeatherProps): JSX.Element => {
  const [showPlaceholder, setShowPlaceholder] = React.useState(true); //used to set the placeholder to configure the webpart
  const [apiDescription, setApiDescription] = React.useState(""); //used to set the description of the error
  const [isAPIKeyValid, setIsAPIKeyValid] = React.useState(false); // used to check if the API key is valid
  const [weaterInformation, setWeatherInformation] = React.useState<IWeatherInformation>(null); //used to set the weather information
  const services = new service()
  //used to check if the location is valid. Takes in the location, API key, units and type of location as parameters
  //to check if location is valid, it queries the API and checks if the response is valid
  const checkIfLocationIsValid = (location: string, APIKey: string,units:string,type:string): boolean => {
    if (!location || location.length < 3) {
      setApiDescription(configurations.APIDescriptionInvalidLocation)
      return false
    }
    if (!isAPIKeyValid) {
      setApiDescription(configurations.APIDescriptionInvalidAPIKey)
      return false
    }
    services.getWeatherInformation(location, APIKey, units,type).then((response: IWeatherInformation) => {
      if (!response) {
        setApiDescription(configurations.APIDescriptionLocationNotFound)
        setShowPlaceholder(true)
        return
      }
      setWeatherInformation(response)
      setShowPlaceholder(false)
    }).catch((error) => {
      //can add toast here to show if any api disastrously fails
    })

  }
  //used to validate the API key. Takes in the API key as a parameter
  //since the API key needs to be exactly 32 characters, unless the 32 character length is met, it will show an error
  //if the API key is valid, it will query the API to check if the API key is valid
  //since there is no API to check if the API key is valid, it will check if the response is valid for a default location
  const validateAPIKey = (): boolean => {
    setIsAPIKeyValid(false)
    if (!props.APIKey || props.APIKey.length !== 32) {
      setApiDescription(configurations.APIDescriptionInvalidAPIKey)
      setShowPlaceholder(true)
      return false
    }
    services.checkAPIKey(props.APIKey).then((response: IApiResponse) => {
      if (response.status === 200) {
        setIsAPIKeyValid(true)
      }
      if (response.status === 401 || response.status === 403 || response.status === 400 || response.status === 404 || response.status === 500 || response.status === 409) {
        setIsAPIKeyValid(false)
        setApiDescription(response.message)
        setShowPlaceholder(true)
      }
    }).catch((error) => {
     //can add toast here to show if any api disastrously fails
    })

  }
  //effect that runs when the API key is changed
  React.useEffect(() => {
    validateAPIKey()
  }, [props.APIKey])
  //effect that runs when the location, API key status, units and type of location is changed
  React.useEffect(() => {
    if (!isAPIKeyValid) {
      return
    }
    if(!props.cityOrZip){
      setApiDescription(configurations.APIDescriptionLocationType)
      return
    }
    if(!props.temperatureUnits){
      setApiDescription(configurations.APIDescriptionUnits)
      return
    }
    //if all conditions are met, it will check if the location is valid
    checkIfLocationIsValid(props.location, props.APIKey,props.temperatureUnits,props.cityOrZip)
  }, [props.location, isAPIKeyValid,props.temperatureUnits,props.cityOrZip])
  return (
    <>
      {showPlaceholder? <><Placeholder context={props.context} description={apiDescription} /></> : <>
        <div className={styles.blogWrapper}>
          <div className={styles.blogCard}>
            <div className={styles.cardImg}><img alt="locationImage" src={configurations.CardImageLink} />
              <h1>{weaterInformation.locationName} - {weaterInformation.currentTemperature}&deg;{props.temperatureUnits===configurations.Imperial?"F":"C"}</h1>
            </div>
            <div className={styles.cardText}>
              <img alt={weaterInformation.description} className={styles.weatherImage}src={`${configurations.WeatherImage}${weaterInformation.weatherIcon}@2x.png`} />
              {capitalizeAllFirstLetters(weaterInformation.description)}
            </div>
            <div className={styles.detailsParent}>
            <div className={styles.details}>
              <div>Humidity</div>
              <div>{weaterInformation.humidity}%</div>
            </div>
            <div className={styles.details}>
              <div>Wind Speed</div>
              <div>{weaterInformation.windSpeed} {props.temperatureUnits===configurations.Metric?"m/s":"mph"}</div>
            </div>
            </div>
          </div>
        </div>
      </>}
    </>
  )
};
