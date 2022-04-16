<?php

require_once __DIR__.'/../dao/Users.class.php';

class UserService{

  private $dao;
  public __construct(){
    $this->dao = new Users();
  }

  public function get_all(){
    return $this->dao->get_all();
  }

}

 ?>
