<?php

require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/UserDao.class.php';


class UserService extends BaseService{


  public __construct(){
    parent::__construct(new UserDao());
  }

 
}

 ?>
