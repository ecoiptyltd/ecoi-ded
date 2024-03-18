const clientStorage = firebase.storage().ref().child('clients');

const getClientOfUser = (userUID) => {
    clientDB
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let clientID = doc.id;
                clientDB.doc(doc.id).collection('users')
                    .get()
                    .then((snapshot) => {
                        snapshot.forEach((doc) => {
                            if (doc.id === userUID) {
                                selectClient(clientID);
                            }
                        })
                    })
            })
        })

}

const selectClient = (clientUID) => {
    hideAllContent();
    getClientInfo(clientUID);
    clearTable('clientViewSitesTable', 1);
    getClientSites(clientUID);
    displayContent('view-client');
    setSiteBackButton(clientUID);
}

const getClientInfo = (clientUID) => {
    clientDB.doc(clientUID)
        .get()
        .then((doc) => {
            if (doc.exists) {
                displayInfo(clientUID, doc.data().company, 'clientUID', 'clientCompanyName');
            }
        })
}

const getClientSites = (clientUID) => {
    clientDB.doc(clientUID).collection('sites')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                insertRowClients('clientViewSitesTable', 'view_sites', clientUID, doc.data(),'', doc.id)
            })
        })
}

// Display UID and Name info to HTML reference
const displayInfo = (id, name, id_id, name_id) => {
    document.getElementById(id_id).innerHTML = id;
    document.getElementById(name_id).innerHTML = name;
}

// firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
//   .then(function(idToken) {
//     // Use this token in Postman to authenticate Firestore requests
//     console.log(idToken);
//   })
//   .catch(function(error) {
//     console.error(error);
//   });

const viewSite = (clientUID, siteUID, siteName) => {
    hideAllContent();
    document.getElementById('siteName').innerHTML = siteName
    document.getElementById('siteName').setAttribute('href', `javascript:viewSite('${clientUID}','${siteUID}','${siteName}')`)
    displayContent('content-view-site');
    generateDropdown(clientUID, siteUID, 'document', 'siteDocumentsList');
    generateDropdown(clientUID, siteUID, 'monitor', 'siteMonitorList');

    siteMap.resize();
    if (siteMap.getSource('site')) {
        resetMap('siteMap', 'site', ['site-fill', 'site-boundary'])
    } 
    readJsonFromFile(clientUID, siteUID, 'siteMap', 'location');

    // Get Real Time Monitoring Status from DB
    clientDB.doc(clientUID).collection('sites').doc(siteUID)
    .get()
    .then((doc) => {
        if (doc.exists) {
            const rtCheck = doc.data().real_time_monitor;
            if(rtCheck){
                displayContent('content-real-time-monitor');
                generateDropdown(clientUID, siteUID, 'real_time', 'siteRealTimeList');
                readJsonFromFile(clientUID, siteUID, 'siteMap', 'real-time-location');
                }
            }
    }).catch((error) => {
        console.error("Could not read real_time_monitor status from DB: ", error)
    });

   
    // If Real Time Monitoring is Activated, Reset RT Layers
    //if(rtCheck){resetMap('siteMap', 'realTime', ['rt-markers']);}
    
    // If Real Time Monitoring is Activated, Add RT Locations
    //if(rtCheck){readJsonFromFile(clientUID, siteUID, 'siteMap', 'real-time-location');}
    
    //if(rtCheck){
        //generateDropdown(clientUID, siteUID, 'real_time', 'siteRealTimeList')
    //}

}

// Clear dropdown menu items
const clearDropdown = (dropdownID) => {
    const list = document.querySelectorAll(`#${dropdownID} li`)
    for(let i = 0; li = list[i]; i++) {
        li.parentNode.removeChild(li)
    } 
}

// Generate Dropdown Menu
// menu: document, monitor
const generateDropdown = (clientUID, siteUID, menu, menuID) => {
    clearDropdown(menuID);
    let items;
    clientDB.doc(clientUID).collection('sites').doc(siteUID)
        .get()
        .then((doc) => {
            switch (menu) {
                case 'document':
                     items = doc.data().document_types;
                    break;
                case 'monitor':
                    items = doc.data().monitor_types;
                    break;
                case 'real_time':
                    items = doc.data().real_time_nodes;
            }
            
            for(const item of items) {
                insertMenuItem(menuID, item, clientUID, siteUID, menu)
            }
        })
}

// Insert Item in generatedDropdown menu
// menu: document, monitor
const insertMenuItem = (listID, data, clientUID, siteUID, menu) => {
    let list = document.createElement('LI');
    let text = document.createTextNode(data);
    let a = document.createElement('a');
    a.classList.add('dropdown-item');
    a.appendChild(text);
    switch (menu) {
        case 'document':
            a.href = `javascript:populateViewDocTable('${clientUID}', '${siteUID}', 'documents', '${data}')`;
            break;
        case 'monitor':
            a.href = `javascript:populateViewMonTable('${clientUID}', '${siteUID}', 'monitor', '${data}')`;
            break;
        case 'real_time':
            a.href = `javascript:populateViewGraphs('${clientUID}', '${siteUID}', '${data}')`;
            break;
    }
    list.appendChild(a)
    document.getElementById(listID).appendChild(list);
}

const populateViewGraphs = (clientUID, siteUID, rtLocation) => {
    if(rtLocation != 'Overview'){
        clientDB.doc(clientUID).collection('sites').doc(siteUID).collection('real_time_monitor_nodes').doc(rtLocation)
        .get()
        .then((doc) => {
            if(doc.exists){
                data = doc.data()
                // Create defaults graphs
                //createDefaultGraphs = (start_dir, end_dir, url) 
                createDefaultGraphs(parseInt(data.start_dir), parseInt(data.end_dir), data.url, data.type)
                // url = thungela-greenside/node01-nxe0024-avg-dy
                //createAvgGraphs(parseInt(data.start_dir), parseInt(data.end_dir), `${data.mongo_db}/${data.node}-${data.serial_nr}-avg-hr`, data.type)
            } else {
                console.log(`Cant find Real Time node data for ${location}`)
            }
            
        }).catch((error) => {
            console.log(`Error getting Node data for ${location} with error: ${error}` )
        })      
    } else {
        // Generate Overview Dashboard
    }
    
}

const populateViewDocTable = (clientUID, siteUID, category, docType) => {
    clearTable('viewDocumentsTable', 1);
    hideContent('content-view-mon-table');
    clearViewDoc();
    displayContent('content-view-doc-table');
    document.getElementById('docTypeName').innerHTML = docType;
    const userUID = firebase.auth().currentUser.uid;
    userDB.doc(userUID)
        .get()
        .then((doc) => {
            if (doc.exists) {
                const userType = doc.data().userType;
                insertRowFromStorage('viewDocumentsTable', clientUID, siteUID, category, docType, userType);
                setUploadButtonOnclick(clientUID, siteUID, category, 'btnUploadDoc', docType);
            } else {
                insertRowFromStorage('viewDocumentsTable', clientUID, siteUID, category, docType, '');
                setUploadButtonOnclick(clientUID, siteUID, category, 'btnUploadDoc', docType);
            }
        })
        .catch((error) => {
            console.error(`Error reading User DB. Error: ${error}`)
        })
    
}

const populateViewMonTable = (clientUID, siteUID, category, monType) => {
    clearTable('viewMonitorTable', 1);
    hideContent('content-view-doc-table');
    clearViewDoc();
    displayContent('content-view-mon-table');
    document.getElementById('monTypeName').innerHTML = monType;
    const userUID = firebase.auth().currentUser.uid;
    userDB.doc(userUID)
        .get()
        .then((doc) => {
            if (doc.exists) {
                const userType = doc.data().userType;
                insertRowFromStorage('viewMonitorTable', clientUID, siteUID, category, monType, userType);
                setUploadButtonOnclick(clientUID, siteUID, category, 'btnUploadMon', monType);
            } else {
                insertRowFromStorage('viewMonitorTable', clientUID, siteUID, category, monType, '');
                setUploadButtonOnclick(clientUID, siteUID, category, 'btnUploadMon', monType);
            }
        })
        .catch((error) => {
            console.error(`Error reading User DB. Error: ${error}`)
        })
    
}

// Insert row in table from file names in Firebase Storage
// tableID - ID of table to insert row
// clientUID - Client ID
// siteUID - Site ID
// item - documents, monitor_type
// doc_type - if [documents] above, specificy which document type
const insertRowFromStorage = (tableID, clientUID, siteUID, category, docType = '', userType = '') => {
    switch (category) {
        case 'documents':
            clientStorage.child(clientUID).child(siteUID).child(category).child(docType)
            .listAll()
            .then((res) => {
                res.items.forEach((itemRef) => {
                    // Insert Row in Table
                    insertTableRowStorage(tableID, itemRef, category, clientUID, siteUID, docType, userType)
                })
            })
            break;
        case 'monitor':
            clientStorage.child(clientUID).child(siteUID).child(category).child(docType)
            .listAll()
            .then((res) => {
                res.prefixes.forEach((folderRef => {
                    let year = folderRef.name;
                    folderRef.listAll().then((res) => {
                        res.prefixes.forEach((folderRef => {
                            let month = folderRef.name
                            folderRef.listAll().then((res) => {
                                res.items.forEach((itemRef) => {
                                    console.log(year, '-', month, '-', itemRef.name)
                                    // Insert Row in Table
                                    insertTableRowStorage(tableID, itemRef, category, clientUID, siteUID, docType, userType, year, month)
                                })
                            })
                        }))
                    })

                    
                }));
                //res.items.forEach((itemRef) => {
                  //  console.log('insert row')
                    //console.log(itemRef);
                    // Insert Row in Table
                    //insertTableRowStorage(tableID, itemRef, category, clientUID, siteUID, docType, userType)
                //})
            })
            break;
        default:
            break;
    }
    
}

// Insert new Row in Clients Tables
// fileRef: Firestorage ref to file
// category: documents
const insertTableRowStorage = (tableID, fileRef, category, clientUID='', siteUID='', docType='', userType='', year='', month='') => {
    const table = document.getElementById(tableID);
    let rowCount;
    let newRow;
    
    fileRef.getMetadata()
        .then((metadata) => {
            let uploadDate = metadata.updated;
            let fileName = metadata.name;
            //console.log(uploadDate + fileName);
            //console.log(fileRef);
            
            fileRef.getDownloadURL()
                .then((url) => {
                    switch (category) {
                        case 'documents':
                            rowCount = table.rows.length;
                            newRow = table.insertRow(rowCount);
                            newRow.insertCell(0).innerHTML = fileName;
                            newRow.insertCell(1).innerHTML = uploadDate;
                            newRow.insertCell(2).innerHTML = `<button class='btn btn-outline-primary btn-sm' onclick="viewDoc('${url}', '${fileName}')">View</button>`;
                            newCellStyling(table, rowCount, 2, 'class', 'col-2 text-center');
                            newRow.insertCell(3).innerHTML = `<button class='btn btn-outline-info btn-sm' onclick="window.open('${url}', '_blank')">Download</button>`;
                            newCellStyling(table, rowCount, 3, 'class', 'col-3 text-center');
                            if(userType === 'user' || userType === 'admin'){
                                newRow.insertCell(4).innerHTML = `<button class=' btn btn-outline-danger btn-sm' onclick="deleteDoc('${clientUID}', '${siteUID}', '${category}', '${docType}', '${fileName}', '${docType}')">Delete</button>`;
                                newCellStyling(table, rowCount, 4, 'class', 'col-3 text-center');
                            }
                            
                            break;
                        case 'monitor':
                            rowCount = table.rows.length;
                            newRow = table.insertRow(rowCount);
                            newRow.insertCell(0).innerHTML = fileName;
                            newRow.insertCell(1).innerHTML = year;
                            newRow.insertCell(2).innerHTML = month;
                            newRow.insertCell(3).innerHTML = uploadDate;
                            newRow.insertCell(4).innerHTML = `<button class='btn btn-outline-primary btn-sm' onclick="viewDoc('${url}', '${fileName}')">View</button>`;
                            newCellStyling(table, rowCount, 2, 'class', 'col-2 text-center');
                            newRow.insertCell(5).innerHTML = `<button class='btn btn-outline-info btn-sm' onclick="window.open('${url}', '_blank')">Download</button>`;
                            newCellStyling(table, rowCount, 3, 'class', 'col-3 text-center');
                            if(userType === 'user' || userType === 'admin'){
                                newRow.insertCell(6).innerHTML = `<button class=' btn btn-outline-danger btn-sm' onclick="deleteDoc('${clientUID}', '${siteUID}', '${category}', '${docType}', '${fileName}', '${docType}', '${year}', '${month}')">Delete</button>`;
                                newCellStyling(table, rowCount, 4, 'class', 'col-3 text-center');
                            }
                            
                            break;
                    }                 
                })   
        })
}


const deleteDoc = (clientUID, siteUID, category, type, fileName, docType, year = '', month = '') => {
    let r = confirm(`Are you sure want to delete the ${docType} \n${fileName}`);
    let deleteRef;
    if (r) {
        switch (category) {
            case 'documents':
                deleteRef = clientStorage.child(clientUID).child(siteUID).child(category).child(type).child(fileName)
                deleteRef.delete()
                    .then(() => {
                        alert('Document Deleted.');
                        populateViewDocTable(clientUID, siteUID, category, docType);
                })
                break;
            case 'monitor':
                deleteRef = clientStorage.child(clientUID).child(siteUID).child(category).child(type).child(year).child(month).child(fileName)
                console.log(deleteRef)
                deleteRef.delete()
                    .then(() => {
                        alert('Report Deleted.');
                        populateViewMonTable(clientUID, siteUID, category, docType);
                })
                break;
            default:
                break;
        }
        
    }
}

const viewDoc = (url, fileName) => {
    displayContent('content-view-pdf-preview');
    document.getElementById('pdfPreview').src = url;
    document.getElementById('pdfPreviewFileName').innerHTML = fileName;

}

const clearViewDoc = () => {
    hideContent('content-view-pdf-preview');
    document.getElementById('pdfPreview').src = '';
    document.getElementById('pdfPreviewFileName').innerHTML = '';
}
    

// Set the onclick function of the Upload button
// category: documents, monitor, location
// buttonID: ID of the button to set
// type: type of document to upload eg Licences, Lab Results
const setUploadButtonOnclick = (clientUID, siteUID, category, buttonID, type) => {
    switch (category) {
        case 'location':
            document.getElementById(buttonID).setAttribute('onclick', `convertShp2Json('${clientUID}', '${siteUID}', '${category}', 'uploadFileShp')`)
            break;
        case 'real-time-location':
            document.getElementById(buttonID).setAttribute('onclick', `saveRealTimeLocations('${clientUID}', '${siteUID}', '${category}', 'uploadRealTimeFileGeoJSON')`)
            break;
        case 'monitor':
            document.getElementById(buttonID).setAttribute('onclick', `uploadFile('${clientUID}', '${siteUID}', '${category}', '${type}', 'uploadFileMon')`)
            break;
        case 'documents':
            document.getElementById(buttonID).setAttribute('onclick', `uploadFile('${clientUID}', '${siteUID}', '${category}', '${type}', 'uploadFileDoc')`)
            break;
        default:
           // document.getElementById(buttonID).setAttribute('onclick', `uploadFile('${clientUID}', '${siteUID}', '${category}', '${type}', 'uploadFileDoc')`)
            break;
    }
    
  }

const uploadFile = (clientUID, siteUID, category, type, inputID) => {
    const fileRef = document.getElementById(inputID)
    const file = fileRef.files[0];
    let uploadTask;
    
    if (file) {
        const fileName = file.name;

        switch (inputID) {
            case 'uploadFileDoc':
                uploadTask = clientStorage.child(clientUID).child(siteUID).child(category).child(type).child(fileName).put(file)
                uploadTask.on('state_changed',
                    (snapshot) => {
                        let progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        document.getElementById('uploadStatusDoc').innerHTML = `Upload is ${progress}% done.`;
                    },
                    (error) => {
                        console.error(`Error Uploading file. Error: ${error}`);
                        window.alert(`Error Uploading file. Error: ${error}`);
                    },
                    () => {
                        window.alert('File Uploaded successfully!')
                        document.getElementById('uploadStatusDoc').innerHTML = ''
                        fileRef.value = '';
                        populateViewDocTable(clientUID, siteUID, category, type);

                    }); 
                    break;

            case 'uploadFileMon':
                let yearRef = document.getElementById('uploadFileMonYear').value;
                let monthRef = document.getElementById('uploadFileMonMonth').value;
                if(!yearRef){
                    alert('Please enter a value for the Year first.')
                    break;
                }
                if(monthRef == 0){
                    alert('Please Select a month first.')
                    break;
                }
                uploadTask = clientStorage.child(clientUID).child(siteUID).child(category).child(type).child(yearRef).child(monthRef).child(fileName).put(file)
                uploadTask.on('state_changed',
                    (snapshot) => {
                        let progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        document.getElementById('uploadStatusMon').innerHTML = `Upload is ${progress}% done.`;
                    },
                    (error) => {
                        console.error(`Error Uploading file. Error: ${error}`);
                        window.alert(`Error Uploading file. Error: ${error}`);
                    },
                    () => {
                        window.alert('File Uploaded successfully!')
                        document.getElementById('uploadStatusMon').innerHTML = ''
                        fileRef.value = '';
                        populateViewMonTable(clientUID, siteUID, category, type);

                    });
                
                    break;
            default:
                break;
        }
     } else {
            window.alert('Please select a file.')
        }
        
    
}

// Real-Time Monitor Active Selection Box
let realTimeCheck = true;
document.getElementById('realTimeMonitorCheck').addEventListener('change', (e) => {
  if (e.target.checked){
    writeRealTimeStatusToDB(true); 
  } else {
    writeRealTimeStatusToDB(false);
  }
})

const writeRealTimeStatusToDB = (status) => {
    const clientUID = document.getElementById('editClientUID').innerHTML;
    const siteUID = document.getElementById('editSiteUID').innerHTML;
    clientDB.doc(clientUID).collection('sites').doc(siteUID)
        .update({
            real_time_monitor: status
        }).then(() => {
            if(status){
                document.getElementById('editRealTimeCheck').innerHTML = 'Active';
                realTimeCheck = true;
                viewEditClientRealTimeMonitor();
            }else{
                document.getElementById('editRealTimeCheck').innerHTML = 'Disabled';
                realTimeCheck = false;
                hideContent('content-real-time-monitor');
            }
        }).catch((error) => {
            console.error("Could not Update real_time_monitor status to DB: ", error);
        });
}

const readRealTimeStatusFromDB = (clientUID, siteUID) => {
    clientDB.doc(clientUID).collection('sites').doc(siteUID)
        .get()
        .then((doc) => {
            if (doc.exists) {
                const rtCheck = doc.data().real_time_monitor;
                if(rtCheck){
                    document.getElementById('editRealTimeCheck').innerHTML = 'Active';
                    realTimeCheck = true;
                    document.getElementById('realTimeMonitorCheck').checked = true;
                    viewEditClientRealTimeMonitor();
                }else{
                    document.getElementById('editRealTimeCheck').innerHTML = 'Disabled';
                    realTimeCheck = false;
                    document.getElementById('realTimeMonitorCheck').checked = false;
                    hideContent('content-real-time-monitor');
                }
            }
        }).catch((error) => {
            console.error("Could not read real_time_monitor status from DB: ", error)
        });
}

const getRealTimeStatus = (clientUID, siteUID) => {
    clientDB.doc(clientUID).collection('sites').doc(siteUID)
    .get()
    .then((doc) => {
        if (doc.exists) {
            console.log(doc.data().real_time_monitor);
            return doc.data().real_time_monitor;
        }
    }).catch((error) => {
        console.error("Could not read real_time_monitor status from DB: ", error)
    });
}