<?php
// Note that the PHP program is placed in the head so that it is executed
    // when a HTTP HEAD request is received. This avoids a lot of useless
    // data that is transferred with the body in response to a HTTP GET request.  
    
    $config = parse_ini_file('aws-rds.ini');
    $servername = $config['servername'];
    $serverport = $config['serverport'];
    $username = $config['username'];
    $password = $config['password'];
    $defaultsDB = $config['defaultsDB'];

    //$tableName = $_GET['tableName'];
    $dbName = $defaultsDB;

    // Create connection
    $connect = pg_connect("host=$servername dbname=$dbName user=$username password=$password");
    
    if(!$connect) {
        die("Connection failed: " . $conn->connect_error);
    } 

