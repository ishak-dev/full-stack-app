<?php

require_once __DIR__.'/BaseDao.class.php';

class UserDao extends BaseDao{

  public function __construct(){
    parent::__construct("users");
  }
  public function getCommentsById($id_user){
    return $this->query("SELECT * FROM comments WHERE id_user = :id_user", ['id_user'=>$id_user]);

  }


}



?>
