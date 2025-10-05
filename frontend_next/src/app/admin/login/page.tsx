'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Принудительно делаем страницу логина динамической
export const dynamic = 'force-dynamic'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, LogIn } from "lucide-react";

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Проверяем, если уже аутентифицирован
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('admin-token='))
        ?.split('=')[1];
      
      // Если токен существует и не пустой, перенаправляем на админку
      if (token && token.trim() !== '') {
        router.push('/admin');
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      
      console.log('API URL:', apiUrl);
      console.log('Credentials:', { email: credentials.username, password: '***' });
      
      if (!apiUrl) {
        throw new Error('Ошибка конфигурации: API URL не определен');
      }

      const response = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.username,
          password: credentials.password
        }),
        credentials: 'include',
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        
        if (response.status === 422) {
          setError('Неверные учетные данные');
        } else {
          setError(`Ошибка при входе в систему (${response.status})`);
        }
        setTimeout(() => setError(null), 5000);
        return;
      }

      const data = await response.json();
      console.log('Login response:', { success: data.success, hasToken: !!data.token });
      
      if (data.success && data.token) {
        // Сохраняем токен в cookie
        document.cookie = `admin-token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
        
        // Перенаправляем на админ-панель
        window.location.href = '/admin';
      } else {
        setError('Ошибка получения токена');
        setTimeout(() => setError(null), 3000);
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Ошибка при входе в систему';
      setError(`Ошибка: ${errorMessage}`);
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Вход в админ-панель
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Введите учетные данные для доступа к системе управления
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LogIn className="w-5 h-5" />
              Авторизация
            </CardTitle>
            <CardDescription>              
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Логин</Label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="admin"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? 'Вход...' : 'Войти в систему'}
              </Button>
            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}