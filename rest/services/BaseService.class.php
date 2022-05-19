<?php



abstract class BaseService{

  protected $dao;
  public function __construct($dao){
    $this->dao = $dao;
  }

  public function listAll(){
    return $this->dao->listAll();
  }
  public function getById($id){
    return $this->dao->getById($id);
  }
  public function delete($id){
    return $this->dao->delete($id);
  }

  public function insert($data){
    return $this->dao->insert($data);
  }
  public function update($id,$data){
    return $this->dao->update($id,$data);
  }



}

 ?>
