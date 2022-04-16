<?php

Flight::route('GET /comment/@id',function($id){
  Flight::json(Flight::commentService()->getById($id));
});

Flight::route('GET /comment',function(){
  Flight::json(Flight::commentService()->listAll());
});

Flight::route("POST /comment",function(){
  $data = Flight::request()->data->getData();
  Flight::json(Flight::commentService()->insert($data));
});


Flight::route("PUT /comment/@id",function($id){
  $data = Flight::request()->data->getData();
  $data['id'] = $id;
  Flight::json(Flight::commentService()->update($data));
});

Flight::route('DELETE /comment/@id',function($id){
  Flight::commentService()->delete($id);
  Flight::json(["message"=>"deleted"]);
});

?>
