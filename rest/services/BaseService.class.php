<?php



abstract class BaseService{

  protected $dao;
  public function __construct($dao){
    $this->dao = $dao;
  }

  public function listAll(){
    return $this->dao->listAll();
  }
  public function getById($user,$id){
    return $this->dao->getById($id);
  }
  public function delete($user,$id){
    return $this->dao->delete($id);
  }

  public function insert($user,$data){
    return $this->dao->insert($data);
  }
  public function update($user,$id,$data){
    return $this->dao->update($id,$data);
  }



}

 ?>
