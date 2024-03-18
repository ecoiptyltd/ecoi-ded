function parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }
  
function incrementTime(dateStr) {
    let date = parseISOString(dateStr + "Z");
    if (!Date.prototype.toJSON) {
      (function () {
        function pad(number) {
          var r = String(number);
          if (r.length === 1) {
            r = "0" + r;
          }
          return r;
        }
  
        Date.prototype.toJSON = function () {
          return (
            this.getFullYear() +
            "-" +
            pad(this.getMonth() + 1) +
            "-" +
            pad(this.getDate()) +
            "T" +
            pad(this.getHours()) +
            ":" +
            pad(this.getMinutes()) +
            ":" +
            pad(this.getSeconds()) +
            "." +
            String((this.getMilliseconds() / 1000).toFixed(3)).slice(2, 5) +
            "Z"
          );
        };
      })();
    }
  
    date.setMinutes(date.getMinutes() + 1);
  
    return date.toJSON();
  }
  
async function drawChart(id, pollutant, target, dbUrl, type) {
  if(root){
    root.dispose()
  }  
let timeUnit = 'minute';
let timeInterval = 1;

  if(type == 'lte'){
    lineGraphUpdateInterval = lteInt * 1000 * (1 + (1/updateMargin));
    timeUnit = 'second';
    timeInterval = 5;
  }
  if(type == 'lora'){
      lineGraphUpdateInterval = loRaInt * 1000 * (1 + (1/updateMargin));
      timeUnit = 'minute';
      timeInterval = 1;
  }

  am5.addLicense("AM5C387949532")
  var root = am5.Root.new(id);
  
    let title;
    let dbView = "timestamp_data";
    let payloadIndex = 0;
    let mainColour;
    let unit;
    let yLabel;
    let corFactor = 1;
    let filterUpper;
    let filterLower;

    switch (pollutant) {
      case 'pm2.5':
        payloadIndex = 3;
        title = 'PM2.5';
        mainColour = cForestGreen;
        unit = 'µg/m³';
        yLabel = unit;
        filterUpper = dataFilterPm25;
        filterLower = dataFilterLower;
        break;
      case 'pm10':
        payloadIndex = 5;
        title = 'PM10';
        mainColour = cLimeGreen;
        unit = 'µg/m³';
        yLabel = unit;
        corFactor = pm10CorFactor; // Apply correction factor
        filterUpper = dataFilterPm10;
        filterLower = dataFilterLower;
        break;
      case 'temp':
        payloadIndex = 12;
        title = 'Temperature';
        mainColour = cDarkOrange;
        unit = '°C';
        yLabel = unit;
        filterUpper = dataFilterTemp;
        filterLower = dataFilterLower;
        break;
      case 'rh':
        payloadIndex = 13;
        title = 'Relative Humidity';
        mainColour = cSkyBlue;
        unit = '%';
        yLabel = unit;
        filterUpper = dataFilterRh;
        filterLower = dataFilterLower;
        break;
      case 'co2':
        payloadIndex = 14;
        title = 'CO2';
        mainColour = cDarkGrey;
        unit = 'ppm';
        yLabel = unit;
        filterUpper = dataFilterCo2Upper;
        filterLower = dataFilterCo2Lower;
        break;
      case 'tvoc':
        payloadIndex = 15;
        title = 'Total VOC';
        mainColour = cBurlyWood;
        unit = 'ppm';
        yLabel = unit;
        filterUpper = dataFilterTvoc;
        filterLower = dataFilterLower;
        break;
      case 'ws':
        payloadIndex = 18;
        title = 'Wind Speed';
        mainColour = cLightSteelBlue;
        unit = 'km/h';
        yLabel = unit;
        filterUpper = dataFilterWs;
        filterLower = dataFilterLower;
        break;
      default:
        title = 'Graph'
        break;
    }

    // Set Alert Colour depending of if a limit is specified.
    let alertColour = (target == 0) ? mainColour : cOrangeRed;

    root.utc = true;
    root.setThemes([am5themes_Animated.new(root)]);
    
    let endkey = nowDateTime();
    let startKey = calcStartDate(endkey);

    let startInterval = nowDateTime();
    let endInterval = nowDateTime();
  
    let url = `${dbUrl}/_design/views/_view/${dbView}?startkey="${startKey}"&endkey="${endkey}"&inclusive_end=false`;
  
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
          console.log(pollutant);
          console.log(filterUpper);
          console.log(filterLower);
          result.rows.forEach((d) => {

            // Parse string with comma to array
            const value = parseFloat(d.value.split(",")[payloadIndex]);
            console.log(value)
            if(value < filterUpper && value >= filterLower){
              chartData.push({
                date: Date.parse(new Date(d.key).toGMTString()),
                //date: Date.parse(d.key),
                value: value * corFactor,
              });
            }   
          });
        })
        .catch((error) => console.log("error", error));
      return chartData;
    }
  
    var data = await generateChartData();
    
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingBottom: 40
      })
    );
    
    //add Title
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

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineX.set("forceHidden", true);
    cursor.lineY.set("forceHidden", true);
  
    var easing = am5.ease.linear;
  
    // X Axis Settings
    var xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.5,
        groupData: false,
        extraMax: 0.1, // this adds some space in front
        extraMin: -0.1, // this removes some space form th beginning so that the line would not be cut off
        baseInterval: {
          timeUnit: timeUnit,
          count: timeInterval,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 50,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    // Y Axis Settings
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );
  
    // Axis Labels
      var yAxisLabel = am5.Label.new(root, {
        rotation: -90,
        text: yLabel,
        y: am5.p50,
        centerX: am5.p50
      })
      yAxis.children.unshift(yAxisLabel);
      
    // Line Settings
    var series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: pollutant,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        connect: true, // Display missing data
        autoGapcount: 60,
        stroke: am5.color(alertColour),
        fill: am5.color(alertColour),
        visible: true,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{valueY}",
        }),
      })
    );
  
    // Fill Settings
    series.fills.template.setAll({
      fillOpacity: 0.2,
      visible: true,
    });

    data[data.length - 1].bullet = true;
    series.data.setAll(data);
  
    
  
    series.bullets.push(function (root, series, dataItem) {
      // only create sprite if bullet == true in data context
      if (dataItem.dataContext.bullet) {
        var container = am5.Container.new(root, {});
        var circle0 = container.children.push(
          am5.Circle.new(root, {
            radius: 5,
            fill: am5.color(cBlack),
            tooltipText: "{value}",
          })
        );
        var circle1 = container.children.push(
          am5.Circle.new(root, {
            radius: 5,
            fill: am5.color(cBlack),
            tooltipText: "{value}",
          })
        );
  
        circle1.animate({
          key: "radius",
          to: 20,
          duration: 1000,
          easing: am5.ease.out(am5.ease.cubic),
          loops: Infinity,
        });
        circle1.animate({
          key: "opacity",
          to: 0,
          from: 1,
          duration: 1000,
          easing: am5.ease.out(am5.ease.cubic),
          loops: Infinity,
        });
  
        circle0.on("active", function (active, target) {
          if (active) {
            target.setAll({
              showTooltipOn: "always",
              tooltipText: "{valueY}",
            });
          } else {
            target.setAll({
              showTooltipOn: "hover",
              tooltipText: "{valueY}",
            });
          }
          target.showTooltip();
        });
  
        circle1.on("active", function (active, target) {
          if (active) {
            target.setAll({
              showTooltipOn: "always",
              tooltipText: "{valueY}",
            });
          } else {
            target.setAll({
              showTooltipOn: "hover",
              tooltipText: "{valueY}",
            });
          }
          target.showTooltip();
        });
  
        return am5.Bullet.new(root, {
          locationX: undefined,
          sprite: container,
        });
      }
    });
  
    // Scroll Bar
    var scrollbar = chart.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
      orientation: "horizontal",
      height: 60,
      marginLeft: 30,
      marginRight: 30,

    }));
    
    var sbDateAxis = scrollbar.chart.xAxes.push(am5xy.DateAxis.new(root, {
      baseInterval: {
        timeUnit: "minute",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {})
    }));
    
    var sbValueAxis = scrollbar.chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );
    
    var sbSeries = scrollbar.chart.series.push(am5xy.LineSeries.new(root, {
      valueYField: "value",
      valueXField: "date",
      xAxis: sbDateAxis,
      yAxis: sbValueAxis,
      connect: false,
      autoGapcount: 1
    }));

    sbSeries.data.setAll(data);

    // var startLabel = scrollbar.startGrip.children.push(am5.Label.new(root, {
    //   isMeasured: false,
    //   width: 100,
    //   fill: am5.color(0x000000),
    //   centerX: 0,
    //   centerY: 30,
    //   x: am5.p50,
    //   y: 0,
    //   textAlign: "center",
    //   populateText: true
    // }))
    
    // scrollbar.on("start", function(position) {
    //   setTimeout(function() {
    //     startLabel.set("text", root.dateFormatter.format(xAxis.positionToDate(position), "MMM d HH:m"))
    //   }, 50);
    // });
    
    // var endLabel = scrollbar.endGrip.children.push(am5.Label.new(root, {
    //   isMeasured: false,
    //   width: 100,
    //   fill: am5.color(0x000000),
    //   centerX: 100,
    //   centerY: 30,
    //   x: am5.p50,
    //   y: 0,
    //   textAlign: "center",
    //   populateText: true
    // }))
    
    // scrollbar.on("end", function(position) {
    //   setTimeout(function() {
    //     endLabel.set("text", root.dateFormatter.format(xAxis.positionToDate(position), "MMM d HH:m"))
    //   }, 50);
    // });



  // Cursor
    var cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
      })
    );
    cursor.lineY.set("visible", false);
  
    // Real-Time Update Interval
    setInterval(function () {
      addData();
    }, lineGraphUpdateInterval);
  
    // Add Real-Time Data
    async function addData() {
      var lastDataItem = series.dataItems[series.dataItems.length - 1];
      var lastValue = lastDataItem.get("valueY");
      var newValue = -1;
  
      series.data.removeIndex(0);
      await fetch(
        `${dbUrl}/_design/views/_view/${dbView}?startkey="${startInterval}"&endkey="${endInterval}"&inclusive_end=true`,
        requestOptions
      )
        .then((response) => response.json())
        .then(async (result) => {
          await result.rows.forEach((d) => {
            if(parseFloat(d.value) < filterUpper && parseFloat(d.value) >= filterLower){
              series.data.push({
                date: Date.parse(d.key),
                value: (parseFloat(d.value) * corFactor),
              });
            newValue = (parseFloat(d.value) * corFactor);
            }
          });
        })
        .catch((error) => console.log("error", error));
  
      startInterval = incrementTime(startInterval).split("Z")[0];
      endInterval = incrementTime(startInterval).split("Z")[0];
      if (newValue != -1) {
        var newDataItem = series.dataItems[series.dataItems.length - 1];
        newDataItem.animate({
          key: "valueYWorking",
          to: newValue,
          from: lastValue,
          duration: 1500,
          easing: easing,
        });
  
        newDataItem.bullets = [];
        newDataItem.bullets[0] = lastDataItem.bullets[0];
        newDataItem.bullets[0].get("sprite").dataItem = newDataItem;
        series.dataItems[series.dataItems.length - 1].bullets[0] =
          lastDataItem.bullets[0];
        series.dataItems[series.dataItems.length - 1].bullets[0].get(
          "sprite"
        ).dataItem = series.dataItems[series.dataItems.length - 1];
        // reset bullets
        lastDataItem.dataContext.bullet = false;
        lastDataItem.bullets = [];
  
        var animation = newDataItem.animate({
          key: "locationX",
          to: 0.5,
          from: -0.5,
          duration: 1500,
        });
        if (animation) {
          var tooltip = xAxis.get("tooltip");
  
          if (tooltip && !tooltip.isHidden()) {
            animation.events.on("stopped", function () {
              xAxis.updateTooltip();
            });
          }
        }
      }
    }
  
    if(target > 0){
        // In Target Values
        var rangeDate = new Date();
        am5.time.add(rangeDate, "day", Math.round(series.dataItems.length / 2));
        var rangeTime = rangeDate.getTime();

        // add series range
        var seriesRangeDataItem = yAxis.makeDataItem({ value: target, endValue: 0 });
        var seriesRange = series.createAxisRange(seriesRangeDataItem);
        seriesRange.fills.template.setAll({
          visible: true,
          opacity: 0.3,
        });

        seriesRange.fills.template.set("fill", am5.color(cForestGreen));
        seriesRange.strokes.template.set("stroke", am5.color(cForestGreen));

        seriesRangeDataItem.get("grid").setAll({
          strokeOpacity: 1,
          visible: true,
          stroke: am5.color(mainColour),
          strokeDasharray: [2, 2],
        });

        seriesRangeDataItem.get("label").setAll({
          location: 0,
          visible: true,
          text: `${target} ${unit}`,
          inside: true,
          centerX: 0,
          centerY: am5.p100,
          fontWeight: "bold",
        });
    }
    
    
    series.appear(1000);
    chart.appear(1000, 100);
  }