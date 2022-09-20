<html>
<head>
    <?php
    // Note that the PHP program is placed in the head so that it is executed
    // when a HTTP HEAD request is received. This avoids a lot of useless
    // data that is transferred with the body in response to a HTTP GET request.
    $config = parse_ini_file('../../ini/db.ini');
    $servername = $config['servername'];
    $serverport = $config['serverport'];
    // Set the following values to match your own id and database details
    $username = $config['username'];
    $password = $config['password'];
    $dbname = $config['defaultsDB'];
    $tableName = '_01_highlevel_monitor_types';
 
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname, $serverport);
    // Check connection
    if ($conn->connect_error) 
    {
     echo '<p>Connection failed</p>';
     die("Connection failed: " . $conn->connect_error);
    }
    ?>
</head>
<body>
</body>
</html>