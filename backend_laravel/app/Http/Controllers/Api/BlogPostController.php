<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class BlogPostController extends Controller
{
    /**
     * Get a list of all blog posts
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $posts = BlogPost::with('blocks')
            ->latest()
            ->get()
            ->map(function($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'description' => $post->description,
                    'image' => $post->image,
                    'position' => $post->position,
                    'created_at' => $post->created_at ? $post->created_at->format('Y-m-d H:i:s') : null,
                    'updated_at' => $post->updated_at ? $post->updated_at->format('Y-m-d H:i:s') : null,
                    'slug' => $post->slug,
                    'status' => $post->status,
                ];
            });

        return response()->json([
            'status' => 'success',
            'data' => $posts,
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $post = BlogPost::with('blocks')->where('slug', $slug)->first();

        if (!$post) {
            return response()->json([
                'status' => 'error',
                'message' => 'Пост не найден',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'id' => $post->id,
                'title' => $post->title,
                'description' => $post->description,
                'image' => $post->image,
                'position' => $post->position,
                'created_at' => $post->created_at?->format('Y-m-d H:i:s'),
                'updated_at' => $post->updated_at?->format('Y-m-d H:i:s'),
                'slug' => $post->slug,
                'status' => $post->status,
                'blocks' => $post->blocks,
            ],
        ]);
    }

    /**
     * Store a new blog post
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        // Детальное логирование всего запроса
        Log::info('Получен запрос на создание поста блога', [
            'headers' => $request->header(),
            'has_files' => $request->hasFile('image'),
            'content_type' => $request->header('Content-Type'),
            'post_data' => $request->post(),
            'all_data' => $request->all(),
            'files' => $request->allFiles() ? array_keys($request->allFiles()) : [],
        ]);

        try {
            // Проверяем, что данные пришли
            if (!$request->has('title') || !$request->has('description') || !$request->has('position')) {
                Log::warning('Отсутствуют требуемые поля в запросе', [
                    'received_fields' => array_keys($request->all())
                ]);
                
                return response()->json([
                    'status' => 'error',
                    'message' => 'Отсутствуют обязательные поля (title, description, position)',
                    'received_fields' => array_keys($request->all()),
                ], 400);
            }

            // Валидация данных
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'position' => 'required|string|max:255',
                'image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            if ($validator->fails()) {
                Log::warning('Ошибка валидации при создании поста блога', [
                    'errors' => $validator->errors()->toArray()
                ]);

                return response()->json([
                    'status' => 'error',
                    'message' => 'Ошибка валидации',
                    'errors' => $validator->errors()->toArray()
                ], 422);
            }

            // Обработка загрузки изображения
            $imagePath = null;
            if ($request->hasFile('image')) {
                try {
                    $image = $request->file('image');
                    
                    Log::info('Обработка файла изображения', [
                        'original_name' => $image->getClientOriginalName(),
                        'mime_type' => $image->getMimeType(),
                        'size' => $image->getSize(),
                        'is_valid' => $image->isValid(),
                    ]);
                    
                    // Убедимся, что директория существует
                    Storage::disk('public')->makeDirectory('blog');
                    
                    // Генерация уникального имени файла и сохранение
                    $fileName = time() . '_' . $image->getClientOriginalName();
                    $path = $image->storeAs('blog', $fileName, 'public');
                    
                    if (!$path) {
                        throw new \Exception("Не удалось сохранить файл");
                    }
                    
                    $imagePath = '/storage/blog/' . $fileName;
                    
                    Log::info('Изображение сохранено', [
                        'path' => $imagePath
                    ]);
                } catch (\Exception $e) {
                    Log::error('Ошибка при обработке загрузки изображения', [
                        'error' => $e->getMessage(),
                        'trace' => $e->getTraceAsString()
                    ]);
                    
                    // Продолжаем без изображения, не прерывая создание поста
                    $imagePath = null;
                }
            }

            // Создание записи блога
            $post = BlogPost::create([
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'position' => $request->input('position'),
                'image' => $imagePath,
            ]);

            Log::info('Пост блога успешно создан', [
                'post_id' => $post->id,
                'post_data' => $post->toArray(),
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Пост блога успешно создан',
                'data' => [
                    'id' => $post->id,
                    'title' => $post->title,
                    'description' => $post->description,
                    'image' => $post->image,
                    'position' => $post->position,
                    'created_at' => $post->created_at?->format('Y-m-d H:i:s'),
                    'updated_at' => $post->updated_at?->format('Y-m-d H:i:s'),
                    'slug' => $post->slug,
                ],
            ], 201);
        } catch (\Exception $e) {
            Log::error('Ошибка при создании поста блога', [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            
            // Возвращаем ошибку в едином формате для всех исключений
            return response()->json([
                'status' => 'error',
                'message' => 'Не удалось создать пост блога: ' . $e->getMessage(),
                'error_details' => config('app.debug') ? [
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'class' => get_class($e),
                ] : null,
            ], 500);
        }
    }

    /**
     * Update an existing blog post
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request): JsonResponse
    {
        // Детальное логирование всего запроса
        Log::info('Получен запрос на редактирование поста блога', [
            'headers' => $request->header(),
            'has_files' => $request->hasFile('image'),
            'content_type' => $request->header('Content-Type'),
            'post_data' => $request->post(),
            'all_data' => $request->all(),
            'files' => $request->allFiles() ? array_keys($request->allFiles()) : [],
        ]);

        try {
            // Проверяем наличие ID поста
            $id = $request->input('id'); // Пытаемся получить ID из данных формы
            if (empty($id)) {
                Log::warning('Отсутствует ID поста для редактирования');
                return response()->json([
                    'status' => 'error',
                    'message' => 'Отсутствует ID поста для редактирования',
                ], 400);
            }

            // Находим пост по ID
            $post = BlogPost::find($id);
            
            if (!$post) {
                Log::warning('Пост для редактирования не найден', [
                    'id' => $id
                ]);
                return response()->json([
                    'status' => 'error',
                    'message' => 'Пост не найден',
                ], 404);
            }

            // Валидация данных
            $validator = Validator::make($request->all(), [
                'title' => 'sometimes|required|string|max:255',
                'description' => 'sometimes|required|string',
                'position' => 'sometimes|required|string|max:255',
                'image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            if ($validator->fails()) {
                Log::warning('Ошибка валидации при редактировании поста блога', [
                    'errors' => $validator->errors()->toArray()
                ]);

                return response()->json([
                    'status' => 'error',
                    'message' => 'Ошибка валидации',
                    'errors' => $validator->errors()->toArray()
                ], 422);
            }

            // Обновляем данные поста
            if ($request->has('title')) {
                $post->title = $request->input('title');
            }
            
            if ($request->has('description')) {
                $post->description = $request->input('description');
            }
            
            if ($request->has('position')) {
                $post->position = $request->input('position');
            }

            // Обработка загрузки нового изображения
            if ($request->hasFile('image')) {
                try {
                    $image = $request->file('image');
                    
                    Log::info('Обработка файла изображения', [
                        'original_name' => $image->getClientOriginalName(),
                        'mime_type' => $image->getMimeType(),
                        'size' => $image->getSize(),
                        'is_valid' => $image->isValid(),
                    ]);
                    
                    // Удаляем старое изображение, если оно существует
                    if ($post->image) {
                        $oldImagePath = str_replace('/storage/', '', $post->image);
                        if (Storage::disk('public')->exists($oldImagePath)) {
                            Storage::disk('public')->delete($oldImagePath);
                            Log::info('Старое изображение удалено', [
                                'path' => $oldImagePath
                            ]);
                        }
                    }
                    
                    // Убедимся, что директория существует
                    Storage::disk('public')->makeDirectory('blog');
                    
                    // Генерация уникального имени файла и сохранение
                    $fileName = time() . '_' . $image->getClientOriginalName();
                    $path = $image->storeAs('blog', $fileName, 'public');
                    
                    if (!$path) {
                        throw new \Exception("Не удалось сохранить файл");
                    }
                    
                    $post->image = '/storage/blog/' . $fileName;
                    
                    Log::info('Новое изображение сохранено', [
                        'path' => $post->image
                    ]);
                } catch (\Exception $e) {
                    Log::error('Ошибка при обработке загрузки изображения', [
                        'error' => $e->getMessage(),
                        'trace' => $e->getTraceAsString()
                    ]);
                    
                    // Продолжаем без изменения изображения
                }
            }

            // Сохраняем обновленный пост
            $post->save();

            Log::info('Пост блога успешно обновлен', [
                'post_id' => $post->id,
                'post_data' => $post->toArray(),
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Пост блога успешно обновлен',
                'data' => [
                    'id' => $post->id,
                    'title' => $post->title,
                    'description' => $post->description,
                    'image' => $post->image,
                    'position' => $post->position,
                    'created_at' => $post->created_at?->format('Y-m-d H:i:s'),
                    'updated_at' => $post->updated_at?->format('Y-m-d H:i:s'),
                    'slug' => $post->slug,
                ],
            ]);
        } catch (\Exception $e) {
            Log::error('Ошибка при редактировании поста блога', [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            
            // Возвращаем ошибку в едином формате для всех исключений
            return response()->json([
                'status' => 'error',
                'message' => 'Не удалось обновить пост блога: ' . $e->getMessage(),
                'error_details' => config('app.debug') ? [
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'class' => get_class($e),
                ] : null,
            ], 500);
        }
    }

    public function updateStatus(Request $request, $id)
    {
        try {
            // Валидация входящих данных
            $request->validate([
                'status' => 'required|boolean'
            ]);

            // Найти пост по ID
            $post = BlogPost::findOrFail($id);
            
            // Обновить статус
            $post->status = $request->status;
            $post->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Статус поста успешно обновлен',
                'data' => $post
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Пост не найден'
            ], 404);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Ошибка валидации',
                'errors' => $e->errors()
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Произошла ошибка при обновлении статуса'
            ], 500);
        }
    }

    /**
     * Delete a blog post
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        // Детальное логирование запроса
        Log::info('Получен запрос на удаление поста блога', [
            'post_id' => $id
        ]);

        try {
            // Находим пост по ID
            $post = BlogPost::find($id);
            
            if (!$post) {
                Log::warning('Пост для удаления не найден', [
                    'id' => $id
                ]);
                return response()->json([
                    'status' => 'error',
                    'message' => 'Пост не найден',
                ], 404);
            }

            // Если у поста есть изображение, удаляем его
            if ($post->image) {
                $imagePath = str_replace('/storage/', '', $post->image);
                if (Storage::disk('public')->exists($imagePath)) {
                    Storage::disk('public')->delete($imagePath);
                    Log::info('Изображение удалено', [
                        'path' => $imagePath
                    ]);
                }
            }

            // Удаляем связанные блоки (если есть)
            if ($post->blocks()->count() > 0) {
                $post->blocks()->delete();
                Log::info('Удалены связанные блоки поста', [
                    'post_id' => $id
                ]);
            }

            // Удаляем сам пост
            $post->delete();

            Log::info('Пост блога успешно удален', [
                'post_id' => $id
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Пост блога успешно удален',
            ]);
        } catch (\Exception $e) {
            Log::error('Ошибка при удалении поста блога', [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            
            // Возвращаем ошибку в едином формате для всех исключений
            return response()->json([
                'status' => 'error',
                'message' => 'Не удалось удалить пост блога: ' . $e->getMessage(),
                'error_details' => config('app.debug') ? [
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'class' => get_class($e),
                ] : null,
            ], 500);
        }
    }
} 