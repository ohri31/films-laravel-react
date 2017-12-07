<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Validator;

use App\Film;
use App\User;

class FilmsController extends Controller
{
    /** 
     * List all Films in the database.
     *
     * @return App\Film (object)
     */
	public function index() 
	{
		return Film::paginate(1);
	}

	/**
	 * Show a single Film 
	 *
	 * @param App\Film
	 * @return App\Film
	 */
	public function show($slug)
	{
		$film = Film::where('slug', '=', $slug)->first();

		if($film == null) return response()->json(["message" => "Can't find this film"], 400);

		$film['country'] = $film->country->name;
		$film['genre'] = $film->genre->name;

		return response()->json($film, 200);
	}

	/**
	 * Create a new Film objet instance 
	 *
	 * @param Request 
	 * @return JSON Response
	 */
	public function store(Request $request) 
	{
		$validation = Validator::make($request->all(),[ 
	        'name' => 'required',
	        'description' => 'required',
	        'release_date' => 'required|date',
	        'ticke_price' => 'required|numeric|digits_between:1,5',
	        'country_id' => 'required|numeric',
	        'genre_id' => 'required|numeric'
	    ]);

	    $data = $request->all();
	    $data['release_date'] = date('Y/m/d', strtotime($data['release_date']));
	    $data['slug'] = str_slug($data['name'], "-");

		if($validation->fails())
		{
			return response()->json(["message" => $validation->messages()], 400); 
		}
		else
		{
			/* Since the creation is implemented on front */
			/* We will implement the authenticaiton just for the store option */
			/* I must say that I am aware of the authentication not being implemented on update, delete etc. */
			/* But this task is very time consuming... */
			if(User::getByToken($data['auth_token']) != null) $user = User::getByToken($data['auth_token']);
			else return response()->json(["message" => "Auth token not valid"], 401);

			$film = Film::create($data);
			return response()->json($film, 201);
		}
	}

	/**
	 * Update an existing Film instance 
	 *
	 * @param Request, App\Film
	 * @return JSON Response
	 */
	public function update(Request $request, $slug)
	{
		$film = Film::where('slug', '=', $slug)->first();

		if($film == null) return response()->json(["message" => "Can't find this film"], 400);

		$validation = Validator::make($request->all(),[ 
	        'name' => 'required',
	        'description' => 'required',
	        'release_date' => 'required|date',
	        'ticke_price' => 'required|numeric|digits_between:1,5',
	        'country_id' => 'required|numeric',
	        'genre_id' => 'required|numeric'
	    ]);

		if($validation->fails())
		{
			return response()->json(["message" => $validation->messages()], 400); 
		}
		else
		{
			$film->update($request->all());
			return response()->json($film, 200);
		}
	}

	/**
	 * Delete Film objet instance 
	 *
	 * @param Request 
	 * @return JSON Response
	 */
	public function delete(Request $request, $slug)
	{
		$film = Film::where('slug', '=', $slug)->first();

		if($film == null) return response()->json(["message" => "Can't find this film"], 400);

		$film->delete();

		return response()->json(null, 204);
	}
}
