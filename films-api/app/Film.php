<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    //
    protected $table = "films";

    protected $fillable = ["name", "description", "release_date", "rating", "ticke_price", "country_id", "genre_id", "slug"];
    
    public function genre() 
    {
    	return $this->hasOne('App\Genre', 'id', 'genre_id');
    }

    public function country()
    {
    	return $this->hasOne('App\Country', 'id', 'country_id');
    }

    public function comments()
    {
    	return $this->hasMany('App\Comment', 'films_id')->latest();
    }
}
