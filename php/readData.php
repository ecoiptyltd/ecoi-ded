<?php
$servername = "localhost";
// Set the following values to match your own id and database details
$username = "geoickvz_termite";
$password = "o9lB7GXiiWpm";
$dbname = "geoickvz_termite";
$tableName = "test";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) 
{
 echo '<p>Connection failed</p>';
 die("Connection failed: " . $conn->connect_error);
} 

$queryAll = "SELECT * FROM test ORDER BY test.GsmT  ASC";
$result = $conn->query($queryAll);

if (!$result){
    echo '<p>SQL Query Failed</p>';
    die(mysql_error());
}

$data = array();

//if ($result->num_rows > 0){
//    while($row = $result->fetch_assoc()){
//        $data[] = $result;
//    }
//}

for ($x = 0; $x < mysqli_num_rows($result); $x++){
   $data[] = mysqli_fetch_assoc($result);
}

echo json_encode($data);

$conn->close();