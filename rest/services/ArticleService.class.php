<?php

require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/ArticleDao.class.php';


class ArticleService extends BaseService{


  public function __construct(){
    parent::__construct(new ArticleDao());
  }

  public function get_admin_article($user){
    return $this->dao->get_admin_article($user['id']);
  }

  public function getArticleById($user, $id){
    $article= $this->getById($id);
    //this is business logic of out app
    if($article['user_id'] != $user['id']){
      throw new Exception("You are not authorized");
    }
    return $article;
  }
  // public function getCommentsById($id_user){
  //   return $this->dao->getCommentsById($id_user);
  // }

}

 ?>
