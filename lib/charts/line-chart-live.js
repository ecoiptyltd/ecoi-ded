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
  
  async function drawChart() {
    var root = am5.Root.new("chartdiv");
  
    root.utc = true;
    root.setThemes([am5themes_Animated.new(root)]);
  
    let startKey = "2023-02-12T00:00:00";
    let endkey = nowDateTime();
    //let endkey = "2023-02-14T23:00:00";
  
    let startInterval = nowDateTime();
    let endInterval = nowDateTime();
    //let endInterval = "2023-02-14T23:01:00";
  
    let url = `http://18.156.194.8:5984/isibonelo-nxc0036-node04/_design/views/_view/timestamp_data_pm25?startkey="${startKey}"&endkey="${endkey}"&inclusive_end=false`;
  
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
          console.log(result);
          result.rows.forEach((d) => {
            chartData.push({
              // date: Date.parse(new Date(d.key).toGMTString()),
              date: Date.parse(d.key),
              value: parseFloat(d.value),
            });
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
      })
    );
  
    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineX.set("forceHidden", true);
    cursor.lineY.set("forceHidden", true);
  
    var easing = am5.ease.linear;
  
    var xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.5,
        groupData: false,
        extraMax: 0.1, // this adds some space in front
        extraMin: -0.1, // this removes some space form th beginning so that the line would not be cut off
        baseInterval: {
          timeUnit: "minute",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minGridDistance: 50,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );
  
    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );
  
    var series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{valueY}",
        }),
      })
    );
  
    data[data.length - 1].bullet = true;
    series.data.setAll(data);
  
    series.fills.template.setAll({
      fillOpacity: 0.2,
      visible: true,
    });
  
    series.bullets.push(function (root, series, dataItem) {
      // only create sprite if bullet == true in data context
      if (dataItem.dataContext.bullet) {
        var container = am5.Container.new(root, {});
        var circle0 = container.children.push(
          am5.Circle.new(root, {
            radius: 5,
            fill: am5.color(0xff0000),
            tooltipText: "{value}",
          })
        );
        var circle1 = container.children.push(
          am5.Circle.new(root, {
            radius: 5,
            fill: am5.color(0xff0000),
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
  
    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );
  
    var cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
      })
    );
    cursor.lineY.set("visible", false);
  
    setInterval(function () {
      addData();
    }, lineGraphUpdateInterval);
  
    async function addData() {
      var lastDataItem = series.dataItems[series.dataItems.length - 1];
      var lastValue = lastDataItem.get("valueY");
      var newValue = -1;
  
      series.data.removeIndex(0);
      await fetch(
        `http://18.156.194.8:5984/isibonelo-nxc0036-node04/_design/views/_view/timestamp_data_pm25?startkey="${startInterval}"&endkey="${endInterval}"&inclusive_end=true`,
        requestOptions
      )
        .then((response) => response.json())
        .then(async (result) => {
          await result.rows.forEach((d) => {
            series.data.push({
              date: Date.parse(d.key),
              value: parseFloat(d.value),
            });
  
            newValue = parseFloat(d.value);
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
  
    var rangeDate = new Date();
    am5.time.add(rangeDate, "day", Math.round(series.dataItems.length / 2));
    var rangeTime = rangeDate.getTime();
  
    // add series range
    var seriesRangeDataItem = yAxis.makeDataItem({ value: 17, endValue: 0 });
    var seriesRange = series.createAxisRange(seriesRangeDataItem);
    seriesRange.fills.template.setAll({
      visible: true,
      opacity: 0.3,
    });
  
    seriesRange.fills.template.set("fill", am5.color(0x000000));
    seriesRange.strokes.template.set("stroke", am5.color(0x000000));
  
    seriesRangeDataItem.get("grid").setAll({
      strokeOpacity: 1,
      visible: true,
      stroke: am5.color(0x000000),
      strokeDasharray: [2, 2],
    });
  
    seriesRangeDataItem.get("label").setAll({
      location: 0,
      visible: true,
      text: "Target",
      inside: true,
      centerX: 0,
      centerY: am5.p100,
      fontWeight: "bold",
    });
  
    series.appear(1000);
    chart.appear(1000, 100);
  }
  
  console.log(incrementTime(nowDateTime()))