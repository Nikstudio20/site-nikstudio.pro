"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { SquarePen, Trash2 } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export type BlogPost = {
  id: number
  title: string
  description: string
  image: string
  position: string
  created_at: string
  updated_at: string
  slug: string
}

interface UpdatePostResponse {
  status: string;
  message?: string;
  data?: BlogPost;
  errors?: Record<string, string[]>;
}

const UpdateBlogPostCell = ({ post }: { post: BlogPost }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [position, setPosition] = useState(post.position);
  const [description, setDescription] = useState(post.description);
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!title || !position || !description) {
        throw new Error("Пожалуйста, заполните все обязательные поля");
      }

      const formData = new FormData();
      formData.append("id", post.id.toString());
      formData.append("title", title);
      formData.append("position", position);
      formData.append("description", description);
      if (image) formData.append("image", image);

      const response = await fetch(`${API_BASE_URL}/blog-posts/update`, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Ошибка сервера: ${response.status}`);
      }

      const result: UpdatePostResponse = await response.json();

      if (result?.status === "success") {
        setOpen(false);
        window.location.reload();
        alert("Статья успешно обновлена");
      } else {
        alert(`Ошибка: ${result?.message || "Не удалось обновить статью"}`);
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      alert(`Произошла ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <SquarePen className="h-4 w-4 cursor-pointer hover:text-[#DE063A] transition-colors duration-300" onClick={() => setOpen(true)} />
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Редактировать статью</DialogTitle>
            <DialogDescription>Измените поля для обновления статьи</DialogDescription>
          </DialogHeader>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="title">Заголовок</Label>
              <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="position">Должность</Label>
              <Input id="position" name="position" value={position} onChange={(e) => setPosition(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="description">Описание</Label>
              <Textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="image">Изображение</Label>
              {post.image && (
                <div className="mb-2">
                  <p className="text-xs text-gray-500">Текущее изображение:</p>
                  <div className="relative h-20 w-20 overflow-hidden rounded mt-1">
                    <Image src={post.image} alt="Blog thumbnail" fill className="object-cover" />
                  </div>
                </div>
              )}
              <Input id="image" type="file" name="image" onChange={handleImageChange} />
              <p className="text-xs text-gray-500 mt-1">Оставьте пустым, чтобы сохранить текущее изображение</p>
            </div>
            <Button type="submit" disabled={isLoading} className="mt-1">
              {isLoading ? "Обновление..." : "Обновить статью"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

const DeleteBlogPostCell = ({ post }: { post: BlogPost }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(`Удалить статью "${post.title}"? Это действие нельзя отменить.`);
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/blog-posts/${post.id}`, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Ошибка сервера: ${response.status}`);
      }

      const result = await response.json();

      if (result?.status === "success") {
        window.location.reload();
        alert("Статья успешно удалена");
      } else {
        alert(`Ошибка: ${result?.message || "Не удалось удалить статью"}`);
      }
    } catch (error) {
      console.error("Ошибка при удалении поста:", error);
      alert(`Произошла ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Trash2 className={`h-4 w-4 cursor-pointer ${isDeleting ? 'opacity-50' : ''} hover:text-[#DE063A] transition-colors duration-300`} onClick={handleDelete} />
    </div>
  );
};

export const columns: ColumnDef<BlogPost>[] = [
  {
    accessorKey: "id",
    header: "ID",
    meta: { className: "w-[3%]" },
  },
  {
    accessorKey: "image",
    header: "Изображение",
    meta: { className: "w-[8%]" },
    cell: ({ row }) => {
      const imageUrl = row.getValue("image") as string;
      return imageUrl ? (
        <div className="relative h-10 w-10 overflow-hidden rounded">
          <Image src={imageUrl} alt="Blog thumbnail" fill className="object-cover" />
        </div>
      ) : (
        <span className="text-gray-400">Нет изображения</span>
      );
    },
  },
  {
    accessorKey: "position",
    header: "Должность",
    meta: { className: "w-[11%]" },
  },
  {
    accessorKey: "title",
    header: "Заголовок",
    meta: { className: "w-[19%]" },
    cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "description",
    header: "Описание",
    meta: { className: "w-[20%]" },
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return <div className="max-w-xs truncate" title={description}>{description}</div>;
    },
  },
  {
    accessorKey: "slug",
    header: "Slug",
    meta: { className: "w-[15%]" },
  },
  {
    accessorKey: "status",
    header: "Статус",
    meta: { className: "w-[4%]" },
    cell: () => <Switch className="hover:cursor-pointer" />, // пример
  },
  {
    accessorKey: "update",
    header: "",
    meta: { className: "w-[3%]" },
    cell: ({ row }) => <UpdateBlogPostCell post={row.original} />,
  },
  {
    accessorKey: "delete",
    header: "",
    meta: { className: "w-[3%]" },
    cell: ({ row }) => <DeleteBlogPostCell post={row.original} />,
  },
];