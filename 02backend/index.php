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
    case 'DELETE':
        break;
        $requestUrl = $_SERVER['REQUEST_URI'];
        $pathSegment = explode('/', trim($requestUrl, '/'));
        $boatId = $pathSegment[count($pathSegment)-1];
        $sql  = "DELETE FROM boats WHERE id=:id";
        $stmt = $database->prepare($sql);
        $stmt->bindParam(':id', $boatID, PDO::PARAM_INT);
        if($stmt->execute()) {
            $data = ['status' => 1, 'message' => 'Boat deleted.'];
        } else {
            $data = ['status' => 0, 'message' => 'Error during deletion of boat.'];
        } else {
            $data = ['status' => 0, 'message' => 'ID of the boat was not numeric.'];
        }
        echo json_encode($data);
        break;
    case 'POST':
        $boat = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO boat(brand, model, reg, hours, year) VALUES(:brand, :model, :reg, :hours, :year)";
        // : znamenaji bind parametry
        $stmt = $database->prepare($sql);
        $stmt->bindParam(':brand', $boat->brand);
        $stmt->bindParam(':model', $boat->model);
        $stmt->bindParam(':reg', $boat->reg);
        $stmt->bindParam(':hours', $boat->hours);
        $stmt->bindParam(':year', $boat->year);
        if ($stmt->execute()) {
            $data = ['status' => 1, 'message' => 'Boat added.'];
        } else {
            $data = ['status' => 0, 'message' => 'Error during addition of boat.'];
        }
        echo json_encode($data);
        break;
        //commit POST se mi z nejakeho duvodu nacetl do commmitu frontendu, ktery jsem ulozil pred chvili
    default: break;
}
