// Default Graph Container Specifications (in px)
const sizeGraphWidth = 600;
const sizeGraphHeight = 400;
const marginsGraph = {
  top: 20,
  right: 20,
  bottom: 50,
  left: 70
}

// Date format
const dateFormat = d3.timeParse("%Y-%m-%d %H:%M:%S");

const displayGraph = (name, xValue, yValue, containerID, sizeW, sizeH, margins, periodStart, periodEnd, dateFormat) => {
  const margin = margins,
    width = sizeW - margin.left - margin.right,
    height = sizeH - margin.top - margin.bottom;
  console.log('Margins:')
  console.log(margin);

  const parseTime = dateFormat;
  console.log('Date Format:')
  console.log(parseTime);

  // set the ranges
  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  console.log(xValue);
  // define the line
  let valueline = d3.line()
    .x((d) => {
      return x(d.date);
    })
    .y((d) => {
      return y(d.value);
    });

    console.log(valueline);

  // append the svg obgect to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  let svg = d3.select(containerID).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //'./php/readData.php'
  d3.json('./test.json').then((data) => {
    //console.log(data);
    data.forEach((d) => {
      d.GsmT = parseTime(d.GsmT);
      d.PbV = parseFloat(d.PbV);
    });

    // Scale the range of the data
    x.domain(d3.extent(data, (d) => {
      return d.GsmT;
    }));
    y.domain([0, d3.max(data, (d) => {
      return d.PbV;
    })]);

    // Add the valueline path.
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

    // Add the x Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add the y Axis
    svg.append("g")
      .call(d3.axisLeft(y));

  });

}

const displayBatteryVoltage = () => {
  // set the dimensions and margins of the graph
  const margin = {
      top: 20,
      right: 20,
      bottom: 50,
      left: 70
    },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // parse the date / time
  const parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S");

  // set the ranges
  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  // define the line
  let valueline = d3.line()
    .x((d) => {
      return x(d.GsmT);
    })
    .y((d) => {
      return y(d.PbV);
    });

  // append the svg obgect to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  let svg = d3.select("#batteryVoltage").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");


  //'./php/readData.php'
  d3.json('./test.json').then((data) => {
    console.log(data);
    data.forEach((d) => {
      d.GsmT = parseTime(d.GsmT);
      d.PbV = parseFloat(d.PbV);
    });


    // Scale the range of the data
    x.domain(d3.extent(data, (d) => {
      return d.GsmT;
    }));
    y.domain([0, d3.max(data, (d) => {
      return d.PbV;
    })]);

    // Add the valueline path.
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

    // Add the x Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add the y Axis
    svg.append("g")
      .call(d3.axisLeft(y));

  });
}

const displayEnviroTemp = () => {
  // set the dimensions and margins of the graph
  const margin = {
      top: 20,
      right: 20,
      bottom: 50,
      left: 70
    },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // parse the date / time
  const parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S");

  // set the ranges
  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  // define the line
  let valueline = d3.line()
    .x(function (d) {
      return x(d.GsmT);
    })
    .y(function (d) {
      return y(d.Pt);
    });

  // append the svg obgect to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  let svg = d3.select("#enviroTemp").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");


  //'./php/readData.php'
  d3.json('./php/readData.php').then(function (data) {
    console.log(data);
    data.forEach(function (d) {
      d.GsmT = parseTime(d.GsmT);
      d.Pt = parseFloat(d.Pt);
    });


    // Scale the range of the data
    x.domain(d3.extent(data, function (d) {
      return d.GsmT;
    }));
    y.domain([0, d3.max(data, function (d) {
      return d.Pt;
    })]);

    // Add the valueline path.
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

    // Add the x Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add the y Axis
    svg.append("g")
      .call(d3.axisLeft(y));

  });
}

const displayPolVOC = () => {
  // set the dimensions and margins of the graph
  const margin = {
      top: 20,
      right: 20,
      bottom: 50,
      left: 70
    },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // parse the date / time
  const parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S");

  // set the ranges
  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  // define the line
  let valueline = d3.line()
    .x(function (d) {
      return x(d.GsmT);
    })
    .y(function (d) {
      return y(d.Stvoc);
    });

  // append the svg obgect to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  let svg = d3.select("#polVOC").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");


  //'./php/readData.php'
  d3.json('./php/readData.php').then(function (data) {
    console.log(data);
    data.forEach(function (d) {
      d.GsmT = parseTime(d.GsmT);
      d.Stvoc = parseFloat(d.Stvoc);
    });


    // Scale the range of the data
    x.domain(d3.extent(data, function (d) {
      return d.GsmT;
    }));
    y.domain([0, d3.max(data, function (d) {
      return d.Stvoc;
    })]);

    // Add the valueline path.
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

    // Add the x Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add the y Axis
    svg.append("g")
      .call(d3.axisLeft(y));

  });
}

const displayPolCO2 = () => {
  // set the dimensions and margins of the graph
  const margin = {
      top: 20,
      right: 20,
      bottom: 50,
      left: 70
    },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // parse the date / time
  const parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S");

  // set the ranges
  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  // define the line
  let valueline = d3.line()
    .x(function (d) {
      return x(d.GsmT);
    })
    .y(function (d) {
      return y(d.Sco2);
    });

  // append the svg obgect to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  let svg = d3.select("#polCO2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");


  //'./php/readData.php'
  d3.json('./php/readData.php').then(function (data) {
    console.log(data);
    data.forEach(function (d) {
      d.GsmT = parseTime(d.GsmT);
      d.Sco2 = parseFloat(d.Sco2);
    });


    // Scale the range of the data
    x.domain(d3.extent(data, function (d) {
      return d.GsmT;
    }));
    y.domain([0, d3.max(data, function (d) {
      return d.Sco2;
    })]);

    // Add the valueline path.
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

    // Add the x Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add the y Axis
    svg.append("g")
      .call(d3.axisLeft(y));

  });
}