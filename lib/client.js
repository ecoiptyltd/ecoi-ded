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
                readJsonFromFile(clientUID, siteUID, 'siteMap');

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
            a.href = '#';
            break;
    }
    list.appendChild(a)
    document.getElementById(listID).appendChild(list);
}

const populateViewDocTable = (clientUID, siteUID, category, docType) => {
    clearTable('viewDocumentsTable', 1);
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

// Insert row in table from file names in Firebase Storage
// tableID - ID of table to insert row
// clientUID - Client ID
// siteUID - Site ID
// item - documents, monitor_type
// doc_type - if [documents] above, specificy which document type
const insertRowFromStorage = (tableID, clientUID, siteUID, category, docType = '', userType = '') => {
    clientStorage.child(clientUID).child(siteUID).child(category).child(docType)
        .listAll()
        .then((res) => {
            res.items.forEach((itemRef) => {
                // Insert Row in Table
                insertTableRowStorage(tableID, itemRef, category, clientUID, siteUID, docType, userType)

            })
        })
}

// Insert new Row in Clients Tables
// fileRef: Firestorage ref to file
// category: documents
const insertTableRowStorage = (tableID, fileRef, category, clientUID='', siteUID='', docType='', userType='') => {
    const table = document.getElementById(tableID);
    let rowCount;
    let newRow;
    
    fileRef.getMetadata()
        .then((metadata) => {
            let uploadDate = metadata.updated;
            let fileName = metadata.name;
            console.log(uploadDate + fileName);
            console.log(fileRef);
            
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
                    }                 
                })   
        })
}


const deleteDoc = (clientUID, siteUID, category, type, fileName, docType) => {
    let r = confirm(`Are you sure want to delete the ${docType} \n${fileName}`);
    if (r) {
        const deleteRef = clientStorage.child(clientUID).child(siteUID).child(category).child(type).child(fileName)
        deleteRef.delete()
            .then(() => {
                populateViewDocTable(clientUID, siteUID, category, docType);
        })
    }
}

const viewDoc = (url, fileName) => {
    displayContent('content-view-pdf-preview')
    document.getElementById('pdfPreview').src = url;
    document.getElementById('pdfPreviewFileName').innerHTML = fileName;

}
    

// Set the onclick function of the Upload button
// category: documents, monitor, location
// buttonID: ID of the button to set
// type: type of document to upload eg Licences, Lab Results
const setUploadButtonOnclick = (clientUID, siteUID, category, buttonID, type) => {
    if (category === 'location') {
        document.getElementById(buttonID).setAttribute('onclick', `convertShp2Json('${clientUID}', '${siteUID}', '${category}', 'uploadFileShp')`)
    } else {
        document.getElementById(buttonID).setAttribute('onclick', `uploadFile('${clientUID}', '${siteUID}', '${category}', '${type}', 'uploadFileDoc')`)
    }
    
  }

const uploadFile = (clientUID, siteUID, category, type, inputID) => {
    const fileRef = document.getElementById(inputID)
    const file = fileRef.files[0];
    
    if (file) {
        const fileName = file.name;
        let uploadTask = clientStorage.child(clientUID).child(siteUID).child(category).child(type).child(fileName).put(file)
    
        uploadTask.on('state_changed',
            (snapshot) => {
                let progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                document.getElementById('uploadStatus').innerHTML = `Upload is ${progress}% done.`;
            },
            (error) => {
                console.error(`Error Uploading file. Error: ${error}`);
                window.alert(`Error Uploading file. Error: ${error}`);
            },
            () => {
                window.alert('File Uploaded successfully!')
                document.getElementById('uploadStatus').innerHTML = ''
                fileRef.value = '';
                populateViewDocTable(clientUID, siteUID, category, type);

            });
    } else {
        window.alert('Please select a file.')
    }
    
}