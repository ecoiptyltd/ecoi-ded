<?php
include './php/aws-rds/defaultsDBconnect.php';

$tableName = '_01_highlevel_monitor_types';

$value = $_GET['value'];

$i = 0;

$sql = "INSERT INTO $tableName (highlevel_type)
            VALUES (:value)";

$stmt = $this->pdo->prepare($sql);

$stmt->bindValue(':value', $value);
$stmt->execute();

pg_close($connect);
?>