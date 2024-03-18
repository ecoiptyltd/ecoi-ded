<html>
 <head>
 <?php
   // Note that the PHP program is placed in the head so that it is executed
   // when a HTTP HEAD request is received. This avoids a lot of useless
   // data that is transferred with the body in response to a HTTP GET request.

   $servername = "localhost";
   // Set the following values to match your own id and database details
   $username = "geoickvz_termite";
   $password = "o9lB7GXiiWpm";
   $dbname = "geoickvz_termite";
   $tableName = "test_sens";

   // Create connection
   $conn = new mysqli($servername, $username, $password, $dbname);
   // Check connection
   if ($conn->connect_error) 
   {
    echo '<p>Connection failed</p>';
    die("Connection failed: " . $conn->connect_error);
   } 

   // Insert new record into the database
   $sql = "INSERT INTO $tableName (GsmT, PbV, PlV, Pc, Pw, Lp, Lt, Sco2, Stvoc, Sh2, Seth, Sh, Sah, St, Sdp, Sht) 
                            VALUES ('". $_GET["GsmT"] ."',
                                    '". $_GET["PbV"] ."',
                                    '". $_GET["PlV"] ."',
                                    '". $_GET["Pc"] ."',
                                    '". $_GET["Pw"] ."',
                                    '". $_GET["Lp"] ."',
                                    '". $_GET["Lt"] ."',
                                    '". $_GET["Sco2"] ."',
                                    '". $_GET["Stvoc"] ."',
                                    '". $_GET["Sh2"] ."',
                                    '". $_GET["Seth"] ."',
                                    '". $_GET["Sh"] ."',
                                    '". $_GET["Sah"] ."',
                                    '". $_GET["St"] ."',
                                    '". $_GET["Sdp"] ."',
                                    '". $_GET["Sht"] ."')";
   $result = $conn->query($sql);

   // To prevent overload on the database, delete records older than 31 days
   //$sql = "DELETE FROM Info WHERE Time < DATE_SUB(NOW(), INTERVAL 31 DAY);";
   //$result = $conn->query($sql);

   $conn->close();
   ?> 
 </head>
 <body>
 </body>
</html>

