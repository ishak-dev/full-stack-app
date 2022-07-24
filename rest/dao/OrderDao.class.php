<?php

require_once __DIR__.'/BaseDao.class.php';

class OrderDao extends BaseDao{

  public function __construct(){
    parent::__construct("orders");
  }
  public function getShopingCart($id_user){
    return $this->query("SELECT * FROM orders
      INNER JOIN article ON orders.id_article = article.id AND orders.id_user= :id_user",
      ['id_user'=>$id_user]);

  }

  public function getTotalPrice($id_user){
    return $this->query("SELECT orders.id_article, orders.id_user, article.title,SUM(price) as price
    FROM orders
    INNER JOIN article ON orders.id_article = article.id AND orders.id_user=:id_user",
    ['id_user'=>$id_user]);
  }

  public function orderRequest($id_user){
    parent::__construct("order_requests");

    $items_list = " ";
    $order = $this->getShopingCart($id_user);
    foreach ($order as $key) {
      $items_list .= $key['title'].", ";
    }
    $price = $this->getTotalPrice($id_user);
    $price = $price[0]['price'];
    // return $this->query_unique("INSERT INTO order_requests (items,id_user,price,status)
    // VALUES (:items,:id_user,:price,:status)",
    // ['items'=>$items_list,'id_user'=>$id_user,'price'=>$price,'status'=>'ACTIVE']);
    $data['items'] = $items_list;
    $data['id_user'] = $id_user;
    $data['price'] = $price;
    return $this->insert($data);
  }


  public function getOrderInfo($user){
    return $this->query("SELECT order_requests.id, order_requests.items, users.name, users.surname, users.address, order_requests.price, status
      FROM order_requests
      INNER JOIN users ON order_requests.id_user = users.id",[""]);
  }


  // public function insert($user,$article_id){
  //   return $this->query("INSERT INTO orders (date,id_article,id_user) VALUES (:)", ['id_user'=>$id_user]);
  // }


}



?>
