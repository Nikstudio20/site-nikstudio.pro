<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
    /**
     * Получить все проекты
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        try {
            Log::info('Запрос проектов с параметрами:', $request->all());

            $query = Project::with('categories');
            
            // Фильтрация по категории
            if ($request->has('category_id') && $request->category_id) {
                Log::info('Фильтрация по категории:', ['category_id' => $request->category_id]);
                $query->whereHas('categories', function($q) use ($request) {
                    $q->where('project_categories.id', $request->category_id);
                });
            }
            
            // Фильтрация по году
            if ($request->has('year') && $request->year) {
                $query->where('year', $request->year);
            }
            
            // Поиск по названию
            if ($request->has('search') && $request->search) {
                $query->where(function($q) use ($request) {
                    $q->where('main_title', 'like', '%' . $request->search . '%')
                    ->orWhere('projects_page_title', 'like', '%' . $request->search . '%');
                });
            }
            
            // Сортировка
            $sortField = $request->get('sort', 'year');
            $sortDirection = $request->get('direction', 'desc');
            
            $allowedSortFields = ['year', 'main_title', 'projects_page_title', 'created_at'];
            
            if (in_array($sortField, $allowedSortFields)) {
                $query->orderBy($sortField, $sortDirection);
            }
            
            // Получение всех проектов без пагинации
            $projects = $query->get();
            Log::info('Найдено проектов:', ['count' => $projects->count()]);
            
            return response()->json([
                'success' => true,
                'data' => $projects
            ]);
        } catch (\Exception $e) {
            Log::error('Ошибка при загрузке проектов: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return response()->json(['success' => false, 'message' => 'Ошибка сервера при загрузке проектов'], 500);
        }
    }
    
    /**
     * Получить проект по slug
     * 
     * @param string $slug
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($slug)
    {
        $project = Project::with('category')->where('slug', $slug)->first();
        
        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Проект не найден'
            ], 404);
        }
        
        return response()->json([
            'success' => true,
            'data' => $project
        ]);
    }
    
    /**
     * Логирование настроек PHP для загрузки файлов
     */
    private function logUploadSettings()
    {
        Log::info('PHP Upload Settings', [
            'upload_max_filesize' => ini_get('upload_max_filesize'),
            'post_max_size' => ini_get('post_max_size'),
            'max_file_uploads' => ini_get('max_file_uploads'),
            'memory_limit' => ini_get('memory_limit'),
            'max_execution_time' => ini_get('max_execution_time'),
            'upload_tmp_dir' => ini_get('upload_tmp_dir'),
        ]);
    }
    
    /**
     * Детальное логирование информации о файле
     */
    private function logFileDetails($file, $fieldName)
    {
        if ($file) {
            Log::info($fieldName . ' details', [
                'original_name' => $file->getClientOriginalName(),
                'size' => $file->getSize(),
                'mime_type' => $file->getMimeType(),
                'extension' => $file->getClientOriginalExtension(),
                'is_valid' => $file->isValid(),
                'error' => $file->getError(),
                'error_message' => $file->getErrorMessage(),
                'path' => $file->getPathname(),
                'real_path' => $file->getRealPath(),
            ]);
        }
    }
    
    /**
     * Создать новый проект
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Логирование настроек PHP
        $this->logUploadSettings();
        
        Log::info('Store method called', $request->all());
        
        // Детальное логирование файлов
        if ($request->hasFile('main_image')) {
            $this->logFileDetails($request->file('main_image'), 'Main image');
        }
        
        if ($request->hasFile('projects_page_image')) {
            $this->logFileDetails($request->file('projects_page_image'), 'Projects page image');
        }
        
        if ($request->hasFile('logo')) {
            $this->logFileDetails($request->file('logo'), 'Logo');
        }
        
        // Базовая валидация
        $validator = Validator::make($request->all(), [
            'category_ids' => 'required|array',
            'category_ids.*' => 'exists:project_categories,id',
            'main_title' => 'required|string|max:255',
            'projects_page_title' => 'nullable|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 10),
            'main_image' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'projects_page_image' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'logo' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);
        
        // Кастомная валидация файлов
        $validator->after(function ($validator) use ($request) {
            $this->validateFileUpload($validator, $request, 'main_image');
            $this->validateFileUpload($validator, $request, 'projects_page_image');
            $this->validateFileUpload($validator, $request, 'logo');
        });
        
        if ($validator->fails()) {
            $errors = $validator->errors()->toArray();
            Log::error('Validation failed', [
                'errors' => $errors,
                'request_data' => $request->except(['main_image', 'projects_page_image', 'logo']),
                'files_info' => [
                    'main_image_present' => $request->hasFile('main_image'),
                    'projects_page_image_present' => $request->hasFile('projects_page_image'),
                    'logo_present' => $request->hasFile('logo'),
                ],
                'content_length' => $request->header('Content-Length'),
                'content_type' => $request->header('Content-Type'),
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Ошибка валидации',
                'errors' => $errors
            ], 422);
        }
        
        $data = $request->except(['main_image', 'projects_page_image', 'logo']);
        
        // Загрузка изображений с добавлением префикса /storage/
        try {
            if ($request->hasFile('main_image')) {
                Log::info('Processing main_image');
                $path = $request->file('main_image')->store('projects/main', 'public');
                $data['main_image'] = '/storage/' . $path;
                Log::info('Main image uploaded: ' . $path);
            }
            
            if ($request->hasFile('projects_page_image')) {
                Log::info('Processing projects_page_image');
                $path = $request->file('projects_page_image')->store('projects/page', 'public');
                $data['projects_page_image'] = '/storage/' . $path;
                Log::info('Projects page image uploaded: ' . $path);
            }
            
            if ($request->hasFile('logo')) {
                Log::info('Processing logo');
                $path = $request->file('logo')->store('projects/logos', 'public');
                $data['logo'] = '/storage/' . $path;
                Log::info('Logo uploaded: ' . $path);
            }
        } catch (\Exception $e) {
            Log::error('File upload error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Ошибка загрузки файла: ' . $e->getMessage(),
            ], 500);
        }
        
        try {
            $project = Project::create($data);
            $project->categories()->sync($request->input('category_ids'));
            
            Log::info('Project created successfully', $project->toArray());
            
            return response()->json([
                'success' => true,
                'message' => 'Проект успешно создан',
                'data' => $project
            ], 201);
        } catch (\Exception $e) {
            Log::error('Project creation error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Ошибка создания проекта: ' . $e->getMessage(),
            ], 500);
        }
    }
    
    /**
     * Валидация загрузки файла
     */
    private function validateFileUpload($validator, $request, $fieldName)
    {
        if ($request->hasFile($fieldName)) {
            $file = $request->file($fieldName);
            
            if (!$file->isValid()) {
                $error = $file->getError();
                $errorMessages = [
                    UPLOAD_ERR_INI_SIZE => 'Файл превышает размер, указанный в php.ini (upload_max_filesize)',
                    UPLOAD_ERR_FORM_SIZE => 'Файл превышает размер, указанный в HTML форме (MAX_FILE_SIZE)',
                    UPLOAD_ERR_PARTIAL => 'Файл был загружен частично',
                    UPLOAD_ERR_NO_FILE => 'Файл не был загружен',
                    UPLOAD_ERR_NO_TMP_DIR => 'Отсутствует временная папка',
                    UPLOAD_ERR_CANT_WRITE => 'Не удалось записать файл на диск',
                    UPLOAD_ERR_EXTENSION => 'PHP расширение остановило загрузку файла',
                ];
                
                $message = $errorMessages[$error] ?? 'Неизвестная ошибка загрузки файла (код: ' . $error . ')';
                
                Log::error($fieldName . ' upload error', [
                    'error_code' => $error,
                    'error_message' => $message,
                    'file_size' => $file->getSize(),
                    'file_name' => $file->getClientOriginalName(),
                    'temp_name' => $file->getPathname(),
                    'mime_type' => $file->getMimeType(),
                ]);
                
                $validator->errors()->add($fieldName, $message);
            }
            
            // Дополнительная проверка размера файла
            if ($file->getSize() > 4194304) { // 4MB в байтах
                $validator->errors()->add($fieldName, 'Размер файла не должен превышать 4MB');
            }
            
            // Проверка расширения файла
            $allowedExtensions = ['jpeg', 'jpg', 'png', 'gif', 'webp'];
            $extension = strtolower($file->getClientOriginalExtension());
            if (!in_array($extension, $allowedExtensions)) {
                $validator->errors()->add($fieldName, 'Недопустимое расширение файла. Разрешены: ' . implode(', ', $allowedExtensions));
            }
        }
    }

    /**
     * Обновить проект
     * 
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $project = Project::find($id);
        
        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Проект не найден'
            ], 404);
        }
        
        Log::info('Update method called for project ID: ' . $id, $request->all());
        
        // Детальное логирование файлов при обновлении
        if ($request->hasFile('main_image')) {
            $this->logFileDetails($request->file('main_image'), 'Main image (update)');
        }
        
        if ($request->hasFile('projects_page_image')) {
            $this->logFileDetails($request->file('projects_page_image'), 'Projects page image (update)');
        }
        
        if ($request->hasFile('logo')) {
            $this->logFileDetails($request->file('logo'), 'Logo (update)');
        }
        
        $validator = Validator::make($request->all(), [
            'category_ids' => 'sometimes|required|array',
            'category_ids.*' => 'exists:project_categories,id',
            'main_title' => 'sometimes|required|string|max:255',
            'projects_page_title' => 'nullable|string|max:255',
            'year' => 'sometimes|required|integer|min:1900|max:' . (date('Y') + 10),
            'main_image' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'projects_page_image' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'logo' => 'nullable|file|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);
        
        // Кастомная валидация файлов
        $validator->after(function ($validator) use ($request) {
            $this->validateFileUpload($validator, $request, 'main_image');
            $this->validateFileUpload($validator, $request, 'projects_page_image');
            $this->validateFileUpload($validator, $request, 'logo');
        });
        
        if ($validator->fails()) {
            $errors = $validator->errors()->toArray();
            Log::error('Update validation failed', [
                'errors' => $errors,
                'project_id' => $id,
                'request_data' => $request->except(['main_image', 'projects_page_image', 'logo']),
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Ошибка валидации',
                'errors' => $errors
            ], 422);
        }
        
        $data = $request->except(['main_image', 'projects_page_image', 'logo']);
        
        // Обновление изображений с добавлением префикса /storage/
        try {
            if ($request->hasFile('main_image')) {
                // Удаляем старое изображение
                if ($project->main_image && Storage::disk('public')->exists(str_replace('/storage/', '', $project->main_image))) {
                    Storage::disk('public')->delete(str_replace('/storage/', '', $project->main_image));
                    Log::info('Old main image deleted: ' . $project->main_image);
                }
                $path = $request->file('main_image')->store('projects/main', 'public');
                $data['main_image'] = '/storage/' . $path;
                Log::info('New main image uploaded: ' . $path);
            }
            
            if ($request->hasFile('projects_page_image')) {
                // Удаляем старое изображение
                if ($project->projects_page_image && Storage::disk('public')->exists(str_replace('/storage/', '', $project->projects_page_image))) {
                    Storage::disk('public')->delete(str_replace('/storage/', '', $project->projects_page_image));
                    Log::info('Old projects page image deleted: ' . $project->projects_page_image);
                }
                $path = $request->file('projects_page_image')->store('projects/page', 'public');
                $data['projects_page_image'] = '/storage/' . $path;
                Log::info('New projects page image uploaded: ' . $path);
            }
            
            if ($request->hasFile('logo')) {
                // Удаляем старое изображение
                if ($project->logo && Storage::disk('public')->exists(str_replace('/storage/', '', $project->logo))) {
                    Storage::disk('public')->delete(str_replace('/storage/', '', $project->logo));
                    Log::info('Old logo deleted: ' . $project->logo);
                }
                $path = $request->file('logo')->store('projects/logos', 'public');
                $data['logo'] = '/storage/' . $path;
                Log::info('New logo uploaded: ' . $path);
            }
        } catch (\Exception $e) {
            Log::error('File upload error during update: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'project_id' => $id
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Ошибка загрузки файла: ' . $e->getMessage(),
            ], 500);
        }
        
        try {
            $project->update($data);
            if ($request->has('category_ids')) {
                $project->categories()->sync($request->input('category_ids'));
            }
            
            Log::info('Project updated successfully', [
                'project_id' => $id,
                'updated_data' => $data
            ]);
            
            return response()->json([
                'success' => true,
                'message' => 'Проект успешно обновлен',
                'data' => $project
            ]);
        } catch (\Exception $e) {
            Log::error('Project update error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'project_id' => $id
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Ошибка обновления проекта: ' . $e->getMessage(),
            ], 500);
        }
    }
    
    /**
     * Удалить проект
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $project = Project::find($id);
        
        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Проект не найден'
            ], 404);
        }
        
        Log::info('Deleting project', ['project_id' => $id, 'project_data' => $project->toArray()]);
        
        try {
            // Удаление изображений (убираем префикс /storage/ для правильного удаления)
            if ($project->main_image && Storage::disk('public')->exists(str_replace('/storage/', '', $project->main_image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $project->main_image));
                Log::info('Main image deleted: ' . $project->main_image);
            }
            
            if ($project->projects_page_image && Storage::disk('public')->exists(str_replace('/storage/', '', $project->projects_page_image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $project->projects_page_image));
                Log::info('Projects page image deleted: ' . $project->projects_page_image);
            }
            
            if ($project->logo && Storage::disk('public')->exists(str_replace('/storage/', '', $project->logo))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $project->logo));
                Log::info('Logo deleted: ' . $project->logo);
            }
            
            $project->delete();
            
            Log::info('Project deleted successfully', ['project_id' => $id]);
            
            return response()->json([
                'success' => true,
                'message' => 'Проект успешно удален'
            ]);
        } catch (\Exception $e) {
            Log::error('Project deletion error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'project_id' => $id
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Ошибка удаления проекта: ' . $e->getMessage(),
            ], 500);
        }
    }
}