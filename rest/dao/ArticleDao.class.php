<?php


require_once __DIR__.'/BaseDao.class.php';

class ArticleDao extends BaseDao{

  public function __construct(){
    parent::__construct("article");
  }

  public function get_admin_article($user_id){
    return $this->query("SELECT * FROM article WHERE user_id = :user_id", ['user_id'=>$user_id]);
  }




}



?>
