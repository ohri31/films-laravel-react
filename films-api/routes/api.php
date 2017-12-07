<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

// user register
Route::post('register', 'Auth\RegisterController@apiRegister');
Route::post('login', 'Auth\LoginController@apiLogin');
Route::post('logout', 'Auth\LoginController@apiLogout');

// FIlms API endpoints
Route::get('films', 'FilmsController@index');
Route::get('films/{slug}', 'FilmsController@show');
Route::post('films', 'FilmsController@store');
Route::put('films/{slug}', 'FilmsController@update');
Route::delete('films/{slug}', 'FilmsController@delete');

// Genre API endpoints
Route::get('genres', 'GenresController@index');
Route::get('genres/{genre}', 'GenresController@show');

// Country API endpoints
Route::get('countries', 'CountriesController@index');
Route::get('countries/{country}', 'CountriesController@show');

// Comments API endpoints 
Route::get('films/{slug}/comments', 'CommentsController@list');
Route::post('films/{slug}/comments', 'CommentsController@store');