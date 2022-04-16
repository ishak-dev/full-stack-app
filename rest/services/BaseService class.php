<?php



class BaseService{

  private $dao;
  public __construct($dao){
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
  public function update($data,$id){
    return $this->dao->update($data,$id);
  }



}

 ?>
