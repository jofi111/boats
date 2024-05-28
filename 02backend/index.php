<?php
header("Acces-Control-Allow-Origin: *"); //jde o testovaci aplikaci v ramci meho webhostingu tak * povoluje vse, puvod muze byt odkudkoliv
header("Acces-Control-Allow-Headers: *"); //povoluje vsechny hlavicky
header("Acces-Control-Allow-Method: GET, POST, PUT, DELETE"); //povoluje cteni, zapis, zmenu, mazani
header("Content-Type: application/json; charset=utf-8"); //komunikace mezi klientem a serverem pouze pomoci jsonu

include("./DbConnect.php");

$connection = new DbConnect(); //vytvori instanci tridy dbconnect
$database = $connection->connect(); //zavolani metody connect, kt vrati pdo objekt (=pripojeni)

$sql = "SELECT * FROM boats";
$stmt = $database->prepare($sql); //pozadavek=statement, do db se posle dotaz (viz o radek vyse)
$stmt->execute(); //zavolani metody execute
$boats = $stmt ->fetchAll(PDO::FETCH_ASSOC);
//var_dump($boats);
echo json_encode($boats);