<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Country;

class CountriesController extends Controller
{
    //
    public function index() 
    {
    	return Country::all();
    }

    public function show(Country $country)
    {
    	return $country;
    }
}
