<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\SongsController;

Route::post('/login', [LoginController::class, 'login']);
Route::get('/songs', [SongsController::class, 'index']);
Route::post('/songs', [SongsController::class, 'store']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/test', function (Request $request) {
    return response()->json(['ok' => true]);
});

// Aquí puedes añadir tus rutas protegidas, como canciones, perfiles, etc.
?>