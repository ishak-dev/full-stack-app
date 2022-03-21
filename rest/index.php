<?php
require 'D:\xampp\htdocs\Web-Programming-2022\vendor/autoload.php';
require_once "dao/server.php";

Flight::route('/index.php',function(){
    echo "Hello world!";
});


Flight::start();
?>
