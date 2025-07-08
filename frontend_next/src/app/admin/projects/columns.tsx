import { ColumnDef } from "@tanstack/react-table";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, SquarePen } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export interface ProjectCategory {
  id: number;
  name: string;
  slug: string;
  sort_order: number;
}

export interface Project {
  id: number;
  main_title: string;
  projects_page_title?: string;
  year: number;
  categories: ProjectCategory[]; // заменено на массив категорий
  main_image?: string | null;
  projects_page_image?: string | null;
  logo?: string | null;
}

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const UpdateProjectCell = ({ project }: { project: Project }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<ProjectCategory[]>([]);

  // Состояния для всех полей проекта
  const [mainTitle, setMainTitle] = useState(project.main_title);
  const [projectsPageTitle, setProjectsPageTitle] = useState(project.projects_page_title || "");
  const [year, setYear] = useState(project.year.toString());
  // Массив выбранных ID категорий в строковом формате
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
    project.categories ? project.categories.map(cat => cat.id.toString()) : []
  );
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [projectsPageImage, setProjectsPageImage] = useState<File | null>(null);
  const [logo, setLogo] = useState<File | null>(null);

  useEffect(() => {
    if (open) {
      fetchCategories();
    }
  }, [open]);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/project-categories`, {
        cache: 'no-store',
        headers: { 'Accept': 'application/json' },
      });
      if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
      const data = await res.json();
      setCategories(data.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast(`Ошибка загрузки категорий: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    }
  };

  const handleFileChange = (setter: React.Dispatch<React.SetStateAction<File | null>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selected: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedCategoryIds(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!mainTitle.trim()) {
        throw new Error("Основной заголовок обязателен");
      }
      if (!year.trim()) {
        throw new Error("Год обязателен");
      }
      if (selectedCategoryIds.length === 0) {
        throw new Error("Категории обязательны");
      }

      const yearNum = parseInt(year);
      if (isNaN(yearNum) || yearNum < 1900 || yearNum > 2100) {
        throw new Error("Пожалуйста, введите корректный год");
      }

      const formData = new FormData();
      formData.append("main_title", mainTitle.trim());
      formData.append("projects_page_title", projectsPageTitle.trim());
      formData.append("year", yearNum.toString());
      // Отправляем массив ID категорий как отдельные поля с ключом category_ids[]
      selectedCategoryIds.forEach(id => {
        formData.append("category_ids[]", id);
      });
      formData.append("_method", "PUT");

      if (mainImage) formData.append("main_image", mainImage);
      if (projectsPageImage) formData.append("projects_page_image", projectsPageImage);
      if (logo) formData.append("logo", logo);

      const response = await fetch(`${API_BASE_URL}/projects/${project.id}`, {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' },
        credentials: 'include',
        mode: 'cors',
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          if (errorData.errors) {
            const validationErrors = Object.entries(errorData.errors)
              .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
              .join('; ');
            throw new Error(`Ошибки валидации: ${validationErrors}`);
          }
          throw new Error(errorData.message || `Ошибка сервера: ${response.status}`);
        } else {
          throw new Error(`Ошибка сервера: ${response.status} - ${response.statusText}`);
        }
      }

      toast("Проект успешно обновлен");
      setOpen(false);
      window.location.reload();
    } catch (error) {
      toast(`Ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SquarePen className="h-4 w-4 cursor-pointer hover:text-[#DE063A]" onClick={() => setOpen(true)} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Редактировать проект</DialogTitle>
            <DialogDescription>Измените поля для обновления проекта</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="main_title">Основной заголовок</Label>
              <Input
                id="main_title"
                value={mainTitle}
                onChange={(e) => setMainTitle(e.target.value)}
                required
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="projects_page_title">Заголовок на странице проектов</Label>
              <Input
                id="projects_page_title"
                value={projectsPageTitle}
                onChange={(e) => setProjectsPageTitle(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="year">Год</Label>
              <Input
                id="year"
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="category_ids">Категории</Label>
              <select
                id="category_ids"
                multiple
                value={selectedCategoryIds}
                onChange={handleCategoryChange}
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id.toString()}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="main_image">Основное изображение</Label>
              <Input
                id="main_image"
                type="file"
                onChange={handleFileChange(setMainImage)}
                className="mt-2"
              />
              {project.main_image && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500">Текущее изображение:</p>
                  <Image 
                    src={project.main_image} 
                    alt="Main" 
                    width={48} 
                    height={48} 
                    className="object-cover rounded mt-1" 
                  />
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="projects_page_image">Изображение на странице проектов</Label>
              <Input
                id="projects_page_image"
                type="file"
                onChange={handleFileChange(setProjectsPageImage)}
                className="mt-2"
              />
              {project.projects_page_image && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500">Текущее изображение:</p>
                  <Image 
                    src={project.projects_page_image} 
                    alt="Page" 
                    width={48} 
                    height={48} 
                    className="object-cover rounded mt-1" 
                  />
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="logo">Логотип</Label>
              <Input
                id="logo"
                type="file"
                onChange={handleFileChange(setLogo)}
                className="mt-2"
              />
              {project.logo && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500">Текущий логотип:</p>
                  <Image 
                    src={project.logo} 
                    alt="Logo" 
                    width={48} 
                    height={48} 
                    className="rounded bg-[#0E1011] mt-1" 
                  />
                </div>
              )}
            </div>
            <Button type="submit" disabled={isLoading} className="hover:cursor-pointer">
              {isLoading ? "Обновление..." : "Обновить проект"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

const DeleteProjectCell = ({ project }: { project: Project }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${project.id}`, {
        method: "DELETE",
        headers: { 'Accept': 'application/json' },
        credentials: 'include',
        mode: 'cors',
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || `Ошибка сервера: ${response.status}`);
      }
      toast("Проект успешно удален");
      window.location.reload();
    } catch (error) {
      toast(`Ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2
          className={`h-4 w-4 cursor-pointer hover:text-[#DE063A] ${isDeleting ? 'opacity-50' : ''}`}
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить проект?</AlertDialogTitle>
          <AlertDialogDescription>
            Удалить проект &quot;{project.main_title}&quot;? Это действие нельзя отменить.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting} className="cursor-pointer">
            Отмена
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer text-white"
          >
            {isDeleting ? "Удаление..." : "Удалить"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const columns = (): ColumnDef<Project>[] => [
  {
    accessorKey: "id",
    header: "ID",
    meta: { className: "w-[3%]" },
  },
  {
    accessorKey: "main_title",
    header: "Заголовок на главной странице",
    meta: { className: "w-[15%]" },
  },
  {
    accessorKey: "projects_page_title",
    header: 'Заголовок на странице "Проекты"',
    meta: { className: "w-[16%]" },
  },
  {
    accessorKey: "year",
    header: "Год",
    meta: { className: "w-[4%]" },
  },
  {
    header: "Категории",
    meta: { className: "w-[10%]" },
    cell: ({ row }) => {
      const projectCategories = row.original.categories || [];
      return projectCategories.length > 0
        ? projectCategories.map(cat => cat.name).join(", ")
        : "Неизвестно";
    },
  },
  {
    accessorKey: "main_image",
    header: "Изображение на главной странице",
    meta: { className: "w-[16%]" },
    cell: ({ getValue }) => {
      const url = getValue() as string | null;
      return url ? (
        <Image 
          src={url} 
          alt="Main" 
          width={48} 
          height={48} 
          className="object-cover rounded" 
        />
      ) : null;
    },
  },
  {
    accessorKey: "projects_page_image",
    header: 'Изображение на странице "Проекты"',
    meta: { className: "w-[17%]" },
    cell: ({ getValue }) => {
      const url = getValue() as string | null;
      return url ? (
        <Image 
          src={url} 
          alt="Page" 
          width={48} 
          height={48} 
          className="object-cover rounded" 
        />
      ) : null;
    },
  },
  {
    accessorKey: "logo",
    header: "Логотип",
    meta: { className: "w-[6%]" },
    cell: ({ getValue }) => {
      const url = getValue() as string | null;
      return url ? (
        <Image 
          src={url} 
          alt="Logo" 
          width={48} 
          height={48} 
          className="rounded bg-[#0E1011]" 
        />
      ) : null;
    },
  },
  {
    accessorKey: "update",
    header: "",
    meta: { className: "w-[3%]" },
    cell: ({ row }) => <UpdateProjectCell project={row.original} />,
  },
  {
    accessorKey: "delete",
    header: "",
    meta: { className: "w-[3%]" },
    cell: ({ row }) => <DeleteProjectCell project={row.original} />,
  },
];