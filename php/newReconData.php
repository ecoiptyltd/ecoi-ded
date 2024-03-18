<?php
// set node
$node = "ln00000024"; // node 1
// $node = "isibonelo_node_2"; // node 2

// set api url
$url = "http://solestial.live/db/$node/_design/views/_view/timestamp?descending=true&limit=10";

// call api
$json = file_get_contents($url);
$json = json_decode($json);
echo $json;
echo "testing";
?>