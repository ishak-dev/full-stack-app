<?php
Flight::route('GET /articleUser/@id',function($id){
  Flight::json(Flight::articleService()->getById(0, $id));//If we want to include check again, remove "0" and comment from getById
});

Flight::route('GET /articleUser',function(){
  $user = Flight::get('user');
  $search = Flight::query('search');
  Flight::json(Flight::articleService()->getAllArticle($search));
});



?>
