---
inclusion: always
---

# UI Patterns and Components

## Design System

### Component Library
- **Base**: Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom utility classes
- **Icons**: Lucide React for consistent iconography
- **Theming**: next-themes for dark/light mode support

### Common UI Components
- `Button` - Primary actions and interactions
- `Card` - Content containers with header, content, and description
- `Dialog` - Modal dialogs for forms and confirmations
- `AlertDialog` - Confirmation dialogs for destructive actions
- `Input` - Text input fields
- `Textarea` - Multi-line text input
- `Select` - Dropdown selection
- `Label` - Form field labels
- `Badge` - Status indicators and tags
- `Alert` - Success, error, and info messages

## Form Patterns

### File Upload Forms
```typescript
// Standard file input pattern
<div className="space-y-2">
  <Label htmlFor={`file-${index}`}>
    {item.file_type === 'video' ? 'Видео файл' : 'Изображение'}
  </Label>
  <Input
    id={`file-${index}`}
    type="file"
    accept={item.file_type === 'video' ? 'video/*' : 'image/*'}
    onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
  />
  {/* File size validation message */}
  <p className="text-sm text-muted-foreground">
    Максимальный размер: {getFileSizeLimit(item.file_type)}
  </p>
</div>

// Poster upload for videos
{item.file_type === 'video' && (
  <div className="space-y-2">
    <Label htmlFor={`poster-${index}`}>Постер для видео</Label>
    <Input
      id={`poster-${index}`}
      type="file"
      accept="image/*"
      onChange={(e) => handlePosterChange(index, e.target.files?.[0] || null)}
    />
  </div>
)}
```

### Dialog Patterns
```typescript
// Standard dialog structure
<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description</DialogDescription>
    </DialogHeader>
    
    {/* Dialog content */}
    
    <DialogFooter>
      <Button variant="outline" onClick={() => setDialogOpen(false)}>
        Отмена
      </Button>
      <Button onClick={handleSave} disabled={saving}>
        {saving ? 'Сохранение...' : 'Сохранить'}
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Alert Dialog for Confirmations
```typescript
<AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Подтвердите удаление</AlertDialogTitle>
      <AlertDialogDescription>
        Это действие нельзя отменить. Группа будет удалена навсегда.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Отмена</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>
        Удалить
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Layout Patterns

### Admin Page Structure
```typescript
// Standard admin page layout
<div className="container mx-auto p-6">
  {/* Header with navigation */}
  <div className="flex items-center gap-4 mb-6">
    <Button variant="outline" onClick={handleBack}>
      <ArrowLeft className="w-4 h-4 mr-2" />
      Назад
    </Button>
    <h1 className="text-2xl font-bold">Page Title</h1>
  </div>

  {/* Success/Error alerts */}
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

  {/* Main content */}
  <div className="space-y-6">
    {/* Content sections */}
  </div>
</div>
```

### Card-based Content Organization
```typescript
<Card>
  <CardHeader>
    <div className="flex justify-between items-start">
      <div>
        <CardTitle>Section Title</CardTitle>
        <CardDescription>Section description</CardDescription>
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={handleEdit}>
          <SquarePen className="w-4 h-4 mr-2" />
          Редактировать
        </Button>
        <Button size="sm" variant="destructive" onClick={handleDelete}>
          <Trash2 className="w-4 h-4 mr-2" />
          Удалить
        </Button>
      </div>
    </div>
  </CardHeader>
  <CardContent>
    {/* Card content */}
  </CardContent>
</Card>
```

## State Management Patterns

### Loading States
- Show loading spinners during async operations
- Disable buttons during form submission
- Use skeleton loaders for content loading

### Error Handling
- Display user-friendly error messages
- Use Alert components for system messages
- Clear messages after 3 seconds automatically

### Form Validation
- Validate on client side before submission
- Show specific error messages for each field
- Highlight invalid fields with appropriate styling