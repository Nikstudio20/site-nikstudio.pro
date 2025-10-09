<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VideoStreamController;

// Video streaming with Range support - ДОЛЖЕН БЫТЬ ПЕРВЫМ
Route::get('/storage/{path}', [VideoStreamController::class, 'stream'])
    ->where('path', '.*')
    ->name('video.stream');

Route::get('/', function () {
    return view('welcome');
});
