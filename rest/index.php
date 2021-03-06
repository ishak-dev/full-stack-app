<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once __DIR__ ."/../vendor/autoload.php";
require_once __DIR__ ."/services/CommentService.class.php";
require_once __DIR__ ."/services/UserService.class.php";
require_once __DIR__ ."/services/ArticleService.class.php";
require_once __DIR__ ."/services/OrderService.class.php";
//require_once __DIR__ ."/services/UserLoginService.class.php";
require_once __DIR__ ."/dao/UserLoginDao.class.php";

Flight::register('userService','UserService');
Flight::register('commentService','CommentService');
Flight::register('articleService','ArticleService');
Flight::register('orderService','OrderService');
//Flight::register('userLoginService','UserLoginService');
Flight::register('userLoginDao','UserLoginDao');


// Flight::map('error' ,function(Exception $ex){
//   Flight::json(["message" => $ex->getMessage()],500);
// });

/* utility function for reading query parameters from URL */
Flight::map('query', function($name, $default_value = NULL){
  $request = Flight::request();
  $query_param = @$request->query->getData()[$name];
  $query_param = $query_param ? $query_param : $default_value;
  if($query_param != null){
  return urldecode($query_param);}
});

//middleware method for login
Flight::route('/*',function(){
  //perform JWT decode
  $path = Flight::request()->url;
  if($path =='/login') return TRUE;   //exclude login route from middleware
  $headers = getallheaders();
  if($path=='/login' || $path == '/docs.json') return TRUE;
  if(@!$headers['Authorization']){
    Flight::json(["message" => "Authorization is missing"],403);
    return FALSE;
  }else {
    try {
      $decoded = (array)JWT::decode($headers['Authorization'],new Key('example_key','HS256'));
      Flight::set('user',$decoded);
      return TRUE;
    } catch (\Exception $e) {
      Flight::json(["message" => "Authorization token is not valid"],403);
      return FALSE;
    }

  }
  print_r($headers);
});

Flight::route('/article',function(){
  $user = Flight::get('user');
  print_r($user);
  if($user['admin']!="true"){
    Flight::json(["message" => "You are not authorized, go back "],403);
    return FALSE;
  }
  return TRUE;
});


/*REST API documentation endpoint*/
Flight::route('GET /docs.json',function(){
  $openapi=\OpenApi\scan('routes');
  header('Content-Type:application/json');
  echo $openapi->toJson();
});

require_once __DIR__.'/routes/UserRoutes.php';
require_once __DIR__.'/routes/CommentRoutes.php';
require_once __DIR__.'/routes/ArticleRoutes.php';
require_once __DIR__.'/routes/OrderRoutes.php';
require_once __DIR__.'/routes/ArticleUserRoutes.php';
require_once __DIR__.'/routes/UserLoginRoutes.php';




Flight::start();
?>
