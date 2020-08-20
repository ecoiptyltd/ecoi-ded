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
   $tableName = "test_sys";

   // Create connection
   $conn = new mysqli($servername, $username, $password, $dbname);
   // Check connection
   if ($conn->connect_error) 
   {
    echo '<p>Connection failed</p>';
    die("Connection failed: " . $conn->connect_error);
   } 

   // Insert new record into the database
   $sql = "INSERT INTO $tableName (GsmT, UtD, UtH, UtM, UtS, Ram, ResT, ResI, Gps, LpsP, LpsT, Svm, Ol, ComT, Sig) 
                            VALUES ('". $_GET["GsmT"] ."',
                                    '". $_GET["UtD"] ."',
                                    '". $_GET["UtH"] ."',
                                    '". $_GET["UtM"] ."',
                                    '". $_GET["UtS"] ."',
                                    '". $_GET["Ram"] ."',
                                    '". $_GET["ResT"] ."',
                                    '". $_GET["ResI"] ."',
                                    '". $_GET["Gps"] ."',
                                    '". $_GET["LpsP"] ."',
                                    '". $_GET["LpsT"] ."',
                                    '". $_GET["Svm"] ."',
                                    '". $_GET["Ol"] ."',
                                    '". $_GET["ComT"] ."',
                                    '". $_GET["Sig"] ."')";
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

