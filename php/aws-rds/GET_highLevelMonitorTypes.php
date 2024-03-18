<?php
include './php/aws-rds/GET_defaultsDBconnect.php';
//echo $result;
$result = $resultHighLevelMonitorTypes;
$tableID = 'defaultHighLevelMonitorTable';

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
    echo '<td class="col-1 text-center"><a href="javascript:deleteRowSqlDB(\'' . $tableID . '\', ' . $id . ')"><i class="bi me-2 bi-trash"></i></a></td>';
    echo '</tr>';
    $i = $i + 1;
}

pg_free_result($result);

?>