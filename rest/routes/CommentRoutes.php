<?php

/**
* @OA\Get(path="/comment/{id}",tags={"comments"},security={{"ApiKeyAuth":{}}},
*         summary ="Return comment with id",
*         @OA\Parameter(in="path",name="id",example=1,description="id of comment"),
*         @OA\Response(response=200,description="Get specified comment")
* )
*/

Flight::route('GET /comment/@id',function($id){
  Flight::json(Flight::commentService()->getById($id));
});

/**
* @OA\Get(path="/comment",tags={"comments"},security={{"ApiKeyAuth":{}}},
*         summary="Return all coments from user from the api",
*         @OA\Response(response=200,description="List of comments of user")
* )
*/

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
