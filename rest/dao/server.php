<?php

class Server{

  private $conn;

  public function __construct(){
    $database = "127.0.0.1:3309";
    $username = "root";
    $password = "user";
    $schema = "webprogramming";

    $this->conn = new PDO ("mysql:host=$database;dbname=$schema", $username,$password);
    $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }

  public function listAll(){
    $stmt = $this->conn->prepare("SELECT * FROM users");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function getById($id){
    $stmt = $this->conn->prepare("SELECT * FROM users WHERE id = :id");
    $stmt->execute(['id'=>$id]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return reset($result);
  }

  public function addUser($data){
    $stmt = $this->conn->prepare("INSERT INTO users (username, email) VALUES (:username, :email)");
    $stmt->execute($data);
    //$data['id'] = $this->conn->lastInsertId();
    return $data;
  }

  public function updateUser($data){
    $stmt = $this->conn->prepare("UPDATE users SET username = :username, email = :email WHERE id = :id");
    $stmt->execute($data);
    return $data;
  }

  public function deleteUser($id){
    $stmt = $this->conn->prepare("DELETE FROM users WHERE id = :id");
    $stmt->bindParam(':id',$id);
    $stmt->execute();
  }


}



?>
