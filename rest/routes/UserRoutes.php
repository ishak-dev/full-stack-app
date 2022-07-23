<?php



Flight::route('GET /home/@id',function($id){
  Flight::json(Flight::userService()->getById(0,$id));
});

Flight::route('GET /home',function(){
  Flight::json(Flight::userService()->listAll());
});

Flight::route("POST /home",function(){
  $data = Flight::request()->data->getData();
  Flight::json(Flight::userService()->insert(Flight::get('user'),$data));
});


Flight::route("PUT /home/@id",function($id){
  $data = Flight::request()->data->getData();
  Flight::json(Flight::userService()->update(Flight::get('user'),$id,$data));
});

Flight::route('DELETE /home/@id',function($id){
  Flight::userService()->delete(Flight::get('user'),$id);
  Flight::json(["message"=>"deleted"]);
});


Flight::route('GET /home/@id/comments',function($id){
  Flight::json(Flight::userService()->getCommentsById($id));
});

?>
