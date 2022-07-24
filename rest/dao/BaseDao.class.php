<?php

require_once __DIR__.'/../Config.class.php';

class BaseDao{
  private $conn;
  private $table_name;
  public function __construct($table_name){
    $this->table_name = $table_name;
    $servername = Config::DB_HOST();
    $username = Config::DB_USERNAME();
    $password = Config::DB_PASSWORD();
    $schema = Config::DB_SCHEME();
    $port = Config::DB_PORT();

    $this->conn = new PDO ("mysql:host=$servername;dbname=$schema;port=$port", $username, $password);
    $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }

  public function listAll(){
    $stmt = $this->conn->prepare("SELECT * FROM ".$this->table_name);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function getById($id){
    $stmt = $this->conn->prepare("SELECT * FROM ". $this->table_name ." WHERE id = :id");
    $stmt->execute(['id'=>$id]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return reset($result);
  }

  public function delete($id){
    $stmt = $this->conn->prepare("DELETE FROM ".$this->table_name." WHERE id = :id");
    $stmt->bindParam(':id',$id);
    $stmt->execute();
  }


  public function deleteOrder($id_user){
      $stmt=$this->conn->prepare("DELETE FROM orders WHERE id_user = :id_user");
      $stmt->bindParam(':id_user',$id_user);
      $stmt->execute();
  }

  public function insert($data){
    $query = "INSERT INTO ".$this->table_name." (";
    foreach ($data as $column => $value){
      $query .=$column.", ";
    }
    $query = substr($query,0,-2);
    $query .=") VALUES (";
    foreach ($data as $column => $value){
      $query .= ":".$column.", ";
    }
    $query = substr($query,0,-2);
    $query .= ")";

    $stmt = $this->conn->prepare($query);
  // $data['id'] = $this->conn->lastInsertId();
    $stmt->execute($data);
    return $data;
  }

  public function update($id, $data, $id_column = "id"){
    $query = "UPDATE " .$this->table_name. " SET ";
    foreach($data as $name=>$value){
      $query .= $name ."= :". $name. ", ";
    }

    $query = substr($query,0,-2);
    $query .= " WHERE ${id_column} = :id";

    $stmt = $this->conn->prepare($query);
    $data['id']= $id;
    $stmt->execute($data);
  }


  protected function query($query, $parmas){
    $stmt = $this->conn->prepare($query);
    $stmt->execute($parmas);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }
  protected function query_unique($query, $parmas){
    $result = $this->query($query, $parmas);
    return reset($result);
  }






}


?>
