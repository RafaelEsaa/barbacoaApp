<?php

namespace Barbacoa;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'start_time', 'end_time'
    ];

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function barbacoa(){
        return $this->hasOne('App\Barbacoa');
    }
}
