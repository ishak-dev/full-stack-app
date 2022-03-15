<?php

class server{
  private $conn;

  public function __constructor(){
    $servername = '127.0.0.1:3309';
    $username = 'root';
    $password = 'user';
    $schema = 'webprogramming';
    $this->conn = new PDO("mysql:host=$servername;dbname=$schema",$username,$password);
    $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }

  public function printAll(){
    $stmt= $this->conn->prepare("SELECT * FROM users");
    $stmt->execute();
    return $stmt->fetchAll(PD::FETCH_ASSOC);
  }

  public function addUser($email,$username){

  }


}


?>
