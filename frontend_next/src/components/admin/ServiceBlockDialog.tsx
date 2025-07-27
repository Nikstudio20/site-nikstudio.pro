'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { 
  Save, 
  AlertCircle, 
  CheckCircle, 
  Settings,
  List,
  Image as ImageIcon
} from "lucide-react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ServiceFeaturesManager } from './ServiceFeaturesManager';
import { ServiceMediaManager } from './ServiceMediaManager';

interface ServiceBlockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service?: MediaService | null;
  onSave: () => void;
}

interface MediaService {
  id?: number;
  title: string;
  description: string;
  dark_background: boolean;
  order?: number;
  features: ServiceFeature[];
  mediaItems?: MediaItem[];
}

interface ServiceFeature {
  id?: number;
  title: string;
  description: string[];
  order: number;
}

interface MediaItem {
  id?: number;
  group_id: number;
  media_type: 'main' | 'secondary';
  file_type: 'image' | 'video';
  file_path: string;
  poster_path?: string;
  alt_text: string;
  order: number;
}

export function ServiceBlockDialog({ open, onOpenChange, service, onSave }: ServiceBlockDialogProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('basic');

  // Form state
  const [formData, setFormData] = useState<MediaService>({
    title: '',
    description: '',
    dark_background: false,
    features: [],
    mediaItems: []
  });

  // Auto-clear messages
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Load media items for service
  const loadMediaItems = async (serviceId: number) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/media-services/${serviceId}/media`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          // Convert server response to MediaItem format
          const mediaItems: MediaItem[] = [];
          data.data.forEach((group: any) => {
            if (group.main) {
              mediaItems.push({
                id: group.main.id,
                group_id: group.group_id,
                media_type: 'main',
                file_type: group.main.file_type,
                file_path: group.main.file_path,
                poster_path: group.main.poster_path,
                alt_text: group.main.alt_text,
                order: group.order
              });
            }
            if (group.secondary) {
              mediaItems.push({
                id: group.secondary.id,
                group_id: group.group_id,
                media_type: 'secondary',
                file_type: group.secondary.file_type,
                file_path: group.secondary.file_path,
                poster_path: group.secondary.poster_path,
                alt_text: group.secondary.alt_text,
                order: group.order
              });
            }
          });
          return mediaItems;
        }
      }
    } catch (error) {
      console.error('Ошибка при загрузке медиа-элементов:', error);
    }
    return [];
  };

  // Initialize form data when service changes
  useEffect(() => {
    const initializeFormData = async () => {
      if (service) {
        const mediaItems = service.id ? await loadMediaItems(service.id) : [];
        setFormData({
          ...service,
          features: service.features || [],
          mediaItems: mediaItems
        });
      } else {
        setFormData({
          title: '',
          description: '',
          dark_background: false,
          features: [],
          mediaItems: []
        });
      }
      setActiveTab('basic');
    };

    initializeFormData();
  }, [service, open]);

  const _saveMediaForService = async (serviceId: number, mediaItems: MediaItem[] = []) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const isEdit = service && service.id;
    
    // Сначала удаляем все существующие медиа-элементы для этой услуги (только при редактировании)
    if (isEdit) {
      try {
        // Получаем существующие медиа-элементы
        const existingResponse = await fetch(`${apiUrl}/api/media-services/${serviceId}/media`);
        if (existingResponse.ok) {
          const existingData = await existingResponse.json();
          if (existingData.status === 'success' && existingData.data) {
            // Удаляем каждый существующий медиа-элемент по group_id
            const processedGroups = new Set<number>();
            for (const existingMedia of existingData.data) {
              if (!processedGroups.has(existingMedia.group_id)) {
                await fetch(`${apiUrl}/api/media-services/${serviceId}/media/${existingMedia.group_id}`, {
                  method: 'DELETE'
                });
                processedGroups.add(existingMedia.group_id);
              }
            }
          }
        }
      } catch (error) {
        console.warn('Ошибка при удалении существующих медиа-элементов:', error);
      }
    }
    
    // Группируем медиа-элементы по group_id
    const mediaGroups = new Map<number, MediaItem[]>();
    (mediaItems || []).forEach(item => {
      if (!mediaGroups.has(item.group_id)) {
        mediaGroups.set(item.group_id, []);
      }
      mediaGroups.get(item.group_id)!.push(item);
    });
    
    // Создаем новые медиа-группы
    let groupOrder = 1;
    for (const [groupId, groupItems] of mediaGroups) {
      try {
        // Подготавливаем FormData для загрузки
        const formData = new FormData();
        
        const mainItem = groupItems.find(item => item.media_type === 'main');
        const secondaryItem = groupItems.find(item => item.media_type === 'secondary');
        
        if (mainItem) {
          // Для новых файлов нужно будет добавить логику загрузки файлов
          // Пока что отправляем только метаданные
          formData.append('main_alt', mainItem.alt_text);
          if (mainItem.file_type === 'video' && mainItem.poster_path) {
            // Добавить логику для постера
          }
        }
        
        if (secondaryItem) {
          formData.append('secondary_alt', secondaryItem.alt_text);
        }
        
        formData.append('order', groupOrder.toString());
        
        const response = await fetch(`${apiUrl}/api/media-services/${serviceId}/media`, {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Ошибка при сохранении медиа-группы ${groupId}`);
        }
        
        groupOrder++;
      } catch (error) {
        console.error(`Ошибка при сохранении медиа-группы ${groupId}:`, error);
        throw error;
      }
    }
  };

  const saveFeaturesForService = async (serviceId: number, features: ServiceFeature[]) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const isEdit = service && service.id;
    
    // Сначала удаляем все существующие функции для этой услуги (только при редактировании)
    if (isEdit) {
      try {
        // Получаем существующие функции
        const existingResponse = await fetch(`${apiUrl}/api/media-services/${serviceId}/features`);
        if (existingResponse.ok) {
          const existingData = await existingResponse.json();
          if (existingData.status === 'success' && existingData.data) {
            // Удаляем каждую существующую функцию
            for (const existingFeature of existingData.data) {
              await fetch(`${apiUrl}/api/media-services/${serviceId}/features/${existingFeature.id}`, {
                method: 'DELETE'
              });
            }
          }
        }
      } catch (error) {
        console.warn('Ошибка при удалении существующих функций:', error);
      }
    }
    
    // Создаем новые функции
    for (let i = 0; i < features.length; i++) {
      const feature = features[i];
      try {
        const response = await fetch(`${apiUrl}/api/media-services/${serviceId}/features`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: feature.title,
            description: feature.description,
            order: i + 1
          }),
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Ошибка при сохранении функции "${feature.title}"`);
        }
      } catch (error) {
        console.error(`Ошибка при сохранении функции "${feature.title}":`, error);
        throw error;
      }
    }
  };

  const handleSubmit = async () => {
    
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const isEdit = service && service.id;
      const url = isEdit 
        ? `${apiUrl}/api/media-services/${service.id}`
        : `${apiUrl}/api/media-services`;
      
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          dark_background: formData.dark_background
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        // Если ответ не JSON (например, HTML страница ошибки)
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('API endpoint не найден. Убедитесь, что Laravel сервер запущен на http://localhost:8000');
          } else if (response.status >= 500) {
            throw new Error('Ошибка сервера. Проверьте логи Laravel');
          } else {
            throw new Error(`HTTP ${response.status}: Ошибка при сохранении блока услуги`);
          }
        }
        throw new Error('Неверный формат ответа от сервера');
      }

      if (!response.ok) {
        if (response.status === 422 && data.errors) {
          const errorMessages = Object.values(data.errors).flat().join(', ');
          throw new Error(errorMessages);
        }
        throw new Error(data.message || 'Ошибка при сохранении блока услуги');
      }

      if (data.status === 'success') {
        const savedService = data.data;
        const serviceId = savedService.id;

        // Сохраняем функции, если они есть
        if (formData.features && formData.features.length > 0) {
          try {
            await saveFeaturesForService(serviceId, formData.features);
          } catch (featuresError) {
            console.error('Ошибка при сохранении функций:', featuresError);
            // Показываем предупреждение, но не прерываем процесс
            setError(`Блок услуги сохранён, но возникла ошибка при сохранении функций: ${featuresError instanceof Error ? featuresError.message : 'Неизвестная ошибка'}`);
            onSave();
            return; // Не закрываем диалог, чтобы пользователь мог попробовать снова
          }
        }

        // Медиа-элементы сохраняются напрямую через MediaUploadGroup
        // Здесь мы не сохраняем медиа, так как они должны загружаться отдельно

        // Перезагружаем медиа-элементы после сохранения, чтобы синхронизировать с сервером
        if (savedService.id) {
          try {
            const updatedMediaItems = await loadMediaItems(savedService.id);
            setFormData(prev => ({ ...prev, mediaItems: updatedMediaItems }));
          } catch (error) {
            console.error('Ошибка при перезагрузке медиа-элементов:', error);
          }
        }

        setSuccess(isEdit ? 'Блок услуги успешно обновлён' : 'Блок услуги успешно создан');
        onSave();
        setTimeout(() => {
          onOpenChange(false);
        }, 1500);
      } else {
        throw new Error(data.message || 'Ошибка при сохранении блока услуги');
      }
    } catch (err) {
      console.error('Ошибка при сохранении блока услуги:', err);
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  const handleFeaturesChange = (features: ServiceFeature[]) => {
    setFormData(prev => ({ ...prev, features }));
  };

  const handleMediaChange = (mediaItems: MediaItem[]) => {
    console.log('ServiceBlockDialog: Updating media items:', mediaItems);
    setFormData(prev => ({ ...prev, mediaItems }));
  };

  const isEdit = service && service.id;

  return (
    <DndProvider backend={HTML5Backend}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Редактировать блок услуги' : 'Создать блок услуги'}
          </DialogTitle>
        </DialogHeader>

        {/* Auto-dismissing notifications */}
        {success && (
          <Alert className="mb-4">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Основное
              </TabsTrigger>
              <TabsTrigger value="features" className="flex items-center gap-2">
                <List className="w-4 h-4" />
                Функции
              </TabsTrigger>
              <TabsTrigger value="media" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Медиа
              </TabsTrigger>
            </TabsList>

            {/* Basic Information Tab */}
            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Основная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="service_title">Заголовок *</Label>
                    <Input
                      id="service_title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Введите заголовок блока услуги"
                      required
                      maxLength={255}
                    />
                    <p className="text-sm text-muted-foreground">
                      Заголовок блока услуги ({formData.title.length}/255)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service_description">Описание</Label>
                    <Textarea
                      id="service_description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Введите описание блока услуги"
                      rows={4}
                      maxLength={1000}
                    />
                    <p className="text-sm text-muted-foreground">
                      Описание блока услуги ({formData.description.length}/1000)
                    </p>
                  </div>
                  
                </CardContent>
              </Card>
            </TabsContent>

            {/* Features Tab */}
            <TabsContent value="features" className="space-y-6">
              <ServiceFeaturesManager
                features={formData.features}
                onFeaturesChange={handleFeaturesChange}
                serviceId={service?.id}
              />
            </TabsContent>

            {/* Media Tab */}
            <TabsContent value="media" className="space-y-6">
              <ServiceMediaManager
                mediaItems={formData.mediaItems || []}
                onMediaChange={handleMediaChange}
                serviceId={service?.id}
              />
            </TabsContent>
          </Tabs>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Отмена
            </Button>
            <Button 
              type="button"
              onClick={handleSubmit}
              disabled={loading || !formData.title.trim()}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Сохранение...' : (isEdit ? 'Обновить блок' : 'Создать блок')}
            </Button>
          </div>
        </div>
        </DialogContent>
      </Dialog>
    </DndProvider>
  );
}