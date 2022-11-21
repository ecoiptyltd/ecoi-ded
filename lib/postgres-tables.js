/*
const addDeleteButtonSqlDB = (tableID, rowIndex, columnIndex) => {
    const table = document.getElementById(tableID);
    const id = table.row[rowIndex].cells[0].innerHTML;
    document.getElementById(tableID).row[rowIndex].cells[columnIndex].innerHTML = `<a href="javascript:deleteRowSqlDB('${tableID}', '${id}')"><i class="bi me-2 bi-trash"></i></a>`;
}
*/

const deleteRowSqlDB = (tableID, id) => {
    // Run PHP Script for SQL REMOVE
    alert(`Running PHP Script for SQL REMOVE for Table: ${tableID} and Item with ID: ${id}`);
}

const addRowSqlDB = (tableID, columnCount) => {
    // Run PHP Script for SQL INSERT
   
    let rowCount = document.getElementById(tableID).rows.length;
    let values = [];
    for(let i = 0; i <= columnCount; i++){
        values[i] = document.getElementById(tableID).rows[rowCount - 1].cells[i + 1];
    }
    alert(`Running PHP Script for SQL INSERT for Table: ${tableID} and Item with ID: ${rowCount}`);
    /*
    switch (tableID) {
        case 'defaultHighLevelMonitorTable':
            jQuery.ajax({
                type: "POST",
                url: './php/aws-rds/PUSH_highLevelMonitorTypes.php?'
            })
            break;
    
        default:
            break;
    }
*/
}
