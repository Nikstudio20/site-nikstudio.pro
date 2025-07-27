"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Video, Upload, Trash2, Loader2 } from "lucide-react";
import { VideoUploadForm } from "./VideoUploadForm";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { getVideoUrl, formatFileSize, getVideoFormat } from "@/lib/media-utils";
import { fileUploadUtils } from "@/lib/file-upload-compatibility";

interface HomeContent {
  id: number;
  hero_video_url?: string;
  hero_video_original_name?: string;
  hero_video_size?: number;
  formatted_video_size?: string;
  hero_fallback_image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  success: boolean;
  data?: HomeContent;
  message?: string;
  errors?: Record<string, string[]>;
}

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

// Network error retry configuration
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 2000; // 2 seconds

export const AdminHeroVideoManager: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState<HomeContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [retryAttempt, setRetryAttempt] = useState(0);

  // Fetch current hero video data with retry logic
  const fetchCurrentVideo = useCallback(async (attempt = 1) => {
    try {
      setLoading(true);
      console.log(`Fetching current video data (attempt ${attempt})`);

      const response = await fetch(`${API_BASE_URL}/home`, {
        headers: { 'Accept': 'application/json' },
        cache: 'no-store'
      });

      if (response.ok) {
        const data: ApiResponse = await response.json();
        setCurrentVideo(data.data || null);
        console.log('Successfully fetched current video data');
      } else if (response.status === 404) {
        console.log('No current video data found (404)');
        setCurrentVideo(null);
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      console.error(`Error fetching current video (attempt ${attempt}):`, err);

      // Retry logic for network errors
      if (attempt < MAX_RETRY_ATTEMPTS && err instanceof Error &&
        (err.message.includes('fetch') || err.message.includes('network') || err.message.includes('NetworkError'))) {
        console.log(`Retrying in ${RETRY_DELAY}ms...`);
        setTimeout(() => {
          fetchCurrentVideo(attempt + 1);
        }, RETRY_DELAY);
        return;
      }

      // Set error message based on error type
      let errorMessage = 'Ошибка при загрузке данных о текущем видео';
      if (err instanceof Error) {
        if (err.message.includes('fetch') || err.message.includes('network')) {
          errorMessage = 'Ошибка сети. Проверьте подключение к интернету';
        } else if (err.message.includes('timeout')) {
          errorMessage = 'Превышено время ожидания. Попробуйте позже';
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Upload new hero video with progress tracking and retry logic
  const handleVideoUpload = async (file: File, onProgress?: (progress: number) => void) => {
    return new Promise<void>((resolve, reject) => {
      setUploading(true);
      setError(null);
      setSuccess(null);
      setUploadProgress(0);

      // Log upload attempt
      console.log('Starting video upload:', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        timestamp: new Date().toISOString()
      });

      // Use compatibility service to create FormData
      const formData = fileUploadUtils.createFormData();
      formData.append('hero_video', file);

      const xhr = new XMLHttpRequest();

      // Check if we're using the polyfill and need special handling
      const isPolyfill = !(formData instanceof FormData);

      // Track upload progress
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
          if (onProgress) {
            onProgress(progress);
          }
        }
      });

      // Handle successful upload
      xhr.addEventListener('load', async () => {
        try {
          if (xhr.status >= 200 && xhr.status < 300) {
            const data: ApiResponse = JSON.parse(xhr.responseText);

            if (data.success) {
              setSuccess('Видео успешно загружено!');
              await fetchCurrentVideo();

              // Clear success message after 3 seconds
              setTimeout(() => setSuccess(null), 3000);
              resolve();
            } else {
              const errorMessage = data.message || 'Ошибка при загрузке видео';
              if (data.errors) {
                const validationErrors = Object.entries(data.errors)
                  .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
                  .join('; ');
                setError(`${errorMessage}. ${validationErrors}`);
              } else {
                setError(errorMessage);
              }
              reject(new Error(errorMessage));
            }
          } else {
            // Handle HTTP error status codes
            let errorMessage = 'Ошибка при загрузке видео';

            if (xhr.status === 413) {
              errorMessage = 'Файл слишком большой. Максимальный размер: 50 MB';
            } else if (xhr.status === 422) {
              try {
                const data: ApiResponse = JSON.parse(xhr.responseText);
                errorMessage = data.message || 'Неверный формат файла';
                if (data.errors) {
                  const validationErrors = Object.entries(data.errors)
                    .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
                    .join('; ');
                  errorMessage = `${errorMessage}. ${validationErrors}`;
                }
              } catch {
                errorMessage = 'Ошибка валидации файла';
              }
            } else if (xhr.status >= 500) {
              errorMessage = 'Ошибка сервера. Попробуйте позже';
            }

            setError(errorMessage);
            reject(new Error(errorMessage));
          }
        } catch (err) {
          console.error('Error processing upload response:', err);
          setError('Ошибка при обработке ответа сервера');
          reject(err);
        } finally {
          setUploading(false);
          setUploadProgress(0);
        }
      });

      // Handle upload errors with retry logic
      xhr.addEventListener('error', () => {
        console.error('Upload error occurred');

        // Check if we should retry
        if (retryAttempt < MAX_RETRY_ATTEMPTS) {
          console.log(`Retrying upload (attempt ${retryAttempt + 1}/${MAX_RETRY_ATTEMPTS})`);
          setRetryAttempt(prev => prev + 1);

          setTimeout(() => {
            // Retry the upload
            handleVideoUpload(file, onProgress).then(resolve).catch(reject);
          }, RETRY_DELAY);
          return;
        }

        console.error('Upload failed after maximum retry attempts');
        setError('Ошибка сети при загрузке видео. Проверьте подключение к интернету');
        setUploading(false);
        setUploadProgress(0);
        setRetryAttempt(0);
        reject(new Error('Network error after retries'));
      });

      // Handle upload timeout with retry logic
      xhr.addEventListener('timeout', () => {
        console.error('Upload timeout occurred');

        // Check if we should retry
        if (retryAttempt < MAX_RETRY_ATTEMPTS) {
          console.log(`Retrying upload after timeout (attempt ${retryAttempt + 1}/${MAX_RETRY_ATTEMPTS})`);
          setRetryAttempt(prev => prev + 1);

          setTimeout(() => {
            // Retry the upload
            handleVideoUpload(file, onProgress).then(resolve).catch(reject);
          }, RETRY_DELAY);
          return;
        }

        console.error('Upload timeout after maximum retry attempts');
        setError('Превышено время ожидания загрузки. Попробуйте позже');
        setUploading(false);
        setUploadProgress(0);
        setRetryAttempt(0);
        reject(new Error('Upload timeout after retries'));
      });

      // Handle upload abort
      xhr.addEventListener('abort', () => {
        console.log('Upload aborted by user or system');
        setError('Загрузка была отменена');
        setUploading(false);
        setUploadProgress(0);
        setRetryAttempt(0);
        reject(new Error('Upload aborted'));
      });

      // Configure and send request
      xhr.open('POST', `${API_BASE_URL}/home/hero-video`);
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.timeout = 300000; // 5 minutes timeout
      xhr.withCredentials = true;

      // Handle FormData polyfill case
      if (isPolyfill) {
        // For older browsers, we need to handle the polyfill differently
        // This is a simplified approach - in production you might need more sophisticated handling
        console.warn('Using FormData polyfill - some features may be limited');
        
        // Try to send as regular FormData if possible, otherwise fall back to basic approach
        try {
          xhr.send(formData as any);
        } catch (polyfillError) {
          console.error('FormData polyfill error:', polyfillError);
          setError('Ваш браузер имеет ограниченную поддержку загрузки файлов. Попробуйте обновить браузер.');
          setUploading(false);
          setUploadProgress(0);
          reject(new Error('FormData polyfill error'));
          return;
        }
      } else {
        xhr.send(formData);
      }
    });
  };

  // Delete current hero video
  const handleVideoDelete = async () => {
    try {
      setDeleting(true);
      setError(null);
      setSuccess(null);

      const response = await fetch(`${API_BASE_URL}/home/hero-video`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' },
        credentials: 'include'
      });

      const data: ApiResponse = await response.json();

      if (response.ok && data.success) {
        setSuccess('Видео успешно удалено!');
        setCurrentVideo(null);
        setDeleteDialogOpen(false);

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(data.message || 'Ошибка при удалении видео');
      }
    } catch (err) {
      console.error('Delete error:', err);
      setError('Произошла ошибка при удалении видео');
    } finally {
      setDeleting(false);
    }
  };



  // Clear messages after timeout
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Load initial data
  useEffect(() => {
    fetchCurrentVideo();
  }, [fetchCurrentVideo]);

  return (
    <div className="space-y-6">
      {/* Success/Error alerts */}
      {success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Current Video Display */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                Текущее видео
              </CardTitle>
              <CardDescription>
                Управление видео для главной страницы
              </CardDescription>
            </div>
            {currentVideo?.hero_video_url && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Удалить
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Загрузка...</p>
            </div>
          ) : currentVideo?.hero_video_url ? (
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden group relative">
                <video
                  src={getVideoUrl(currentVideo.hero_video_url)}
                  className="w-full h-full object-cover group-hover:controls"
                  preload="metadata"
                  onMouseEnter={(e) => {
                    e.currentTarget.setAttribute('controls', 'true');
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.removeAttribute('controls');
                  }}
                >
                  Ваш браузер не поддерживает воспроизведение видео.
                </video>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
                    Наведите курсор для управления воспроизведением
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Имя файла:</span>
                  <p className="text-gray-600 break-all">{currentVideo.hero_video_original_name || 'Неизвестно'}</p>
                </div>
                <div>
                  <span className="font-medium">Размер файла:</span>
                  <p className="text-gray-600">
                    {currentVideo.formatted_video_size ||
                      (currentVideo.hero_video_size ? formatFileSize(currentVideo.hero_video_size) : 'Неизвестно')}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Формат видео:</span>
                  <p className="text-gray-600">{getVideoFormat(currentVideo.hero_video_original_name)}</p>
                </div>
                <div>
                  <span className="font-medium">Статус:</span>
                  <p className="text-gray-600">{currentVideo.is_active ? 'Активно' : 'Неактивно'}</p>
                </div>
                <div>
                  <span className="font-medium">Дата загрузки:</span>
                  <p className="text-gray-600">
                    {new Date(currentVideo.created_at).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Последнее обновление:</span>
                  <p className="text-gray-600">
                    {new Date(currentVideo.updated_at).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Видео не загружено</p>
              <p className="text-sm text-gray-500 mt-1">
                Загрузите видео, чтобы оно отображалось на главной странице
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Video Upload Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            {currentVideo?.hero_video_url ? 'Заменить видео' : 'Загрузить видео'}
          </CardTitle>
          <CardDescription>
            Загрузите новое видео для главной страницы. Максимальный размер: 50 MB
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VideoUploadForm
            onUpload={handleVideoUpload}
            uploading={uploading}
            uploadProgress={uploadProgress}
          />
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Подтвердите удаление</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Видео будет удалено навсегда.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleVideoDelete} disabled={deleting}>
              {deleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Удаление...
                </>
              ) : (
                'Удалить'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};