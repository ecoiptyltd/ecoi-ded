<!DOCTYPE html>
<html>
<head>
    <?php
    // Note that the PHP program is placed in the head so that it is executed
    // when a HTTP HEAD request is received. This avoids a lot of useless
    // data that is transferred with the body in response to a HTTP GET request.
    $servername='ecoi-ded.ccqshuqr2yjq.eu-central-1.rds.amazonaws.com';
    $serverport=5432;
    $username='postgres';
    $password='BlueSkyFly36#^';
    $defaultsDB='ecoi_ded_defaults';
    $clientsDB='ecoi_ded_clients';
    $tableName = '_01_highlevel_monitor_types';
    
    $con = pg_connect("host=$servername dbname=$defaultsDB user=$username password=$password")
    or die ("Could not connect to server\n"); 

    $query = "SELECT * FROM $tableName"; 

    $rs = pg_query($con, $query) or die("Cannot execute query: $query\n");

    while ($row = pg_fetch_row($rs)) {
    echo "$row[0] $row[1] $row[2]\n";
    }

    pg_close($con); 


    /*$config = parse_ini_file('../../ini/db.ini');
    $servername = $config['servername'];
    $serverport = $config['serverport'];
    // Set the following values to match your own id and database details
    $username = $config['username'];
    $password = $config['password'];
   
    $dbname = $defaultsDB;
    
 
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname, $serverport);
    // Check connection
    if ($conn->connect_error) 
    {
     echo '<p>Connection failed</p>';
     die("Connection failed: " . $conn->connect_error);
    }

    // Insert new record into the database
   $sql = "SELECT * FROM $tableName";
    
   $result = $conn->query($sql);
   echo "<p>$result</p>";
   
   /*$db = mysql_select_db("company", $conn); // Selecting Database
    //MySQL Query to read data
    $query = mysql_query("select * from employee", $connection);
    while ($row = mysql_fetch_array($query)) {
    echo "<b><a href="readphp.php?id={$row['employee_id']}">{$row['employee_name']}</a></b>";
    echo "<br />";
    }
    $query = mysql_query("select * from _01_highlevel_monitor_types", $conn);
    */
    ?>
</head>
<body>
<?php echo "My First PHP site in VSCode."; ?>
</body>
</html>