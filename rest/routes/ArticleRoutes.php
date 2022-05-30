<?php



Flight::route('GET /article/@id',function($id){
  Flight::json(Flight::articleService()->getById($id));
});

Flight::route('GET /article',function(){
  Flight::json(Flight::articleService()->listAll());
});

Flight::route("POST /article",function(){
  $data = Flight::request()->data->getData();
  Flight::json(Flight::articleService()->insert($data));
});


Flight::route("PUT /article/@id",function($id){
  $data = Flight::request()->data->getData();
  Flight::json(Flight::articleService()->update($id,$data));
});

Flight::route('DELETE /article/@id',function($id){
  Flight::articleService()->delete($id);
  Flight::json(["message"=>"deleted"]);
});


// Flight::route('GET /article/@id/comments',function($id){
//   Flight::json(Flight::articleService()->getCommentsById($id));
// });

?>
