// ****************************************************
// MAPBOX

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VvaSIsImEiOiJjajcxcDE1eHUwMmx2Mnh0NG02Z3Qzemg3In0.ASSq7sWjbgWJ31bh3VoU6g';

const defaultMapCenter = [27, -28];
const defaultMapZoom = 4;
const boundaryFillStyle = {
                      'fill-color': '#ff0000',
                      'fill-opacity': 0.1
                    };
const boundaryOutlineStyle = {
                          'line-color': '#ff0000',
                          'line-opacity': 0.8,
                          'line-width': 2
                        };
const realTimeMarkerStyle = {
                            'circle-radius': 4,
                            'circle-stroke-width': 2,
                            'circle-color': '#FFA500',
                            'circle-stroke-color': 'white'
                            };

const siteEditMap = new mapboxgl.Map({
  container: 'siteEditMap', // container ID
  style: 'mapbox://styles/mapbox/satellite-streets-v11', // style URL
  center: defaultMapCenter, // starting position [lng, lat]
  zoom: defaultMapZoom // starting zoom
});

const siteMap = new mapboxgl.Map({
  container: 'siteMap', // container ID
  style: 'mapbox://styles/mapbox/satellite-streets-v11', // style URL
  center: defaultMapCenter, // starting position [lng, lat]
  zoom: defaultMapZoom // starting zoom
});

const mapOnClick = (map, layer) => {
  switch (map) {
    case 'siteEditMap':
      siteEditMap.on('click', `${layer}`, (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const content = e.features[0].properties.Name;
    
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
    
        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(content)
          .addTo(siteEditMap);
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      siteEditMap.on('mouseenter', `${layer}`, () => {
        siteEditMap.getCanvas().style.cursor = 'pointer';
        });
        
      // Change it back to a pointer when it leaves.
      siteEditMap.on('mouseleave', `${layer}`, () => {
        siteEditMap.getCanvas().style.cursor = '';
        });
    break;
        
    case 'siteMap':
      siteMap.on('click', `${layer}`, (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const content = e.features[0].properties.Name;
    
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
    
        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(content)
          .addTo(siteEditMap);
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      siteMap.on('mouseenter', `${layer}`, () => {
        siteMap.getCanvas().style.cursor = 'pointer';
        });
        
      // Change it back to a pointer when it leaves.
      siteMap.on('mouseleave', `${layer}`, () => {
        siteMap.getCanvas().style.cursor = '';
        });
      break;
    default:
      break;
  }

}

const resetMap = (map, sourceID, layersArray) => {
  console.log('reset map')
  console.log(layersArray);
  switch (map) {
    case 'siteEditMap':
      for (const layer of layersArray) {
        siteEditMap.removeLayer(layer);
        console.log(layer)
      }
      console.log(sourceID)
      siteEditMap.removeSource(sourceID);
      siteEditMap.setCenter(defaultMapCenter);
      siteEditMap.setZoom(defaultMapZoom);
      break;
    case 'siteMap':
      for (const layer of layersArray) {
        siteMap.removeLayer(layer);
        console.log(layer)
      }
      console.log(sourceID)
      siteMap.removeSource(sourceID);
      siteMap.setCenter(defaultMapCenter);
      siteMap.setZoom(defaultMapZoom);
  }

}

const clearMapSource = (map, sourceID) => {
  switch (map) {
    case 'siteEditMap':
      siteEditMap.removeSource(sourceID);
      break;
    case 'siteMap':
      siteMap.removeSource(sourceID);
      break;
    default:
      break;
  }
}

const clearMapLayer = (map, sourceID) => {
  switch (map) {
    case 'siteEditMap':
      siteEditMap.removeLayer(sourceID);
      break;
    case 'siteMap':
      siteMap.removeLayer(sourceID);
      break;
    default:
      break;
  }

}

// *****************************************************
// READ JSON FROM STORAGE
const checkJsonExist = (clientUID, siteUID) => {
  clientStorage.child(clientUID).child(siteUID).child('location')
    .listAll()
    .then((res) => {
      if (res) {
        return true;
      } else {
        return false
      }
    })
}

const readJsonFromFile = (clientUID, siteUID, map, type) => {
  let jsonType;
  switch (type) {
    case 'location':
      jsonType = 'location';
      break;
    case 'real-time-location':
      jsonType = 'real-time-location';
      break;
    default:
      break;
  }
  clientStorage.child(clientUID).child(siteUID).child(jsonType)
    .listAll()
    .then((res) => {
      res.items.forEach((fileRef) => {
        fileRef.getMetadata()
          .then((metadata) => {
            let uploadDate = metadata.updated;
            let fileName = metadata.name;
            switch (map) {
              case 'siteEditMap':
                fileRef.getDownloadURL()
                  .then((url) => {
                    $.getJSON(url, (data) => {
                      // Add GeoJSON as Mapbox Source
                      switch (jsonType) {
                        case 'location':
                          siteEditMap.addSource('site', {
                            type: 'geojson',
                            data: url
                          });
    
                          // Display Polygon Fill
                          siteEditMap.addLayer({
                            'id': 'site-fill',
                            'type': 'fill',
                            'source': 'site',
                            'paint': boundaryFillStyle,
                            'filter': ['==', '$type', 'Polygon']
                          });
    
                          // Display Polygon Boundary
                          siteEditMap.addLayer({
                            'id': 'site-boundary',
                            'type': 'line',
                            'source': 'site',
                            'paint': boundaryOutlineStyle,
                            'filter': ['==', '$type', 'Polygon']
                          });
    
                          fitMapToBounds(data, 'siteEditMap');
                          
                          break;
                        case 'real-time-location':
                          // Add GeoJSON as Mapbox Source
                          siteEditMap.addSource('realTime', {
                            type: 'geojson',
                            data: url
                          });
                          // Display Marker
                          siteEditMap.addLayer({
                            'id': 'rt-markers',
                            'type': 'circle',
                            'source': 'realTime',
                            'paint': realTimeMarkerStyle,
                            'filter': ['==', ['get', 'Status'], 'Active']
                          });
                          mapOnClick('siteEditMap', 'rt-markers');

                          break;
                        default:
                          break;
                      }
                    })
                  })
                break;
              case 'siteMap':
                fileRef.getDownloadURL()
                  .then((url) => {
                    $.getJSON(url, (data) => {
                      // Add GeoJSON as Mapbox Source
                      switch (jsonType) {
                        case 'location':
                          siteMap.addSource('site', {
                            type: 'geojson',
                            data: url
                          });
    
                          // Display Polygon Fill
                          siteMap.addLayer({
                            'id': 'site-fill',
                            'type': 'fill',
                            'source': 'site',
                            'paint': boundaryFillStyle,
                            'filter': ['==', '$type', 'Polygon']
                          });
    
                          // Display Polygon Boundary
                          siteMap.addLayer({
                            'id': 'site-boundary',
                            'type': 'line',
                            'source': 'site',
                            'paint': boundaryOutlineStyle,
                            'filter': ['==', '$type', 'Polygon']
                          });
    
                          fitMapToBounds(data, 'siteMap');
                          break;
                        case 'real-time-location':
                          // Add GeoJSON as Mapbox Source
                          siteMap.addSource('realTime', {
                            type: 'geojson',
                            data: url
                          });
                          // Display Marker
                          siteMap.addLayer({
                            'id': 'rt-markers',
                            'type': 'circle',
                            'source': 'realTime',
                            'paint': realTimeMarkerStyle,
                            'filter': ['==', ['get', 'Status'], 'Active']
                          });
                          mapOnClick('siteMap', 'rt-markers');
                        break;
                        default:
                          break;
                      }
                    })
                  })
                break;
              default:
                break;
            }
          })
      })
    })
}

// Fit Map to Polygon Bounds
const fitMapToBounds = (data, map) => {
  // Geographic coordinates of the geoJSON
  let coordinates = data.features[0].geometry.coordinates[0];
  // Create a 'LngLatBounds' with both corners at the first coordinate.
  const bounds = new mapboxgl.LngLatBounds(
    coordinates[0],
    coordinates[0]
  );

  // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
  for (const coord of coordinates) {
    bounds.extend(coord);
  }
  switch (map) {
    case 'siteEditMap':
      siteEditMap.fitBounds(bounds, {
        padding: 150
      });
      break;
    case 'siteMap':
      siteMap.fitBounds(bounds, {
        padding: 150
      });
      break;
    default:
      break;
  }

}

// *****************************************************
// SHAPEFILE UPLOAD
function readerLoad() {
  if (this.readyState !== 2 || this.error) {
    return;
  } else {
    worker.data(this.result, [this.result]);
  }
}

function handleZipFile(file) {

  var reader = new FileReader();
  reader.onload = readerLoad;
  reader.readAsArrayBuffer(file);
}

const convertShp2Json = (clientUID, siteUID, category, inputID) => {
  const fileRef = document.getElementById(inputID)
  const file = fileRef.files[0];
  if (file) {
    loadshp({
      url: file,
      encoding: 'utf-8',
      EPSG: 4326
    }, function (geojson) {
      if (siteEditMap.getSource('site')) {
        clearMapLayer('siteEditMap', 'site-fill');
        clearMapLayer('siteEditMap', 'site-boundary');
        clearMapSource('siteEditMap', 'site');
      }
      // Add GeoJSON as Mapbox Source
      siteEditMap.addSource('site', {
        type: 'geojson',
        data: geojson
      });

      // Display Polygon Fill
      siteEditMap.addLayer({
        'id': 'site-fill',
        'type': 'fill',
        'source': 'site',
        'paint': {
          'fill-color': '#ff0000',
          'fill-opacity': 0.4
        },
        'filter': ['==', '$type', 'Polygon']
      });

      // Display Polygon Boundary
      siteEditMap.addLayer({
        'id': 'site-boundary',
        'type': 'line',
        'source': 'site',
        'paint': {
          'line-color': '#ff0000',
          'line-opacity': 0.8,
          'line-width': 3
        },
        'filter': ['==', '$type', 'Polygon']
      });

      // Fit Map to Polygon Bounds
      // Geographic coordinates of the geoJSON
      let coordinates = geojson.features[0].geometry.coordinates[0];
      // Create a 'LngLatBounds' with both corners at the first coordinate.
      const bounds = new mapboxgl.LngLatBounds(
        coordinates[0],
        coordinates[0]
      );

      // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
      for (const coord of coordinates) {
        bounds.extend(coord);
      }
      siteEditMap.fitBounds(bounds, {
        padding: 150
      });
      saveGeoJSON(clientUID, siteUID, category, "site_boundary", geojson)
    });
  } else {
    window.alert('Please Choose a File First.')
  }


}

// Upload and Save GeoJSON directly
const saveRealTimeLocations = (clientUID, siteUID, category, inputID) => {
  const fileRef = document.getElementById(inputID)
  const file = fileRef.files[0];

  if (file) {
    let fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
      let geojson = fileReader.result;
      console.log("1" + geojson)
      geojson = JSON.parse(geojson);
      //console.log("2" + geojson)
      //geojson = JSON.parse(geojson);
      //console.log("3" + geojson)
      //geojson = geojson.replace(/[\r\n\ ]+/gm, "");
      //console.log("4" + geojson)
      //geojson = geojson.replace(/\\\//g, "");
      //console.log("4" + geojson)
      //geojson = geojson.replace("\\", "");
      saveGeoJSON(clientUID, siteUID, category, "real_time_locations", geojson);

      if (siteEditMap.getSource('realTime')) {
        clearMapLayer('siteEditMap', 'rt-markers');
        clearMapSource('siteEditMap', 'realTime');
      }
      // Add GeoJSON as Mapbox Source
      siteEditMap.addSource('realTime', {
        type: 'geojson',
        data: geojson
      });

      // Display Marker
      siteEditMap.addLayer({
        'id': 'rt-markers',
        'type': 'circle',
        'source': 'realTime',
        'paint': {
          'circle-radius': 4,
          'circle-stroke-width': 2,
          'circle-color': '#FFA500',
          'circle-stroke-color': 'white'
          }
        //'filter': ['==', '$properties.Status', 'Active']
      });

      
    }
  } else {
    window.alert('Please Choose a File First.')
  }
}

// Save GeoJSON to file in Storage
// Category = location
const saveGeoJSON = (clientUID, siteUID, category, from, geojson) => {
  let fileName;
  let uploadStatusID;
  switch (from) {
    case "site_boundary":
      fileName = 'site_boundary.json';
      uploadStatusID = 'uploadStatusSHP';
      break;
    case "real_time_locations":
      fileName = 'real_time_locations.json';
      uploadStatusID = 'uploadStatusRealTimeGeoJSON';
    default:
      break;
  }
  const type = 'application/json';
  const file = new File([JSON.stringify(geojson)], fileName, {
    type: type
  });
  let uploadTask = clientStorage.child(clientUID).child(siteUID).child(category).child(fileName).put(file)

  uploadTask.on('state_changed',
    (snapshot) => {
      let progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      document.getElementById(uploadStatusID).innerHTML = `Upload is ${progress}% done.`;
    },
    (error) => {
      console.error(`Error Uploading file. Error: ${error}`);
      window.alert(`Error Uploading file. Error: ${error}`);
    },
    () => {
      window.alert('File Uploaded successfully!')
      document.getElementById(uploadStatusID).innerHTML = ''
    });
}