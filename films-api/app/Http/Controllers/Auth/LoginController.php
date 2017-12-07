<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\User;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('guest')->except('logout');
    }

    public function apiLogin(Request $request)
    {
        // The login data
        $data = $request->all();

        // Validate 
        $validation = Validator::make($data, [
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        if(!$validation->fails())
        { 
            if ($this->attemptLogin($request)) {

                $user = User::where('email', '=', $data['email'])->first();
                $user->refreshToken();

                return response()->json($user, 200);

            } else return response()->json(["message" => "Invalid credentials"], 401);
        }
        else return response()->json(["message" => $validation->messages()], 401);    
    }

    public function apiLogout(Request $request)
    {
        $data = $request->all();

        // Validate 
        $validation = Validator::make($data, [
            'auth_token' => 'required|string'
        ]);

        if(!$validation->fails())
        {
            $user = User::getByToken($data['auth_token']);

            if($user == null)
                return response()->json(["message" => "Invalid authentication token"], 400);
            else 
            {
                $user->removeToken();
                return response()->json(["message" => "User logged out."], 200);
            }
        }
        else return response()->json(["message" => $validation->messages()], 400);  
    }

}
