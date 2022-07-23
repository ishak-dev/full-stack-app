<?php



Flight::route('GET /article/@id',function($id){
  Flight::json(Flight::articleService()->getById(Flight::get('user'), $id));
});

Flight::route('GET /article',function(){
  $user = Flight::get('user');
  $search = Flight::query('search');
  Flight::json(Flight::articleService()->get_admin_article($user,$search));
});

Flight::route("POST /article",function(){
  $data = Flight::request()->data->getData();
  Flight::json(Flight::articleService()->insert(Flight::get('user'),$data));
});


Flight::route("PUT /article/@id",function($id){
  $data = Flight::request()->data->getData();
  Flight::json(Flight::articleService()->update(Flight::get('user'),$id,$data));
});

Flight::route('DELETE /article/@id',function($id){
  Flight::articleService()->delete(Flight::get('user'),$id);
  Flight::json(["message"=>"deleted"]);
});

// Flight::route("POST /article/{id}/share",function(){
//   $data = Flight::request()->data->getData();
//   Flight::json(Flight::articleService()->insert(Flight::get('user'),$data));
// });


// Flight::route('GET /article/@id/comments',function($id){
//   Flight::json(Flight::articleService()->getCommentsById($id));
// });

?>
