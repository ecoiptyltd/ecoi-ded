<?php

use Symfony\Component\HttpClient\HttpClient;

require_once "./vendor/autoload.php";

$pdo = new PDO( 'pgsql:host=localhost;dbname=mydb', 'muhammadsaim', 'muhammadsaim' );

//https: //solestial.live/db/ln00000024/_design/views/_view/timestamp?inclusive_end=true&start_key="2020-11-23T00:00:00.000Z"&end_key="2020-11-25T00:00:00.000Z"&descending=false

function saveIOTData( $start = null, $end = null ) {
    global $pdo;
    $client = HttpClient::create( ['verify_peer' => false, 'verify_host' => false] );
    $url = 'https://solestial.live/db/ln00000024/_design/views/_view/timestamp?inclusive_end=true&start_key="' . $start . '"&end_key="' . $end . '"&descending=false';
    $response = $client->request( 'GET', $url );
    $data = json_decode( $response->getContent(), true )['rows'];
    dump( [$url, $data] );
    $sql_query = "INSERT INTO my_table(
	id, date, seq, bat_volt, bat_power, temp, hum, rain, ws, wd, co2, voc, pm1, pm25, pm4, pm10, nc05, nc1, nc25, nc4, nc10, tps)
	VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    foreach ( $data as $value ) {
        $sql_data = [$value['id'], $value['key']];
        $exclude = [20, 21, 23, 24, 25, 26];
        $count = 1;
        $values = explode( ",", $value['value'] );
        foreach ( $values as $v ) {
            if ( !in_array( $count, $exclude ) ) {
                array_push( $sql_data, $v );
            }
            $count++;
        }

        // dd( $sql_data );
        $stmt = $pdo->prepare( $sql_query );
        $stmt->execute( $sql_data );
    }

}
// echo __DIR__;
saveIOTData( date( 'Y-m-d\TH:i:s.u\Z', strtotime( "2020-11-26T00:00:00.000Z" ) ), date( 'Y-m-d\TH:i:s.u\Z', strtotime( "2020-11-27T00:00:00.000Z" ) ) );