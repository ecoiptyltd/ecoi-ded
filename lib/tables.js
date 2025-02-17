const defaultDB = firebase.firestore().collection('defaults');
const clientDB = firebase.firestore().collection('clients');
const userDB = firebase.firestore().collection('users');

const readDefaultDB = (tableID, type, readOnly = false) => {
    const DB = defaultDB.doc(type);
    let docTypes;
    DB.get().then((doc) => {
        switch (type) {
            case 'documents':
                docTypes = doc.data().documents;
                break;
            case 'monitor_type':
                docTypes = doc.data().monitor_type;
                break;
            case 'monitor_limits':
                docTypes = doc.data().monitor_limits;
                break;
        }

        if (!readOnly) {
            clearTable(tableID, 2);
            console.log(docTypes)
            docTypes.forEach(element => {
                // Populate #defaultDocTypesTable with Results
                switch (type) {
                    case 'monitor_type':
                        insertRow(type, tableID, element, 'monitor_type', 'defaults');
                        break;
                    case 'monitor_limits':
                        insertRow(type, tableID, element, 'monitor_limits', 'defaults');
                        break;
                    default:
                        insertRow(type, tableID, element, 'delete', 'defaults');
                        break;
                }
                
            });
        } else {
            return docTypes;
        }

    }).catch((error) => {
        console.error('Error reading Default DB: ', error);
        window.alert('Error reading Default DB: ', error);
    })
}

const readMonitorLimitsDB = (tableID) => {
    defaultDB.doc('monitor_limits').collection()
}

// Clear Table
// rowsToKeep - 2 to keep last row, 1 to delete last row
const clearTable = (tableID, rowsToKeep) => {
    const table = document.getElementById(tableID);
    const rowCount = table.rows.length;
    for (let x = rowCount - rowsToKeep; x > 0; x--) {
        table.deleteRow(x);
    }
}

// Set last Row text in Table
const setLastRowText = (tableID, cell, text) => {
    const table = document.getElementById(tableID);
    const rowCount = table.rows.length - 1;
    table.rows[rowCount].cells[cell].innerHTML = text;
}

// Add Bootstrap Styling class to table ROW
const newCellStyling = (table, row, cell, attributeName, value) => {
    table.rows[row].cells[cell].setAttribute(`${attributeName}`, `${value}`);
}

// Add Tooltip on cell hover
const newCellTooltip = (table, row, cell, text, position) => {
    table.rows[row].cells[cell].setAttribute('data-bs-toggle', 'tooltip');
    table.rows[row].cells[cell].setAttribute('data-bs-placement', `${position}`);
    table.rows[row].cells[cell].setAttribute('title', `${text}`);
}

// Reload Tables
const reloadTable = (type, tableID, clientUID = '', siteUID = '') => {
    switch (type) {
        case 'documents':
            clearTable(tableID, 2);
            setLastRowText(tableID, 0, 'add new...')
            readDefaultDB(tableID, 'documents')
            break;
        case 'monitor_type':
            clearTable(tableID, 2);
            setLastRowText(tableID, 0, 'add new...')
            readDefaultDB(tableID, 'monitor_type')
            break;
        case 'monitor_limits':
            clearTable(tableID, 2);
            setLastRowText(tableID, 0, 'add new name...')
            setLastRowText(tableID, 1, 'add new description...')
            readDefaultDB(tableID, 'monitor_limits')
            break;    
        case 'monitor_default_element':
            clearTable(tableID, 2);
            setLastRowText(tableID, 0, 'add new symbol')
            setLastRowText(tableID, 1, 'add new description')
            let mType = document.getElementById('monitorTypeElementsTableHeader').innerHTML
            editMonitorType(tableID, '', mType);
            break;    
        case 'sites':
            clearTable(tableID, 2);
            setLastRowText(tableID, 0, 'add new...')
            readClientSites(clientUID)
            break;
        case 'site_documents':
            clearTable(tableID, 2);
            setLastRowText(tableID, 0, 'add new...')
            loadTable(siteUID, clientUID, 'site_edit_documents')
            break;
        case 'site_monitor_types':
            clearTable(tableID, 2);
            setLastRowText(tableID, 0, 'add new...')
            loadTable(siteUID, clientUID, 'site_edit_monitor_types')
            break;
        case 'client_users':
            clearTable(tableID, 1);
            loadTable(siteUID, clientUID, 'site_edit_monitor_types')
            break;
        case 'real_time_db':
            clearTable(tableID, 1);
            loadTable(siteUID, clientUID, 'site_edit_real_time_db_nodes')
        case 'user_edit':    
            clearTable(tableID, 1)
            populateUserTable('editUsersTable', 'users_edit');
            break;
    }

}

// Insert new Row in Table
// type = documents or monitor_type
// tableID = table ID of table to insert
// dbData = data from db
// rowType = delete, monitor_type, monitor_limits
// db = default or client
const insertRow = (type, tableID, dbData, rowType, db) => {
    const table = document.getElementById(tableID);
    let rowCount = table.rows.length - 1;
    let newRow = table.insertRow(rowCount);

    switch (rowType) {
        case 'delete':
            newRow.insertCell(0).innerHTML = dbData;
            newRow.insertCell(1).innerHTML = `<a href="javascript:deleteRowDB('${type}', '${tableID}', ${rowCount}, '${db}')"><i class="bi me-2 bi-trash"></i></a>`;
            newCellStyling(table, rowCount, 1, 'class', 'col-1 text-center');
            newCellTooltip(table, rowCount, 1, 'Delete', 'top');
            break;
        case 'monitor_type':
            newRow.insertCell(0).innerHTML = dbData;
            newRow.insertCell(1).innerHTML = `<button class='btn btn-outline-info btn-sm' data-bs-toggle="modal" data-bs-target="#assignMonitorTypeElements" onclick="editMonitorTypeLimit('monitorTypeElementsTable', '${dbData}')">View/Assign Limits</button>`;
            newRow.insertCell(2).innerHTML = `<a href="javascript:deleteRowDB('${type}', '${tableID}', ${rowCount}, '${db}')"><i class="bi me-2 bi-trash"></i></a>`;
            newCellStyling(table, rowCount, 1, 'class', 'col-1 text-center');
            newCellStyling(table, rowCount, 2, 'class', 'col-1 text-center');
            newCellTooltip(table, rowCount, 2, 'Delete', 'top');
            break;
            //<button type='button' class='btn btn-outline-success' data-bs-toggle="modal" data-bs-target="#assignClientUsers"
          //onclick="javascript:populateUserTable('clientAssignUsersTable', 'users_assign')">Assign New User</button>
        case 'monitor_limits':
            newRow.insertCell(0).innerHTML = dbData;
            newRow.insertCell(1).innerHTML = '';
            newRow.insertCell(2).innerHTML = `<button class='btn btn-outline-info btn-sm' data-bs-toggle="modal" data-bs-target="#assignMonitorTypeElements" onclick="editMonitorLimits('monitorTypeElementsTable', '${dbData}')">View/Assign Elements</button>`;
            newRow.insertCell(3).innerHTML = `<a href="javascript:deleteRowDB('${type}', '${tableID}', ${rowCount}, '${db}')"><i class="bi me-2 bi-trash"></i></a>`;
            newCellStyling(table, rowCount, 2, 'class', 'col-1 text-center');
            newCellStyling(table, rowCount, 3, 'class', 'col-1 text-center');
            newCellTooltip(table, rowCount, 3, 'Delete', 'top');
            break;
    
    }
}

// Delete Row in Table
// type = documents, monitor_type
// tableID = ID for table to insert row
// rowIndex = index of row to delete on js function running
// db = defaults, client_sites
const deleteRowDB = (type, tableID, rowIndex, db) => {
    const table = document.getElementById(tableID);
    const data = table.rows[rowIndex].cells[0].textContent;
    //let mType = document.getElementById('monitorTypeElementsTableHeader').innerHTML;

    switch (db) {
        case 'defaults':
            switch (type) {
                case 'documents':
                    defaultDB.doc(type).update({
                        documents: firebase.firestore.FieldValue.arrayRemove(data)
                    }).then(() => {
                        reloadTable(type, tableID);
                    })
                    break;
                case 'monitor_type':
                    defaultDB.doc(type).update({
                        monitor_type: firebase.firestore.FieldValue.arrayRemove(data)
                    }).then(() => {
                        reloadTable(type, tableID);
                    })
                    break;
                case 'monitor_default_element':
                    window.alert('Cannot Delete at this Time\nPlease contact Neel to assist.')
                    /*defaultDB.doc('monitor_type').collection(mType).doc('elements').update({
                        element: firebase.firestore.FieldValue.arrayRemove(data)
                    }).then(() => {
                        reloadTable(type, tableID);
                    })
                    */
                    break;
                case 'real_time':
                    defaultDB.doc(type).update({
                        monitor_type: firebase.firestore.FieldValue.arrayRemove(data)
                    }).then(() => {
                        reloadTable(type, tableID);
                    })
                    break;
            }
            break;
        case 'client_sites':
            let clientUID = document.getElementById('editClientUID').innerHTML;
            let siteUID = document.getElementById('editSiteUID').innerHTML;
            let siteDB = clientDB.doc(clientUID).collection('sites').doc(siteUID)
            switch (type) {
                case 'site_documents':
                    siteDB.update({
                        document_types: firebase.firestore.FieldValue.arrayRemove(data)
                    }).then(() => {
                        reloadTable(type, tableID, clientUID, siteUID);
                    })
                    break;
                case 'site_monitor_types':
                    siteDB.update({
                        monitor_types: firebase.firestore.FieldValue.arrayRemove(data)
                    }).then(() => {
                        reloadTable(type, tableID, clientUID, siteUID);
                    })
                    break;
                case 'real_time_db':
                    console.log('To be implemented')
                    break;
            }
    }

}

// Save New Row to DB
const saveRow = (type, tableID, userUID = '', row = '') => {
    // Read data from Table
    const table = document.getElementById(tableID);
    const cUID = document.getElementById('editClientUID').innerHTML;
    const sUID = document.getElementById('editSiteUID').innerHTML;
    //const mType = document.getElementById('monitorTypeElementsTableHeader').innerHTML;

    let rowCount;
    // Use second last row if no row count is specified
    if (!row) {
         rowCount = table.rows.length - 1;
    } else {
        rowCount = row;
    }

    let newData  = table.rows[rowCount].cells[0].textContent;
    
    switch (type) {
        case 'documents':
            defaultDB.doc(type).update({
                documents: firebase.firestore.FieldValue.arrayUnion(newData)
            }).then(() => {
                reloadTable(type, tableID);
            });
            break;
        case 'monitor_type':
            defaultDB.doc(type).update({
                monitor_type: firebase.firestore.FieldValue.arrayUnion(newData)               
            }).then(() => {
                reloadTable(type, tableID);
            });
            break;
        case 'monitor_limits':
            console.log('save row');
            let newName = table.rows[rowCount].cells[0].textContent;
            let newLimitDescription = table.rows[rowCount].cells[1].textContent;
            
            defaultDB.doc(type).update({
                monitor_limits: firebase.firestore.FieldValue.arrayUnion(newData)
            }).then(() => {
                defaultDB.doc(type).collection(newName).doc('description')
                    .set({
                        description: newLimitDescription,
                    })
                    .then(() => {
                        window.alert('New Limit added successfully!')
                        reloadTable(type, tableID);

                    })
                    .catch((error) => {
                        console.error('Error adding new Limit to Database: ', error);
                        window.alert('Error adding new Limit to Database: ', error);
                    })
                });

            

 
            break;
        /*case 'monitor_default_element':
            let newElement = table.rows[rowCount].cells[0].textContent;
            let newDescription = table.rows[rowCount].cells[1].textContent;
            let newObject = {
                [newElement]: newDescription
            }
            defaultDB.doc('monitor_type').collection(mType).doc('elements')
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        defaultDB.doc('monitor_type').collection(mType).doc('elements')
                            .update(newObject)
                        .then(() => {
                            reloadTable(type, tableID);
                        })
                    } else {
                        docData = newObject;
                        defaultDB.doc('monitor_type').collection(mType).doc('elements')
                            .set(docData)
                            .then(() => {
                                //clearTable(tableID, 2);
                                reloadTable(type, tableID);
                            })
                    }
                     
                })
            break;
            */
        case 'sites':
            const clientUID = document.getElementById('editClientUID').innerHTML;
            let defaultDocuments;
            let defaultMonitorTypes;
            let realTimeNodes = ['Overview'];

            defaultDB
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        switch (doc.id) {
                            case 'documents':
                                defaultDocuments = doc.data().documents;
                                break;
                            case 'monitor_type':
                                defaultMonitorTypes = doc.data().monitor_type;
                                break;
                        }
                    })
                })
                .then(() => {
                    clientDB.doc(clientUID).collection('sites')
                        .add({
                            site_name: newData,
                            real_time_monitor: 'false',
                            document_types: defaultDocuments,
                            monitor_types: defaultMonitorTypes,
                            real_time_nodes: realTimeNodes
                        })
                        .then(() => {
                            window.alert('New Site added successfully!')
                            reloadTable(type, tableID, clientUID);

                        })
                        .catch((error) => {
                            console.error('Error adding new Site to Database: ', error);
                            window.alert('Error adding new Site to Database: ', error);
                        })
                })
            break;
        case 'site_documents':
            clientDB.doc(cUID).collection('sites').doc(sUID)
                .update({
                    document_types: firebase.firestore.FieldValue.arrayUnion(newData)
                })
                .then(() => {
                    reloadTable(type, tableID, cUID, sUID)
                })

            break;
        case 'site_monitor_types':
            clientDB.doc(cUID).collection('sites').doc(sUID)
                .update({
                    monitor_types: firebase.firestore.FieldValue.arrayUnion(newData)
                })
                .then(() => {
                    reloadTable(type, tableID, cUID, sUID)

                })
            break;
        case 'real_time_db':
            const node = table.rows[rowCount].cells[0].textContent;
            const realTimeDB = clientDB.doc(cUID).collection('sites').doc(sUID).collection('real_time_monitor_nodes').doc(node)
            const url = table.rows[rowCount].cells[1].textContent;
            const startDir = table.rows[rowCount].cells[2].textContent;
            const endDir = table.rows[rowCount].cells[3].textContent;
            const installDate = table.rows[rowCount].cells[4].textContent;
            realTimeDB.set({
                name: node,
                url: url,
                start_dir: startDir,
                end_dir: endDir,
                install_date: installDate
            })
            .then(() => {
                clientDB.doc(cUID).collection('sites').doc(sUID)
                .update({
                    real_time_nodes: firebase.firestore.FieldValue.arrayUnion(newData)
                })
            })
            .then(() => {
                reloadTable(type, tableID, cUID, sUID)
            })   
            break;
        case 'user_edit':
            newData = {
                name: table.rows[rowCount].cells[1].textContent,
                tel: table.rows[rowCount].cells[3].textContent,
                role: table.rows[rowCount].cells[4].textContent
            }
            console.log(newData.name);
            userDB.doc(userUID)
                .update({
                    name: newData.name,
                    telephone: newData.tel,
                    userType: newData.role
                })
                .then(() => {
                    reloadTable(type, tableID)
                })
    }
}

// Read Client DB and populate table
// type: view or edit
const readClientDB = (tableID, type) => {
    clearTable(tableID, 1);
    clientDB
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                // Populate #clientsTable with Results
                switch (type) {
                    case 'view':
                        insertRowClients(tableID, type, doc.id, doc.data());
                        break;
                    case 'edit':
                        insertRowClients(tableID, type, doc.id, doc.data());
                        break;
                }

            });
        })
        .catch((error) => {
            console.error('Error reading Client DB: ', error);
            window.alert('Error reading Client DB: ', error);
        })
}
//insertDocumentRow('clientSitesEditDocumentTable', 'documents', element, 'client_sites')
const insertDocumentRow = (tableID, type, dbData, db) => {
    const table = document.getElementById(tableID);
    let rowCount = table.rows.length - 1;
    let newRow = table.insertRow(rowCount);

    // type = documents, monitor_type
    // tableID = ID for table to insert row
    // rowIndex = index of row to delete on js function running
    // db = defaults, client_sites
    newRow.insertCell(0).innerHTML = dbData;
    newRow.insertCell(1).innerHTML = `<a href="javascript:deleteRowDB('${type}', '${tableID}', ${rowCount}, '${db}')"><i class="bi me-2 bi-trash"></i></a>`;
    newCellStyling(table, rowCount, 1, 'class', 'col-1 text-center');
    newCellTooltip(table, rowCount, 1, 'Delete', 'top');

}

const insertMonitorRow = (tableID, type, dbData, db) => {
    const table = document.getElementById(tableID);
    let rowCount = table.rows.length - 1;
    let newRow = table.insertRow(rowCount);

    // type = documents, monitor_type
    // tableID = ID for table to insert row
    // rowIndex = index of row to delete on js function running
    // db = defaults, client_sites
    newRow.insertCell(0).innerHTML = dbData;
    newRow.insertCell(1).innerHTML = `<a href="javascript:deleteRowDB('${type}', '${tableID}', ${rowCount}, '${db}')"><i class="bi me-2 bi-trash"></i></a>`;
    newCellStyling(table, rowCount, 1, 'class', 'col-1 text-center');
    newCellTooltip(table, rowCount, 1, 'Delete', 'top');

}

const insertRealTimeDBRow = (tableID, type, dbData, db) => {
    const table = document.getElementById(tableID);
    let rowCount = table.rows.length - 1;
    let newRow = table.insertRow(rowCount);
    newRow.insertCell(0).innerHTML = dbData.name;
    newRow.insertCell(1).innerHTML = dbData.url;
    newRow.insertCell(2).innerHTML = dbData.start_dir;
    newRow.insertCell(3).innerHTML = dbData.end_dir; 
    newRow.insertCell(4).innerHTML = dbData.install_date;
    newRow.insertCell(5).innerHTML = `<a href="javascript:deleteRowDB('${db}', '${tableID}', ${rowCount}, '${type}')"><i class="bi me-2 bi-trash"></i></a>`;
    newCellStyling(table, rowCount, 5, 'class', 'col-1 text-center');
    newCellTooltip(table, rowCount, 5, 'Delete', 'top');
}

const readClient = (clientUID) => {
    clientDB.doc(clientUID)
        .get()
        .then((doc) => {
            if (doc.exists) {
                viewEditClient();
                document.getElementById('editClientUID').innerHTML = clientUID;
                document.getElementById('editClientCompany').innerHTML = `<b>Company:</b> ${doc.data().company}`;
                clearTable('clientEditTable', 1);
                findMainContactUID(clientUID);
                clearTable('clientUsersTable', 1);
                populateClientUsers(clientUID);
                clearTable('clientSitesTable', 2);
                readClientSites(clientUID);
                hideContent('content-client-edit-site')
            } else {
                window.alert('Client does not exist.')
            }
        })
        .catch((error) => {
            console.error('Error retrieving Client from DB: ', error);
            window.alert('Error retrieving Client from DB: ', error);
        })
}

const readSite = (siteUID, clientUID) => {
    clientDB.doc(clientUID).collection('sites').doc(siteUID)
        .get()
        .then((doc) => {
            if (doc.exists) {
                viewEditClientSite();
                document.getElementById('editSiteUID').innerHTML = siteUID;
                document.getElementById('editClientSiteName').innerHTML = `<b>Site:</b> ${doc.data().site_name}`;
                
                setUploadButtonOnclick(clientUID, siteUID, 'location', 'btnUploadShp', '');
                setUploadButtonOnclick(clientUID, siteUID, 'real-time-location', 'btnUploadRealTimeGeoJSON', '');

                // Get Real Time Monitoring Status from DB
                readRealTimeStatusFromDB(clientUID, siteUID);
                siteEditMap.resize();
                if (siteEditMap.getSource('site')) {
                    resetMap('siteEditMap', 'site', ['site-fill', 'site-boundary']);
                    // If Real Time Monitoring is Activated, Reset RT Layers
                    if(realTimeCheck){resetMap('siteEditMap', 'realTime', ['rt-markers']);}
                  } 
                  readJsonFromFile(clientUID, siteUID, 'siteEditMap', 'location');
                  // If Real Time Monitoring is Activated, Add RT Locations
                  if(realTimeCheck){readJsonFromFile(clientUID, siteUID, 'siteEditMap', 'real-time-location');}

                clearTable('clientSitesEditDocumentTable', 2)
                clearTable('clientSitesEditMonitorTypeTable', 2)
                
                if(realTimeCheck){
                    clearTable('clientSitesEditRealtimeDBTable', 2)
                    clientDB.doc(clientUID).collection('sites').doc(siteUID).collection('real_time_monitor_nodes')
                    .orderBy("name")
                        .get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                insertRealTimeDBRow('clientSitesEditRealtimeDBTable', 'client_sites', doc.data(), 'real_time_db')
                            })
                        })                  
                }

                doc.data().document_types.forEach(element => {
                    insertDocumentRow('clientSitesEditDocumentTable', 'site_documents', element, 'client_sites')
                })
                doc.data().monitor_types.forEach(element => {
                    insertMonitorRow('clientSitesEditMonitorTypeTable', 'site_monitor_types', element, 'client_sites')
                })
            }
        })
}

const loadTable = (siteUID, clientUID, table) => {
    clientDB.doc(clientUID).collection('sites').doc(siteUID)
    .get()
    .then((doc) => {
        if (doc.exists) {
            switch (table) {
                case ('site_edit_documents'):
                    doc.data().document_types.forEach(element => {
                        insertDocumentRow('clientSitesEditDocumentTable', 'site_documents', element, 'client_sites')
                    })
                    break;
                case ('site_edit_monitor_types'):
                    doc.data().monitor_types.forEach(element => {
                        insertMonitorRow('clientSitesEditMonitorTypeTable', 'site_monitor_types', element, 'client_sites')
                    })
                    break;
                case ('site_edit_real_time_db_nodes'):
                    clientDB.doc(clientUID).collection('sites').doc(siteUID).collection('real_time_monitor_nodes')
                    .orderBy("name")
                        .get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                insertRealTimeDBRow('clientSitesEditRealtimeDBTable', 'real_time_db', doc.data(), 'client_sites')
                            })
                        })
                    break;
            }
        }
    })
}

const updateClient = (uid, tableID, row) => {
    // Read data from Table
    const table = document.getElementById(tableID);

    // Update Firestore DB
    clientDB.doc(uid).update({
            contact: table.rows[row].cells[0].textContent,
            email: table.rows[row].cells[1].textContent,
            telephone: table.rows[row].cells[2].textContent
        })
        .then(() => {
            window.alert('Client Contact details updated successfully!')
        })
        .catch((error) => {
            console.error('Error updating Client in DB: ', error);
            window.alert('Error updating Client in DB: ', error);
        })
}

const updateClientMainUser = (userUID, tableID, row) => {
    // Read data from Table
    const table = document.getElementById(tableID);

    // Update Firestore DB
    userDB.doc(userUID).update({
            name: table.rows[row].cells[1].textContent,
            email: table.rows[row].cells[2].textContent,
            telephone: table.rows[row].cells[3].textContent
        })
        .then(() => {
            window.alert('Client Main Contact details updated successfully!')
        })
        .catch((error) => {
            console.error('Error updating Client in DB: ', error);
            window.alert('Error updating Client in DB: ', error);
        })
}

// Read Client Site List from DB
const readClientSites = (clientUID) => {
    clientDB.doc(clientUID).collection('sites')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // Populate Sites Table
                insertRowClients('clientSitesTable', 'sites', doc.id, doc.data());
            })
        })
        .catch((error) => {
            console.error('Error reading Client Sites in DB: ', error);
            window.alert('Error reading Client Sites in DB: ', error);
        })
}

// Read Client assigned Users from DB
const populateClientUsers = (clientUID) => {
    clientDB.doc(clientUID).collection('users')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                userDB.doc(doc.id)
                    .get()
                    .then((doc) => {
                        insertRowClients('clientUsersTable', 'users_view', clientUID, doc.data(), doc.id)
                    })                
            })
        })
}
//populateUserTable('clientAssignUsersTable', 'users_assign')
// method = users_edit or users_assign
const populateUserTable = (tableID, method) => {
    //console.log(stuff);
    // ToDo - Check if user is already assigned. Filter out
    // Creat array of usersUIDs already assigned.
    // Compare against UserDB
    // Only show those not assigned
    clearTable(tableID, 1);
    let clientUID = document.getElementById('editClientUID').innerHTML;
    userDB
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                insertRowClients(tableID, method, clientUID, doc.data(), doc.id)
            })
        })
}

const assignUserToClient = (userUID, clientUID) => {
    clientDB.doc(clientUID).collection('users').doc(userUID).set({
        main_contact: false
    })
    .then(() => {
        clearTable('clientUsersTable', 1);
        populateClientUsers(clientUID);
    })  
}

const assignUserAsMainContact = (userUID, clientUID) => {
    clientDB.doc(clientUID).collection('users').where('main_contact', '==', true)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                clientDB.doc(clientUID).collection('users').doc(doc.id).set({
                    main_contact: false
                })
            })
        })
        .then(() => {
            clientDB.doc(clientUID).collection('users').doc(userUID).set({
                main_contact: true
            })
            .then(() => {
                clearTable('clientEditTable', 1);
                findMainContactUID(clientUID);
            })
        })  
}

const removeUserFromClient = (userUID, clientUID) => {
    clientDB.doc(clientUID).collection('users').doc(userUID)
        .delete()
        .then(() => {
            clearTable('clientUsersTable', 1);
            populateClientUsers(clientUID);
        })
}

// Return main contact details for company
const findMainContactUID = (clientUID) => {
    let userUID
    clientDB.doc(clientUID).collection('users').where('main_contact', '==', true)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                userUID = doc.id;
            })
        })
        .then(() => {
            userDB.doc(userUID)
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        insertRowClients('clientEditTable', 'main_contact', clientUID, doc.data(), doc.id);
                    } else {
                        console.error(`Something went wrong. Cant find the clientUID ${clientUID} in the users DB`)
                    }
                })
                .catch((error) => {
                    console.error('Error reading Client UID in User DB: ', error);
                    window.alert('Error reading Client UID in User DB: ', error);
                })
        })
}

// Insert new Row in Clients Tables
const insertRowClients = (tableID, type, clientUID, data, userUID = '', siteID = '') => {
    const table = document.getElementById(tableID);
    let rowCount;
    let newRow;
    let siteUID;

    switch (type) {
        case 'users_view':
            rowCount = table.rows.length;
            newRow = table.insertRow(rowCount);
            newRow.insertCell(0).innerHTML = userUID;
            newRow.insertCell(1).innerHTML = data.name;
            newRow.insertCell(2).innerHTML = data.email;
            newRow.insertCell(3).innerHTML = data.telephone;
            newRow.insertCell(4).innerHTML = `<button class='btn btn-outline-danger btn-sm' onclick="removeUserFromClient('${userUID}', '${clientUID}', '${tableID}')">Remove</button>`;
            newCellStyling(table, rowCount, 4, 'class', 'col-2 text-center');
            newRow.insertCell(5).innerHTML = `<button class='btn btn-outline-warning btn-sm' onclick="assignUserAsMainContact('${userUID}', '${clientUID}')">Assign as Main Contact</button>`;
            newCellStyling(table, rowCount, 5, 'class', 'col-3 text-center');
            newRow.insertCell(6).innerHTML = `<button class='btn btn-outline-dark btn-sm' onclick="sendResetPasswordLink('${userUID}')">Reset Password</button>`;
            newCellStyling(table, rowCount, 6, 'class', 'col-2 text-center');
            break;

        case 'users_assign':
            rowCount = table.rows.length;
            newRow = table.insertRow(rowCount);
            newRow.insertCell(0).innerHTML = userUID;
            newRow.insertCell(1).innerHTML = data.name;
            newRow.insertCell(2).innerHTML = data.email;
            newRow.insertCell(3).innerHTML = data.telephone;
            newRow.insertCell(4).innerHTML = `<button class='btn btn-outline-secondary btn-sm' onclick="assignUserToClient('${userUID}', '${clientUID}', '${tableID}')">Assign</button>`;
            newCellStyling(table, rowCount, 4, 'class', 'col-2 text-center');
            break;

        case 'users_edit':
            rowCount = table.rows.length;
            newRow = table.insertRow(rowCount);
            newRow.insertCell(0).innerHTML = userUID;
            newRow.insertCell(1).innerHTML = data.name;
            newRow.insertCell(2).innerHTML = data.email;
            newRow.insertCell(3).innerHTML = data.telephone;
            newRow.insertCell(4).innerHTML = data.userType;
            newCellStyling(table, rowCount, 1, 'contenteditable', 'true');
            newCellStyling(table, rowCount, 3, 'contenteditable', 'true');
            newCellStyling(table, rowCount, 4, 'contenteditable', 'true');
            newRow.insertCell(5).innerHTML = `<button class='btn btn-outline-success btn-sm' onclick="saveRow('user_edit', '${tableID}', '${userUID}', ${rowCount})">Save</button>`;
            newCellStyling(table, rowCount, 5, 'class', 'col-2 text-center');
            newRow.insertCell(6).innerHTML = `<button class='btn btn-outline-dark btn-sm' onclick="sendResetPasswordLink('${userUID}')">Reset Password</button>`;
            newCellStyling(table, rowCount, 6, 'class', 'col-2 text-center');
            newRow.insertCell(7).innerHTML = `<button class='btn btn-outline-danger btn-sm' onclick="deleteUser('${userUID}')">Delete</button>`;
            newCellStyling(table, rowCount, 7, 'class', 'col-2 text-center');
            break;

        case 'main_contact':
            rowCount = table.rows.length;
            newRow = table.insertRow(rowCount);
            newRow.insertCell(0).innerHTML = userUID;
            newRow.insertCell(1).innerHTML = data.name;
            newRow.insertCell(2).innerHTML = data.email;
            newRow.insertCell(3).innerHTML = data.telephone;
            newRow.insertCell(4).innerHTML = `<a href="javascript:updateClientMainUser('${userUID}', 'clientEditTable', ${rowCount})"><i class="bi me-2 bi-file-earmark-plus"></i></a>`;
            newCellTooltip(table, rowCount, 4, 'Save Updates', 'top');
            newCellStyling(table, rowCount, 1, 'contenteditable', 'true');
            newCellStyling(table, rowCount, 3, 'contenteditable', 'true');
            newCellStyling(table, rowCount, 4, 'class', 'col-2 text-center');
            break;

        case 'edit':
            rowCount = table.rows.length;
            newRow = table.insertRow(rowCount);
            newRow.insertCell(0).innerHTML = clientUID;
            newRow.insertCell(1).innerHTML = data.company;
            newRow.insertCell(2).innerHTML = `<a href="javascript:readClient('${clientUID}')"><i class="bi-file-earmark-medical"></i></a>`;
            newRow.insertCell(3).innerHTML = `<a href="javascript:selectClient('${clientUID}')"><i class="bi-info-circle"></i></a>`;
            newCellTooltip(table, rowCount, 2, 'Edit Client', 'top');
            newCellStyling(table, rowCount, 2, 'class', 'col-2 text-center');
            newCellTooltip(table, rowCount, 3, 'View Client', 'top');
            newCellStyling(table, rowCount, 3, 'class', 'col-2 text-center');
            break;

        case 'view':
            rowCount = table.rows.length;
            newRow = table.insertRow(rowCount);
            newRow.insertCell(0).innerHTML = clientUID;
            newRow.insertCell(1).innerHTML = data.company;
            newRow.insertCell(2).innerHTML = `<a href="javascript:selectClient('${clientUID}')"><i class="bi-info-circle"></i></a>`;
            newCellTooltip(table, rowCount, 2, 'View Client', 'top');
            newCellStyling(table, rowCount, 2, 'class', 'col-2 text-center');
            break;

        case 'sites':
            siteUID = document.getElementById('editClientUID').innerHTML;
            rowCount = table.rows.length - 1;
            newRow = table.insertRow(rowCount);
            newRow.insertCell(0).innerHTML = clientUID;
            newRow.insertCell(1).innerHTML = data.site_name;
            newRow.insertCell(2).innerHTML = `<a href="javascript:readSite('${clientUID}', '${siteUID}')"><i class="bi-file-earmark-medical"></i></a>`;
            newCellTooltip(table, rowCount, 2, 'Edit Site', 'top');
            newCellStyling(table, rowCount, 2, 'class', 'col-2 text-center');
            break;

        case 'view_sites':
            siteUID = document.getElementById('editClientUID').innerHTML;
            rowCount = table.rows.length;
            newRow = table.insertRow(rowCount);
            newRow.insertCell(0).innerHTML = siteID;
            newRow.insertCell(1).innerHTML = data.site_name;
            newRow.insertCell(2).innerHTML = `<button type="button" class="btn btn-outline-primary" onclick="viewSite('${clientUID}', '${siteID}', '${data.site_name}')">View</button>`;
            newCellStyling(table, rowCount, 2, 'class', 'col-2 text-center');
            break;

        case 'site_documents':
            siteUID = document.getElementById('editClientUID').innerHTML;
            rowCount = table.rows.length - 1;
            newRow = table.insertRow(rowCount);
            data.document_types.forEach((element) => {
                newRow.insertCell(0).innerHTML = element;
                newRow.insertCell(1).innerHTML = `<a href="javascript:deleteRowDB('${type}', '${tableID}', ${rowCount}, 'client_sites')"><i class="bi me-2 bi-trash"></i></a>`;
                newCellStyling(table, rowCount, 1, 'class', 'col-1 text-center');
                newCellTooltip(table, rowCount, 1, 'Delete', 'top');
            });
            break;
        
        case 'monitor_default_element':
            rowCount = table.rows.length - 1;
            for (const key in data) {
                console.log(`${key}: ${data[key]}`)
                newRow = table.insertRow(rowCount);
                newRow.insertCell(0).innerHTML = key;
                newRow.insertCell(1).innerHTML = data[key];
                newRow.insertCell(2).innerHTML = `<a href="javascript:deleteRowDB('${type}', '${tableID}', 'defaults')"><i class="bi me-2 bi-trash"></i></a>`;
                newCellStyling(table, rowCount, 2, 'class', 'col-1 text-center');
                newCellTooltip(table, rowCount, 2, 'Delete', 'top');
            }
            break;
    }
}

// Edit Monitor Type Limit
const editMonitorTypeLimit = (tableID, dbData) => {
    clearTable(tableID, 2);
    defaultDB.doc('monitor_limits').collection(`${dbData}`).doc('elements')
        .get()
        .then((doc) => {
            document.getElementById('monitorTypeLimitTableHeader').innerHTML = dbData
            if (doc.exists) {
                // Display table with All elements
                insertRowClients(tableID, 'monitor_default_element', '', doc.data(), '', '')

            } else {
                // Display Modal Popup to create table
                console.log('No Documents')
            }
            
        
        })
        .catch((error) => {
            console.log("Error getting document:", error);
        })

    // ${tableID}', ${rowCount}, '${dbData}
}

// Edit Monitor Limit Elements
const editMonitorLimits = (tableID, dbData) => {
    clearTable(tableID, 2);
    defaultDB.doc('monitor_limits').collection(`${dbData}`).doc('elements')
        .get()
        .then((doc) => {
            document.getElementById('defaultMonitorLimitsElementsTable').innerHTML = dbData
            if (doc.exists) {
                // Display table with All elements
                insertRowClients(tableID, 'monitor_default_element', '', doc.data(), '', '')

            } else {
                // Display Modal Popup to create table
                console.log('No Documents')
            }
            
        
        })
        .catch((error) => {
            console.log("Error getting document:", error);
        })
}
