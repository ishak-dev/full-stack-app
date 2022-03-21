<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);

require '../vendor/autoload.php';
require_once "dao/server.php";

Flight::register('todoDao', 'TodoDao');

Flight::route('/index.php','hello');

function hello(){
  echo "hello world!";
}

Flight::start();
?>
