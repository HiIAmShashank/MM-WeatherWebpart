
# Weather using Open Weather Maps API (free tier)

This web part provides you the ability to display basic weather information for one location on a web page. The web part depends on a service provided by Open Weather Maps and uses their free tier API key to fetch the information

The webpart provides a configuration screen that will help you in creating an API key and will show errors if incorrect information is provided in the property pane during configuration.


## Screenshots

![App Screenshot](https://i.imgur.com/FUbv8Q7.png)

# How to use this web part on your web pages
1. Place the page you want to add this web part to in edit mode.
3. Search for and insert the Weather web part.
3. Configure the web part to update its properties.

# Configurable properties
The weather webpart can be configured with the following properties
| Label                                    | Property         | Type   | Required | Description                                                  |
| ---------------------------------------- | ---------------- | ------ | -------- | ------------------------------------------------------------ |
| APIKey                                   | APIKey           | string | Yes      | Used to connect to open weather maps api. Can be generated using [this link](https://home.openweathermap.org/users/sign_up)                 |
| Please choose a location type            | cityOrZip        | string | Yes      | Helps the API to make the query to the appropriate end point |
| Enter a location (City name or Zip Code) | location         | string | Yes      | Location/Zip for which the weather needs to be displated     |
| Please select a temperature unit         | temperatureUnits | string | Yes      | Measurement units (Imperial or Metric)                       |

# Installation Steps
1. Clone or download the repo
2. Run npm Install
3. You will need to replace the <tenantURL/sites/sitename> in manifest.json with your own tenant url and site.
4. Use gulp serve or npm run serve depending on if spfx-fastserve has been installed
5. Add the webpart weather in a section column of your choice.

# Deployment
1. Run npm install
1. Run npm build
2. Run npm bundle --ship
3. Run package-solution --ship
4. Upload the sppkg file in the sharepoint/solutions folder to the tenent level app catalog or site collection app catalog based on your needs.
5. You can enable installation to all sites or have it enabled by default without installation form the site collection owner.

# Important notes
1. The api does not provide a way to validate if the API key is valid or not. Currently the webpart uses London as a default location after the 32 character api key has been entered to validate if the key is correct. Based on the status, the webparts checks for other validations. A deep dive into documentation or best practices can be done to find a better way.
2. The free tier api key will throttle and block any subsequent requests made to the api if too many requests are made. This can be abused and is handled in the code by ensuring that no calls are made unless the length is 32 characters and all other parameters are provided. 
3. Currently, the api does not provide a way to get data from both city and zip directly by the same endpoint. Also, the zip code api requires a zipcode and a country code seperated by a comma. Some zip codes have a space in between them and not all users will be able to correctly use this field. We can use google's places API to get location information and use details from its response to feed into the end point of the open weather map api. This will improve usablity and avoid errors.

