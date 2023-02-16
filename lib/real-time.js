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

const lineGraphUpdateInterval = 70001; // Update interval in miliseconds

console.log(nowDateTime())
