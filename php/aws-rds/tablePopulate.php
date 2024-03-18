<?php
$dbName = $_GET['dbName'];
$tableName = $_GET['tableName'];
$tableID = $_GET['tableID'];
$delete = $_GET['delete']; // Add Delete Row Button - TRUE or FALSE

include 'dbGET.php?dbname='.$dbName.'&tableName='.$tableName.'&queryType=selectAll&tablePopulate=TRUE&tableID='.$tableID;

$i = 0;
// Row Entries
while ($row = pg_fetch_row($result)) {
    echo '<tr>';
    $count = count($row);
    $y = 0;
    $id;
    while ($y < $count) {
        $c_row = current($row);
        // Get ID column value
        if($y == 0){
            $id = $c_row;
        }
        echo '<td>' . $c_row . '</td>';
        next($row);
        $y = $y + 1;
    }
    if($delete == 'TRUE'){echo '<td class="col-1 text-center"><a href="javascript:deleteRowSqlDB(\'' . $tableID . '\', ' . $id . ')"><i class="bi me-2 bi-trash"></i></a>';};
    echo '</tr>';
    $i = $i + 1;
}

pg_free_result($result);
pg_close($connect);

?>