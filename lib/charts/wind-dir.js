async function drawWindDir(id, siteDirStart, siteDirEnd, dbUrl, type) {
  am5.addLicense("AM5C387949532")
  if(type == 'lte'){
    lineGraphUpdateInterval = lteInt * 1000 * (1 + (1/updateMargin));
  }
  if(type == 'lora'){
      lineGraphUpdateInterval = loRaInt * 1000 * (1 + (1/updateMargin));
  }
  var root = am5.Root.new(id);
    

    let title = 'Wind Direction';
    let dbView = 'timestamp_data';
    let mainColour = cLightSteelBlue;
    let unit = '°';
    let corFactor = 1;

    // Set Alert Colour depending of if a limit is specified.
    //let alertColour = (target == 0) ? mainColour : cOrangeRed;

    //root.utc = true;
    root.setThemes([am5themes_Animated.new(root)]);
    
    let endkey = nowDateTime();
    let startKey = calcStartDate(endkey);

    let startInterval = nowDateTime();
    let endInterval = nowDateTime();
    const payloadIndex = 17;
  
    let url = `${dbUrl}/_design/views/_view/${dbView}?descending=true&limit=1`;
  
    let username = "ecoiwebreader",
      password = "3!3m3nta!r";
  
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic " + btoa(username + ":" + password));
  
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
  
    async function generateChartData() {
      var chartData = [];
  
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          result.rows.forEach((d) => {
            const value = parseFloat(d.value.split(",")[payloadIndex]);
            if(value < dataFilterWd && value >= dataFilterLower){
              chartData.push({
                // date: Date.parse(new Date(d.key).toGMTString()),
                date: Date.parse(d.key),
                value: value,
              });
            }
          });
        })
        .catch((error) => console.log("error", error));
      return chartData;
    }

    // Add Pointer
    var data = await generateChartData();
   
    // Create Radar Chart
    var chart = root.container.children.push(
        am5radar.RadarChart.new(root, {
            panX: false,
            panY: false,
            startAngle: -90,
            endAngle: 270,
            paddingBottom: 40,
            innerRadius: -20
        })
      );

    // Create Axis renderer
    var axisRenderer = am5radar.AxisRendererCircular.new(root, {
      strokeOpacity: 0.2,
      minGridDistance: 30
  });
    // Enable Ticks
    axisRenderer.ticks.template.setAll({
      visible: true,
      strokeOpacity: 0.5
    });
    // Disable Grid
    axisRenderer.grid.template.setAll({
      visible: false
    });

    // Add Axis
    var axis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
          maxDeviation: 0,
          min: 0,
          max: 360,
          strictMinMax: true,
          renderer: axisRenderer
      })
    );

    // Add Pointer
    let handDataItem = axis.makeDataItem({
      value: data[0].value
    })

    let hand = handDataItem.set('bullet', am5xy.AxisBullet.new(root, {
      sprite: am5radar.ClockHand.new(root, {
        radius: am5.percent(80),
        innerRadius: -70,
        pinRadius: 0,
        topWidth: 25,
        bottomWidth: 1
      })
    }))

    // Pointer Colour
    hand.get('sprite').hand.setAll({
      fill: am5.color(cBlack),
      fillOpacity: 0.9
    })
   
    
    axis.createAxisRange(handDataItem)
    // Function to set range variables
    function createRange(start, end, color, label) {
      var rangeDataItem = axis.makeDataItem({
        value: start,
        endValue: end
      });
      var range = axis.createAxisRange(rangeDataItem);
  
      rangeDataItem.get("axisFill").setAll({
        visible: true,
        fill: color,
        fillOpacity: 0.8
      });
      
      rangeDataItem.get("tick").setAll({
        visible: false
      });
      
      rangeDataItem.get("label").setAll({
        text: label,
        inside: true,
        radius: 5,
        fontSize: "0.9em",
        fill: am5.color(0xffffff)
      });
    }

    // Create range on chart
    let dir = (siteDirStart < siteDirEnd) ? true : false;
    switch (dir) {
      case true:
        createRange(siteDirStart, siteDirEnd, am5.color(cDarkOrange), "Site");
        createRange(siteDirEnd, 360, am5.color(cForestGreen), 'Other');
        createRange(0, siteDirStart, am5.color(cForestGreen), 'Other');
        break;
      case false:
        createRange(siteDirStart, 360, am5.color(cDarkOrange), "Site");
        createRange(0, siteDirEnd, am5.color(cDarkOrange), "Site");
        createRange(siteDirEnd, siteDirStart, am5.color(cForestGreen), "Other");
      default:
        break;
    }

    // Add Title
    chart.children.unshift(am5.Label.new(root, {
      text: title,
      fontSize: 20,
      fontWeight: "300",
      textAlign: "center",
      x: am5.percent(50),
      y: am5.percent(100),
      centerX: am5.percent(50),

      paddingTop: 0,
      paddingBottom: 0
    }));

     // Real-Time Update Interval
     setInterval(function () {
       addData();
     }, lineGraphUpdateInterval);

     // Add Real-Time Data
    
     async function addData() {
       await fetch(
         url,
         requestOptions
       )
         .then((response) => response.json())
         .then(async (result) => {
           await result.rows.forEach((d) => {
            const value = parseFloat(d.value.split(",")[payloadIndex]);
            if(value < dataFilterWd && value >= dataFilterLower){
              handDataItem.animate({
                key: "value",
                to: value,
                duration: 800,
                easing: am5.ease.out(am5.ease.cubic)
              });
            }
            
         })
         .catch((error) => console.log("error", error));
  
         })
        }
    
    
    //series.appear(1000);
    chart.appear(1000, 100);
  }