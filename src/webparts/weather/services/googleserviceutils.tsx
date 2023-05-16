export const loadMapApi = () : HTMLScriptElement=> {
const mapsUrl = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCNKbX7ryZNu11TzdtExzaTNT86r9c22Is&libraries=places&callback=initMap"`;
const script = document.getElementsByTagName('script');
for(let i = 0; i < script.length; i++){
    if(script[i].src.indexOf(mapsUrl) === 0){
        return script[i];
    }
}
const googleMapScript = document.createElement('script');
googleMapScript.src = mapsUrl;
googleMapScript.async = true;
googleMapScript.defer = true;
window.document.body.appendChild(googleMapScript);
return googleMapScript;
}