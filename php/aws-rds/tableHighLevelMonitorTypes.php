<?php
include 'defaultsDBconnect.php';
//echo $result;
$result = $resultHighlevelMonitorTypes;

$i = 0;
/*
// Column Names
echo '<thead class="table-dark">
        <tr>
            <td>ID</td>
            <td>High Level Monitor Type</td>
        </tr>
      </thead>
      <tbody>';

while ($i < pg_num_fields($result)) {
    $fieldName = pg_field_name($result, $i);
    echo '<td>' . $fieldName . '</td>';
    $i = $i + 1;
}
echo '</tr>';
$i = 0;
*/
// Row Entries
while ($row = pg_fetch_row($result)) {
    echo '<tr>';
    $count = count($row);
    $y = 0;
    while ($y < $count) {
        $c_row = current($row);
        echo '<td>' . $c_row . '</td>';
        next($row);
        $y = $y + 1;
    }
    echo '</tr>';
    $i = $i + 1;
}
pg_free_result($result);
