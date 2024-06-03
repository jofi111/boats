<?php
header("Acces-Control-Allow-Origin: *"); //jde o testovaci aplikaci v ramci meho webhostingu tak * povoluje vse, puvod muze byt odkudkoliv
header("Acces-Control-Allow-Headers: *"); //povoluje vsechny hlavicky
header("Acces-Control-Allow-Method: GET, POST, PUT, DELETE"); //povoluje cteni, zapis, zmenu, mazani
header("Content-Type: application/json; charset=utf-8"); //komunikace mezi klientem a serverem pouze pomoci jsonu

include("./DbConnect.php");

$connection = new DbConnect(); //vytvori instanci tridy dbconnect
$database = $connection->connect(); //zavolani metody connect, kt vrati pdo objekt (=pripojeni)

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET' :
        $action = $_GET['action'];
        if ($action == 'getAll'){
            $sql = "SELECT * FROM boats";
            $stmt = $database->prepare($sql); //pozadavek=statement, do db se posle dotaz (viz o radek vyse)
            $stmt->execute(); //zavolani metody execute
            $boats = $stmt ->fetchAll(PDO::FETCH_ASSOC);
            //var_dump($boats);
            echo json_encode($boats,JSON_UNESCAPED_UNICODE);
        } else if ($action == "getSpec"){
            $idsParam = isset($_GET['ids']) ? $_GET['ids'] : '';
            $ids = explode(',', $idsParam);
            $ids = array_filter($ids, function ($value) {
                return $value != '';
            });
            //SELECT * FROM boats WHERE id IN ($STRING)
            $ids = implode(',', array_map('intval', $ids));
            if($ids != ''){
                $sql = "SELECT * FROM boats WHERE id IN ($ids)";
                $stmt = $database->prepare($sql); //pozadavek=statement, do db se posle dotaz (viz o radek vyse)
                $stmt->execute(); //zavolani metody execute
                $boats = $stmt ->fetchAll(PDO::FETCH_ASSOC);
                //var_dump($boats);
                echo json_encode($boats,JSON_UNESCAPED_UNICODE); 
                //pridan parametr JSON_UNESCAPED_UNICODE pro spravne zobrazeni ceskych znaku
            } else {
                echo json_encode([]);
            }
        }
        break;
    default: break;
}
