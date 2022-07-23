<?php


require_once __DIR__.'/BaseDao.class.php';

class ArticleDao extends BaseDao{

  public function __construct(){
    parent::__construct("article");
  }

  public function get_admin_article($user_id,$search=NULL){
    $query = "SELECT * FROM article WHERE user_id = :user_id";
    if(isset($search)){
      $query .= " AND title LIKE '%".$search."%' ";
    }
    return $this->query($query, ['user_id'=>$user_id]);
  }

  public function getAllArticle($search=NULL){
    $query = "SELECT * FROM article WHERE ";
    if(isset($search)){
      $query .= " title LIKE '%".$search."%' ";
    }
    return $this->query($query,['']);
  }





}



?>
