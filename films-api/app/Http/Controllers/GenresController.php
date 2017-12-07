<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Genre;

class GenresController extends Controller
{
    //
    public function index()
    {
    	return Genre::all();
    }

    public function show(Genre $genre)
    {
    	return $genre;
    }
}
