<?php
class BaseDao{
  private $conn;
  private $table_name;
  public function __construct($table_name){
    $this->table_name = $table_name;
    $database = "127.0.0.1:3309";
    $username = "root";
    $password = "user";
    $schema = "webprogramming";

    $this->conn = new PDO ("mysql:host=$database;dbname=$schema", $username,$password);
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
    $data['id'] = $this->conn->lastInsertId();
    return $data;
  }

  public function update($data, $id, $id_column = "id"){
    $query = "UPDATE ".$this->table_name. " SET ";
    foreach($data as $name=>$value){
      $query .= $name ."= : ".$name.", ";
    }

    $query = substr($query,0,-2);
    $query .= "WHERE ${$id_column} = :id";

    $stmt = $this->conn->prepare($query);
    $data['id']= $id;
    $stmt->execute($data);
  }

  protected function query($query, $parmas){
    $stmt = $this->conn->prepare($query);
    $stmt->execute($params);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }
  protected function query_unique($query, $parmas){
    $result = $this->query($query, $parmas);
    return reset($result);
  }






}


?>
