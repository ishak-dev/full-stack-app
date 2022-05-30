<?php

require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/ArticleDao.class.php';


class ArticleService extends BaseService{


  public function __construct(){
    parent::__construct(new ArticleDao());
  }
  // public function getCommentsById($id_user){
  //   return $this->dao->getCommentsById($id_user);
  // }

}

 ?>
