<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BlogPostController;
use App\Http\Controllers\Api\BlogBlockController;
use App\Http\Controllers\Api\ProjectCategoryController;
use App\Http\Controllers\Api\ProjectController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Маршруты для блога
Route::get('/blog-posts', [BlogPostController::class, 'index']); 
Route::get('/blog-posts/{slug}', [BlogPostController::class, 'show']);
Route::post('/blog-posts', [BlogPostController::class, 'store']);
Route::post('/blog-posts/update', [BlogPostController::class, 'update']);
Route::delete('/blog-posts/{id}', [BlogPostController::class, 'destroy']);
Route::patch('/blog-posts/{id}/status', [BlogPostController::class, 'updateStatus']);
Route::post('/blog-posts/{slug}/blocks', [BlogBlockController::class, 'store']);
Route::put('/blog-posts/blocks/{id}', [BlogBlockController::class, 'update']);
Route::delete('/blog-posts/blocks/{id}', [BlogBlockController::class, 'destroy']);

// Маршруты для категорий проектов
Route::prefix('project-categories')->group(function () {
    Route::get('/', [ProjectCategoryController::class, 'index']);
    Route::post('/', [ProjectCategoryController::class, 'store']);
    Route::put('/{id}', [ProjectCategoryController::class, 'update']);
    Route::delete('/{id}', [ProjectCategoryController::class, 'destroy']);
    Route::put('/{id}/sort-order', [ProjectCategoryController::class, 'updateSortOrder']);
    Route::put('/{id}/move-up', [ProjectCategoryController::class, 'moveUp']);
    Route::put('/{id}/move-down', [ProjectCategoryController::class, 'moveDown']);
    Route::put('/bulk-sort-order', [ProjectCategoryController::class, 'updateBulkSortOrder']);
});

// Маршруты для проектов
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{slug}', [ProjectController::class, 'show']);
Route::post('/projects', [ProjectController::class, 'store']);
Route::put('/projects/{id}', [ProjectController::class, 'update']);
Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);

// Маршруты для деталей проекта (основная информация и Hero медиа)
Route::post('/projects/{slug}/detail', [ProjectController::class, 'createDetail']);
Route::put('/projects/{slug}/detail', [ProjectController::class, 'updateDetail']); // Для обновления текстовых полей
Route::post('/projects/{slug}/detail/update-media', [ProjectController::class, 'updateDetail']); // Для обновления медиа (используем POST для FormData)
Route::delete('/projects/{slug}/detail/hero-media/{groupId}', [ProjectController::class, 'destroyHeroGroup']);

// --- НОВЫЕ И ИЗМЕНЕННЫЕ МАРШРУТЫ ДЛЯ БЛОКОВ И ИХ МЕДИА ---

// Маршрут для создания нового блока (только текст)
Route::post('projects/{slug}/blocks', [ProjectController::class, 'storeBlock']);
// Маршрут для обновления текстового содержимого блока
Route::put('projects/{slug}/blocks/{blockId}', [ProjectController::class, 'updateBlockText']);
// Маршрут для удаления всего блока
Route::delete('projects/{slug}/blocks/{blockId}', [ProjectController::class, 'destroyBlock']);

// Вложенные маршруты для управления медиа ВНУТРИ конкретного блока
Route::prefix('projects/{slug}/blocks/{blockId}/media')->group(function () {
    // Создание новой медиа-группы
    Route::post('/', [ProjectController::class, 'storeBlockMediaGroup']);
    // Обновление существующей медиа-группы (POST для FormData с _method=PUT)
    Route::post('/{groupId}', [ProjectController::class, 'updateBlockMediaGroup']);
    // Также добавляем PUT маршрут для обновления
    Route::put('/{groupId}', [ProjectController::class, 'updateBlockMediaGroup']); 
    // Удаление медиа-группы
    Route::delete('/{groupId}', [ProjectController::class, 'destroyBlockMediaGroup']);
});
