<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);

require_once __DIR__ ."/../vendor/autoload.php";
require_once __DIR__ ."/services/CommentService.class.php";
require_once __DIR__ ."/services/UserService.class.php";
//require_once __DIR__ ."/services/UserLoginService.class.php";
require_once __DIR__ ."/dao/UserLoginDao.class.php";

Flight::register('userService','UserService');
Flight::register('commentService','CommentService');
//Flight::register('userLoginService','UserLoginService');
Flight::register('userLoginDao','UserLoginDao');

require_once __DIR__.'/routes/UserRoutes.php';
require_once __DIR__.'/routes/CommentRoutes.php';
require_once __DIR__.'/routes/UserLoginRoutes.php';



Flight::start();
?>
