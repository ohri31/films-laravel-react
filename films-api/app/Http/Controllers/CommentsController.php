<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Validator;

use App\Comment;
use App\Film;
use App\User;

class CommentsController extends Controller
{
	public function list($slug)
	{
		$film = Film::where('slug', '=', $slug)->first();

		if($film == null) return response()->json(["message" => "Can't find this film"], 400);

		return response()->json($film->comments, 200);
	}

    public function store(Request $request, $slug)
    {
    	// Check for film
    	$film = Film::where('slug', '=', $slug)->first();

		if($film == null) return response()->json(["message" => "Can't find this film"], 400);

		$data = $request->all();

    	$validation = Validator::make($data,[ 
	        'content' => 'required',
			'auth_token' => 'required'
	    ]);

	    if($validation->fails())
	    {
	    	return response()->json($validation->messages(), 400); 
	    }
	    else 
	    {
			// Check if the user is authetnicated 
			$user = null;

			if(User::getByToken($data['auth_token']) != null) $user = User::getByToken($data['auth_token']);
			else return response()->json(["message" => "Auth token not valid"], 401);

	    	$data['films_id'] = $film->id;
			$data['name'] = $user->name;

	    	$comment = Comment::create($data);

	    	return response()->json($comment, 201);
	    }
    }
}
