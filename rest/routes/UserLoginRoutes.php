<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

//Check login

Flight::route("POST /login",function(){
  $data = Flight::request()->data->getData();
  //Flight::json(Flight::userLoginService()->getUserByEmail($data));

  $user = Flight::userLoginDao()->getUserByEmail($data['email']);

  if(isset($user['id'])){
    if($user['password'] == md5($data['password'])){
      unset($user['password']);
      $jwt = JWT::encode($user, 'example_key', 'HS256');
      Flight::json(["token"=>$jwt]);
    }else{
      Flight::json(["message"=>"Password is not correct"],404);

    }
  }else{
    Flight::json(["message"=>"User is bad"],404);
  }

});

Flight::route("GET /logindata",function(){
  $user = Flight::get('user');
  Flight::json($user);
});
?>
