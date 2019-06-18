<?php

namespace Barbacoa\Http\Controllers;

use JWTAuth;
use App\Barbacoa;
use Illuminate\Http\Request;

class BarbacoaController extends Controller
{
    protected $user;
 
    public function __construct(){
        $this->user = JWTAuth::parseToken()->authenticate();
    }

    public function store(Request $request){
    
        if($request->hasFile('file')){
            $barbacoa = new Barbacoa();
            $barbacoa->name = $request->name;
            $barbacoa->description = $request->description;
            $barbacoa->imagen_barbacoa = $request->file;
            $this->user->barbacoas()->save($barbacoa);
        
            if ($this->user->barbacoas()->save($barbacoa))
                return response()->json([
                    'success' => true,
                    'barbacoa' => $barbacoa
                ]);
            else
                return response()->json([
                    'success' => false,
                    'message' => 'Sorry, barbacoa could not be added'
                ], 500);
        }
    }
}
