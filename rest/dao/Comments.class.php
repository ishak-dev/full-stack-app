<?php


require_once __DIR__.'/BaseDao.php';

class CommentDao extends BaseDao{

  public function __construct(){
    parent::__construct("notes");
  }


  public function addUser($data){
    $stmt = $this->conn->prepare("INSERT INTO $this->table_name (username, email) VALUES (:username, :email)");
    $stmt->execute($data);
    //$data['id'] = $this->conn->lastInsertId();
    return $data;
  }

  public function updateUser($data){
    $stmt = $this->conn->prepare("UPDATE $this->table_name SET username = :username, email = :email WHERE id = :id");
    $stmt->execute($data);
    return $data;
  }

}



?>
