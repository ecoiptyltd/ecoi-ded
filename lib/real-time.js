const cBlack = '#000000';
const cDarkGrey = '#A9A9A9';
const cBurlyWood = '#DEB887';
const cSkyBlue = '#87CEEB';
const cLightSteelBlue = '#B0C4DE';
const cForestGreen = '#228B22';
const cLimeGreen = '#32CD32';
const cDarkOrange = '#FF8C00';
const cOrangeRed = '#FF4500';

const loRaInt = 60;         // LoRa Update Interval in seconds
const lteInt = 5;           // LTE Update Interval in seconds
const updateMargin = 10;    // % added to update interval for reliability
const startInt = 24;        // Hours to subtract for the start date
const pm10CorFactor = 2.12  // PM10 Correction factor

const lineGraphUpdateInterval = loRaInt * 1000 * (1 + (1/updateMargin)); // Update interval in miliseconds

const nowDateTime = () => {
    const today = new Date(Date.now());
    const timeZoneOffset = (today.getTimezoneOffset()) / 60;
    let todayLocal;
    if(timeZoneOffset > 0){
        todayLocal = moment(today).add(timeZoneOffset, 'hours');
    } else if (timeZoneOffset < 0){
        todayLocal = moment(today).subtract(timeZoneOffset, 'hours');
    } else {todayLocal = today}
    
    return(
        todayLocal.toJSON() //.slice(0, 19)
    )
}

const calcStartDate = (currentDate) => {
    let date = moment(currentDate).subtract(startInt, 'hours')
    return date.toJSON();
}

const getCouchDBUrl = (cIUD, sUID, node) => {
    
}