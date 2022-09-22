<?php
// Note that the PHP program is placed in the head so that it is executed
    // when a HTTP HEAD request is received. This avoids a lot of useless
    // data that is transferred with the body in response to a HTTP GET request.  
    
    $config = parse_ini_file('./../../ini/aws-rds.ini');
    $servername = $config['servername'];
    $serverport = $config['serverport'];
    $username = $config['username'];
    $password = $config['password'];
    $defaultsDB = $config['defaultsDB'];

    $dbname = $defaultsDB;

    // Create connection
    $connect = pg_connect("host=$servername dbname=$defaultsDB user=$username password=$password");
    
    if(!$connect) {
        die("Connection failed: " . $conn->connect_error);
    } 

    // Queries
    // * _01_highlevel_monitor_types
    $querySelectHighlevelMonitorTypes = "SELECT * FROM _01_highlevel_monitor_types";
    // * _02_monitor_type
    $querySelectMonitorTypes = "SELECT * FROM _02_monitor_type";
    // * _03_averaging_period
    $querySelectAveragingPeriod = "SELECT * FROM _03_averaging_period";
    // * _04_particulate_category
    $querySelectParticulateCategory = "SELECT * FROM _04_particulate_category";
    // * _05_units
    $querySelectUnits = "SELECT * FROM _05_units";
    // * particulate_limits
    $querySelectParticulateLimits = "SELECT * FROM particulate_limits";
    // * water_limits
    $querySelectWaterLimits = "SELECT * FROM water_limits";
  
    $resultHighlevelMonitorTypes = pg_query($connect, $querySelectHighlevelMonitorTypes);
    $resultMonitorTypes = pg_query($connect, $querySelectMonitorTypes);
    $resultAveragingPeriod = pg_query($connect, $querySelectAveragingPeriod);
    $resultParticulateCategory = pg_query($connect, $querySelectParticulateCategory);
    $resultUnits = pg_query($connect, $querySelectUnits);
    $resultParticulateLimits = pg_query($connect, $querySelectParticulateLimits);
    $resultWaterLimits = pg_query($connect, $querySelectWaterLimits);
    
    pg_close($connect);
