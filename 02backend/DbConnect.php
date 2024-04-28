<?php
class DbConnect 
{
    //vlastnosti tridy
    private $server='localhost';
    private $dbname='boats';
    private $user='root';
    private $pass='';
    private $options=array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_EMULATE_PREPARES => false
    );
    //PDO = PHP data object, poskytuje jednotný přístup k různým databázovým systémům
    //metoda tridy
    public function connect () {
        try{
            $conn = new PDO('mysql:host=' . $this->server . ';dbname=' . $this->dbname . ';charset=utf8', $this->pass, $this->options);
            return $conn;
        } catch(PDOException $error){
            echo "Database connection error: " . $error->getMessage();
        }
    }
}