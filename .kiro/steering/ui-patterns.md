---
inclusion: fileMatch
fileMatchPattern: ['**/*.tsx', '**/*.ts']
---

# UI Patterns & Component Standards

## Design System Requirements
- **Components**: shadcn/ui with Radix UI primitives exclusively
- **Styling**: Tailwind CSS with mobile-first responsive design
- **Icons**: Lucide React only
- **Language**: ALL user-facing text MUST be in Russian
- **Accessibility**: Proper ARIA labels and semantic HTML structure

## Component Library Standards
Use these shadcn/ui components consistently:
- `Button` (variants: default, outline, destructive)
- `Card` with CardHeader, CardTitle, CardDescription, CardContent
- `Dialog` with DialogContent, DialogHeader, DialogFooter
- `AlertDialog` for destructive action confirmations
- `Input`, `Textarea`, `Select`, `Label` for all form elements
- `Alert` with AlertDescription for notifications

## File Upload Implementation

### Validation Pattern (MANDATORY)
```typescript
const validateFileSize = (file: File, type: 'image' | 'video'): boolean => {
  const maxSize = type === 'image' ? 2 * 1024 * 1024 : 50 * 1024 * 1024;
  return file.size <= maxSize;
};
```

### File Input Structure
```typescript
<div className="space-y-2">
  <Label>{type === 'video' ? 'Видео файл' : 'Изображение'}</Label>
  <Input
    type="file"
    accept={type === 'video' ? '.mp4,.webm' : '.jpg,.png,.webp'}
    onChange={handleFileChange}
  />
  <p className="text-sm text-muted-foreground">
    Максимальный размер: {type === 'image' ? '2 МБ' : '50 МБ'}
  </p>
</div>

{/* REQUIRED poster for videos */}
{type === 'video' && (
  <div className="space-y-2">
    <Label>Постер для видео *</Label>
    <Input type="file" accept=".jpg,.png,.webp" onChange={handlePosterChange} />
  </div>
)}
```

## Dialog Patterns

### Standard Dialog
```typescript
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>Заголовок</DialogTitle>
      <DialogDescription>Описание действия</DialogDescription>
    </DialogHeader>
    {/* Form content */}
    <DialogFooter>
      <Button variant="outline" onClick={() => setOpen(false)}>
        Отмена
      </Button>
      <Button onClick={handleSave} disabled={loading}>
        {loading ? 'Сохранение...' : 'Сохранить'}
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Destructive Action Confirmation
```typescript
<AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Подтвердите удаление</AlertDialogTitle>
      <AlertDialogDescription>Это действие нельзя отменить.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Отмена</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>Удалить</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Admin Layout Structure
```typescript
<div className="container mx-auto p-6">
  <div className="flex items-center gap-4 mb-6">
    <Button variant="outline" onClick={handleBack}>
      <ArrowLeft className="w-4 h-4 mr-2" />
      Назад
    </Button>
    <h1 className="text-2xl font-bold">Заголовок страницы</h1>
  </div>

  {/* Auto-dismissing notifications */}
  {success && (
    <Alert className="mb-4">
      <AlertDescription>{success}</AlertDescription>
    </Alert>
  )}
  {error && (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  )}

  <div className="space-y-6">{/* Page content */}</div>
</div>
```

## State Management Rules
- Auto-clear messages after exactly 3 seconds using `setTimeout`
- Show loading states for ALL async operations
- Disable submit buttons during form processing
- Wrap ALL API calls in try-catch blocks
- Validate file size/type before upload attempts
- Handle HTTP 413 errors specifically for file size limits
- Use FormData for ALL file uploads
- Display field-specific validation errors from API responses

## Critical File Constraints
- **Images**: 2MB max, jpg/png/webp only
- **Videos**: 50MB max, mp4/webm only, poster image REQUIRED
- **Validation**: Both client-side AND server-side validation mandatory