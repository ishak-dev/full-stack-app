<?php

require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/ArticleDao.class.php';


class ArticleService extends BaseService{


  public function __construct(){
    parent::__construct(new ArticleDao());
  }

  public function get_admin_article($user,$search=NULL){
    return $this->dao->get_admin_article($user['id'],$search);
  }

  public function getAllArticle($search=NULL){
    return $this->dao->getAllArticle($search);
  }


  public function getById($user, $id){
    $article= parent:: getById($user,$id);
    //this is business logic of out app
    // if($article['user_id'] != $user['id']){
    //   throw new Exception("You are not authorized");
    // }
    return $article;
  }
  // public function getCommentsById($id_user){
  //   return $this->dao->getCommentsById($id_user);
  // }

  public function insert($user,$data){
    if($user['admin'] != "true"){
      throw new Exception("You are not authorized");
    }
    $data['user_id'] = $user['id'];
    return parent::insert($user,$data);
  }

  public function update($user,$id,$data){
    $article = $this->getById($user,$id);
    if($article['user_id'] != $user['id'] || $user['admin'] != "true"){
      throw new Exception("You dont have permission:)");
    }
    unset($data['user_id']);
    unset($data['status']);
    return parent::update($user,$id,$data);
  }

  public function delete($user,$id){
      $article = $this->getById($user,$id);
      if($article['user_id'] != $user['id'] || $user['admin'] != "true"){
        throw new Exception("You dont have permission:)");
      }
      parent::update($user, $id, ['status' => 'ARCHIVED']);
  }




}

 ?>
