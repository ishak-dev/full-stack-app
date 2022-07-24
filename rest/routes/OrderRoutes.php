<?php

Flight::route("POST /cart",function(){
  $data = Flight::request()->data->getData();
  $user = Flight::get('user');
  $data['id_user'] = $user['id'];
  Flight::json(Flight::orderService()->insert(Flight::get('user'),$data));
});

Flight::route("GET /cart", function(){
  $user = Flight::get('user');
  Flight::json(Flight::orderService()->getShopingCart($user['id']));
});

Flight::route("GET /cartprice", function(){
  $user = Flight::get('user');
  Flight::json(Flight::orderService()->getTotalPrice($user['id']));
});

Flight::route("POST /order_request", function(){
  $user = Flight::get('user');
  $data = Flight::request()->data->getData();
  Flight::json(Flight::orderService()->orderRequest($user['id']));
});

Flight::route("DELETE /order", function(){
  $user = Flight::get('user');
  Flight::json(Flight::orderService()->deleteOrder($user['id']));
});


Flight::route('GET /adminorder',function(){
  Flight::json(Flight::orderService()->getOrderInfo(Flight::get('user')));
});

Flight::route('GET /adminorder/@id',function($id){
  Flight::json(Flight::orderService()->getOrderInfoById(Flight::get('user'),$id));
});

Flight::route('PUT /adminorder/@id',function($id){
  Flight::json(Flight::orderService()->putOrderInfoById(Flight::get('user'),$id));
});
?>
