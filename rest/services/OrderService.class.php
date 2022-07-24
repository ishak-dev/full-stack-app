<?php

require_once __DIR__.'/BaseService.class.php';
require_once __DIR__.'/../dao/OrderDao.class.php';


class OrderService extends BaseService{


  public function __construct(){
    parent::__construct(new OrderDao());
  }

  public function getShopingCart($id_user){
    return $this->dao->getShopingCart($id_user);
  }
  public function getTotalPrice($id_user){
    return $this->dao->getTotalPrice($id_user);
  }
  public function orderRequest($id_user){
    return $this->dao->orderRequest($id_user);
  }
  public function deleteOrder($id_user){
    return $this->dao->deleteOrder($id_user);
  }
  public function getOrderInfo($user){
    if($user['admin'] != "true"){
      throw new Exception("You are not authorized");
    }
    return $this->dao->getOrderInfo($user);
  }

}

 ?>
