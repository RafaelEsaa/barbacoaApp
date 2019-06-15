<?php

namespace Barbacoa;

use Illuminate\Database\Eloquent\Model;

class Barbacoa extends Model
{
    protected $fillable = ['name', 'description', 'imagen_barbacoa', 'user_id'];
    
    public function user(){
        return $this->belongsTo('App\User');
    }
}
