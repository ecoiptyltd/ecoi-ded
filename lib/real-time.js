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

const server = 'http://18.156.194.8:5984/'
const pm10Limit = 75        // Set limit for PM10
const pm25Limit = 40        // Set limit for PM2.5

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

async function createGraphElements () {
    const dashboardDiv = document.createElement('div');
        dashboardDiv.id = 'dashboard';
        dashboardDiv.className = 'content-dashboard';
    const dashboardRow = document.createElement('div');
        dashboardRow.className = 'row';
    const wdDiv = document.createElement('div');
        wdDiv.id = 'chartWdDir';
        wdDiv.className = 'chart-wd-gauge col-4';
    const wsDiv = document.createElement('div');
        wsDiv.id = 'chartWsLine';
        wsDiv.className = 'chart-ws-line col-8';
    const pm25Line = document.createElement('div');
        pm25Line.id = 'chartPm25Line';
        pm25Line.className = 'chart-pm25-line';
    const pm10Line = document.createElement('div');
        pm10Line.id = 'chartPm10Line';
        pm10Line.className = 'chart-pm10-line';
    const rhLine = document.createElement('div');
        rhLine.id = 'chartRhLine';
        rhLine.className = 'chart-rh-line';
    const tempLine = document.createElement('div');
        tempLine.id = 'chartTempLine';
        tempLine.className = 'chart-temp-line';
    const co2Line = document.createElement('div');
        co2Line.id = 'chartCo2Line';
        co2Line.className = 'chart-co2-line';
    const tvocLine = document.createElement('div');
        tvocLine.id = 'chartTvocLine';
        tvocLine.className = 'chart-tvoc-line';
    dashboardRow.appendChild(wdDiv);
    dashboardRow.appendChild(wsDiv);
    dashboardDiv.appendChild(dashboardRow);
    dashboardDiv.appendChild(pm25Line);
    dashboardDiv.appendChild(pm10Line);
    dashboardDiv.appendChild(rhLine);
    dashboardDiv.appendChild(tempLine);
    dashboardDiv.appendChild(co2Line);
    dashboardDiv.appendChild(tvocLine);

    document.getElementById('clientSite').appendChild(dashboardDiv);

//     <div id='dashboard' class='content-dashboard'>
//     <div class='row'>
//       <div id='chartWdDir' class='chart-wd-gauge col-4'></div>
//       <div id='chartWsLine' class='chart-ws-line col-8'></div>
//     </div>
//     <div id='chartPm25Line' class='chart-pm25-line'></div>
//     <div id='chartPm10Line' class='chart-pm10-line'></div>
//     <div id='chartRhLine' class='chart-rh-line'></div>
//     <div id='chartTempLine' class='chart-temp-line'></div>
//     <div id='chartCo2Line' class='chart-co2-line'></div>
//     <div id='chartTvocLine' class='chart-tvoc-line'></div>
//   </div>
}

async function createDefaultGraphs (start_dir, end_dir, url) {
    document.getElementById('dashboard').remove();
    await createGraphElements();
    displayContent('content-dashboard');
    let retrieveUrl = server + url
    drawWindDir('chartWdDir', start_dir, end_dir, retrieveUrl);
    drawChart('chartWsLine', 'ws', 0, retrieveUrl);
    drawChart('chartPm25Line', 'pm2.5', pm25Limit, retrieveUrl); // drawChart(div ID, Pollutant, Target Level, dbUrl)
    drawChart('chartPm10Line', 'pm10', pm10Limit, retrieveUrl);
    drawChart('chartTempLine', 'temp', 0, retrieveUrl);
    drawChart('chartRhLine', 'rh', 0, retrieveUrl);
    drawChart('chartCo2Line', 'co2', 0, retrieveUrl);
    drawChart('chartTvocLine', 'tvoc', 0, retrieveUrl);
    
     //drawWindDir(id, siteDirStart, siteDirEnd, dbUrl)
}
