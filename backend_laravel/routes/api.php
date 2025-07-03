<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BlogPostController;
use App\Http\Controllers\Api\BlogBlockController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Blog Posts API
Route::get('/blog-posts', [BlogPostController::class, 'index']); 

Route::get('/blog-posts/{slug}', [BlogPostController::class, 'show']);

// Маршрут для создания поста блога 
Route::post('/blog-posts', [BlogPostController::class, 'store']);

// Маршрут для редактирования поста блога (изменен для поддержки FormData)
Route::post('/blog-posts/update', [BlogPostController::class, 'update']);

// Маршрут для удаления поста блога
Route::delete('/blog-posts/{id}', [BlogPostController::class, 'destroy']);

// Маршрут для изменения статуса поста блога
Route::patch('/blog-posts/{id}/status', [BlogPostController::class, 'updateStatus']);

// Добавить блок к статье блога
Route::post('/blog-posts/{slug}/blocks', [BlogBlockController::class, 'store']);

// Маршрут для поддержки PUT-запросов также существует, но используется POST для FormData
Route::put('/blog-posts/blocks/{id}', [BlogBlockController::class, 'update']);
Route::delete('/blog-posts/blocks/{id}', [BlogBlockController::class, 'destroy']);