"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Video, Upload, Trash2, Loader2 } from "lucide-react";
import { VideoUploadForm } from "./VideoUploadForm";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { getVideoUrl, formatFileSize, getVideoFormat } from "@/lib/media-utils";


interface ServiceVideo {
  id: number;
  service_name: string;
  video_url?: string;
  video_original_name?: string;
  video_size?: number;
  formatted_video_size?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  success: boolean;
  data?: ServiceVideo;
  message?: string;
  errors?: Record<string, string[]>;
}

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const ServiceVideoManager: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState<ServiceVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const serviceName = 'video_production'; // Фиксированное имя для видео продакшн секции

  // Fetch current service video data
  const fetchCurrentVideo = useCallback(async () => {
    try {
      setLoading(true);
      console.log(`Fetching service video data for: ${serviceName}`);

      const response = await fetch(`${API_BASE_URL}/services/${serviceName}/video`, {
        headers: { 'Accept': 'application/json' },
        cache: 'no-store'
      });

      if (response.ok) {
        const data: ApiResponse = await response.json();
        setCurrentVideo(data.data || null);
        console.log('Successfully fetched service video data');
      } else if (response.status === 404) {
        console.log('No service video data found (404)');
        setCurrentVideo(null);
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      console.error('Error fetching service video:', err);
      setError('Ошибка при загрузке данных о видео услуги');
    } finally {
      setLoading(false);
    }
  }, [serviceName]);

  // Upload new service video
  const handleVideoUpload = async (file: File, onProgress?: (progress: number) => void) => {
    return new Promise<void>((resolve, reject) => {
      setUploading(true);
      setError(null);
      setSuccess(null);
      setUploadProgress(0);

      console.log('Starting service video upload:', {
        serviceName,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        timestamp: new Date().toISOString()
      });

      const formData = new FormData();
      formData.append('video', file);

      const xhr = new XMLHttpRequest();

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
              setSuccess('Видео услуги успешно загружено!');
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

      // Handle upload errors
      xhr.addEventListener('error', () => {
        console.error('Service video upload error occurred');
        setError('Ошибка сети при загрузке видео. Проверьте подключение к интернету');
        setUploading(false);
        setUploadProgress(0);
        reject(new Error('Network error'));
      });

      // Handle upload timeout
      xhr.addEventListener('timeout', () => {
        console.error('Service video upload timeout occurred');
        setError('Превышено время ожидания загрузки. Попробуйте позже');
        setUploading(false);
        setUploadProgress(0);
        reject(new Error('Upload timeout'));
      });

      // Configure and send request
      xhr.open('POST', `${API_BASE_URL}/services/${serviceName}/video`);
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.timeout = 300000; // 5 minutes timeout
      xhr.withCredentials = true;

      xhr.send(formData);
    });
  };

  // Delete current service video
  const handleVideoDelete = async () => {
    try {
      setDeleting(true);
      setError(null);
      setSuccess(null);

      const response = await fetch(`${API_BASE_URL}/services/${serviceName}/video`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' },
        credentials: 'include'
      });

      const data: ApiResponse = await response.json();

      if (response.ok && data.success) {
        setSuccess('Видео услуги успешно удалено!');
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
                Видео для секции "Видео продакшн"
              </CardTitle>
              <CardDescription>
                Управление видео для секции услуг на главной странице
              </CardDescription>
            </div>
            {currentVideo?.video_url && (
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
          ) : currentVideo?.video_url ? (
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden group relative">
                <video
                  src={getVideoUrl(currentVideo.video_url)}
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
                  <p className="text-gray-600 break-all">{currentVideo.video_original_name || 'Неизвестно'}</p>
                </div>
                <div>
                  <span className="font-medium">Размер файла:</span>
                  <p className="text-gray-600">
                    {currentVideo.formatted_video_size ||
                      (currentVideo.video_size ? formatFileSize(currentVideo.video_size) : 'Неизвестно')}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Формат видео:</span>
                  <p className="text-gray-600">{getVideoFormat(currentVideo.video_original_name)}</p>
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
                Загрузите видео, чтобы оно отображалось в секции "Видео продакшн"
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
            {currentVideo?.video_url ? 'Заменить видео' : 'Загрузить видео'}
          </CardTitle>
          <CardDescription>
            Загрузите новое видео для секции "Видео продакшн". Максимальный размер: 50 MB
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