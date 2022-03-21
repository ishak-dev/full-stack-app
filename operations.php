<?php
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);

require_once("server.php");

$userClass = new server();

$operations = $_REQUEST['operations'];

switch($operations){
  case 'insert':
     $email = $_REQUEST['email'];
     $username = $_REQUEST['username'];
     $userClass->addUser($email,$username);
     break;

  case 'delete':
     $id = $_REQUEST['id'];
     $userClass->deleteUser($id);
     break;

  case 'update':
     $id = $_REQUEST['id'];
     $email = $_REQUEST['email'];
     $username = $_REQUEST['username'];
     $userClass->updateUser($id,$email,$username);
     break;
}

 ?>
