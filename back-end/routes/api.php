<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\SongsController;

// Ruta pública para login
Route::post('/login', [LoginController::class, 'login']);

// Rutas protegidas con Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/songs', [SongsController::class, 'index']);
    Route::post('/songs', [SongsController::class, 'store']);
    Route::get('/songs/{id}', [SongsController::class, 'show']);
    Route::post('/songs/{id}', [SongsController::class, 'update']);
    Route::delete('/songs/{id}', [SongsController::class, 'destroy']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
// Aquí puedes añadir tus rutas protegidas, como canciones, perfiles, etc.
?>