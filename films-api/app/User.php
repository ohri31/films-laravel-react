<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * This method creates a new token associated with the user
     *
     * @return string
     */
    public function refreshToken()
    {
        $token = md5(time().$this->name."token".$this->email);
        $token = bcrypt($token);

        $this->auth_token = $token;
        $this->save();

        return $this->auth_token;
    }

    /**
     * This method removes the token from the database
     *
     * @return void
     */
    public function removeToken()
    {
        $this->auth_token = null;
        $this->save();
    }

    /**
     * Get user by token 
     *
     * @return string
     */
    public static function getByToken($token)
    {
        $user = User::where('auth_token', '=', $token);

        if($user->exists()) return $user->first();
        else return null;
    }
}
