<?php

class server{
  private $conn;

  public function __construct(){
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
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function addUser($email,$username){
    $stmt= $this->conn->prepare("INSERT INTO users (username, email) VALUES (:username, :email)");
    $stmt->execute(['username'=>$username, 'email'=>$email]);
  }

  public function deleteUser($id_users){
    $stmt = $this->$conn->prepare("DELETE FROM useres WHERE id=:id");
    $stmt->bindParam(':id, $id_users');
    $stmt->execute();
  }

  public function updateUser($id_users,$email,$username){
    $stmt = $this->conn->prepare ("UPDATE users SET email = :email, username = :username WHERE id_users = :id");
    $stmt->execute(['email' => $email,'username' => $username, 'id' => $id_users]);
  }


}

$user = new server();

print_r( $user->printAll());

?>
