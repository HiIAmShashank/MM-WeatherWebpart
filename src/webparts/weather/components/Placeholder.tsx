import * as React from "react";
import { AnimationClassNames, PrimaryButton, getTheme, mergeStyles } from "office-ui-fabric-react";
import { IPlaceHolderProps } from "./IPlaceHolderProps";
import styles from "./Weather.module.scss";
export const Placeholder = (props: IPlaceHolderProps): JSX.Element => {
    const theme = getTheme();
    const contentClass = mergeStyles([
        {
            backgroundImage: `url(${require("../assets/placeholderimage.jpg")})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            color: theme.palette.white,
            lineHeight: '25px',
            padding: '20px',
        },
        AnimationClassNames.scaleUpIn100,
    ]);
    function openPropertyPane(): void {
        props.context.propertyPane.open();
    }

    // const content = ;
    return (
        <div className={contentClass}>
            <p>
                Hello! You have reached the Weather WebPart setup page.<br />
                The web component retrieves weather data from Open Weather Map.<br />
                To use the web webpart, you will need to generate an API key, which you can do at the following link:<br />
                <a className = {styles.link} target="_blank" rel="noreferrer" href="https://home.openweathermap.org/api_keys">Link to create the API</a><br />
                The webpart will display forecast information for that specific location by entering a city or zip code.<br />
                Click on configure to begin!

            </p>
            <p className={styles.errorMessage}>{props.description}</p>
            <PrimaryButton
                text="Configure"
                onClick={openPropertyPane}
            />
        </div>
    )
};