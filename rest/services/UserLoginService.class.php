<?php

require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/UserLoginDao.class.php';


class UserLoginService extends BaseService{


  public function __construct(){
    parent::__construct(new UserLoginDao());
  }
  public function getUserByEmail($email){
    return $this->dao->getUserByEmail($email);
  }

}

 ?>
