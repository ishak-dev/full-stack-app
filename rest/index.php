<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);

require_once "../vendor/autoload.php";
require_once "dao/server.php";

//Flight::route('/home','hello');

Flight::register('server','Server');

Flight::route('GET /home/@id',function($id){
  Flight::json(Flight::server()->getById($id));
});

Flight::route('GET /home',function(){
  Flight::json(Flight::server()->listAll());
});

//Fligth::route("POST /home/@user");

Flight::route("PUT /home/@id",function($id){
  $data = Flight::request()->data->getData();
  $data['id'] = $id;
  Flight::json(Flight::server()->updateUser($data));
});

Flight::route('DELETE /home/@id',function($id){
  Flight::server()->deleteUser($id);
  Flight.json(["message"=>"deleted"]);
});

Flight::start();
?>
