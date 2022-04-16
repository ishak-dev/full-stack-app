<?php

require_once __DIR__.'/../dao/Comments.class.php';

class UserService{

  private $dao;
  public __construct(){
    $this->dao = new CommentsDao();
  }

  public function get_all(){
    return $this->dao->get_all();
  }

}

 ?>
