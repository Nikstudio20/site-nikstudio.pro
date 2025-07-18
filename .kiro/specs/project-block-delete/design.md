# Design Document: Project Block Delete Feature

## Overview

This design document outlines the implementation of a feature that allows administrators to delete project blocks from the admin interface. The feature will add a delete button next to the existing "Edit text" button for each project block, and implement the functionality to delete the block and its associated media files.

## Architecture

The feature will be implemented using the existing architecture of the application:

1. **Frontend**: React components in Next.js will be modified to add the delete button and confirmation dialog
2. **API**: The existing API endpoint for deleting blocks will be used
3. **Backend**: The existing controller method for deleting blocks will handle the deletion of the block and its associated media

## Components and Interfaces

### Frontend Components

1. **Project Block Card**
   - Add a delete button next to the "Edit text" button
   - Use the existing `Trash2` icon from Lucide React
   - Style the button as a destructive action (red color)

2. **Confirmation Dialog**
   - Use the existing `AlertDialog` component
   - Display a warning message about the irreversible action
   - Provide "Cancel" and "Delete" buttons

3. **State Management**
   - Add state for tracking the block to be deleted: `blockToDelete`
   - Add state for tracking the confirmation dialog visibility: `blockDeleteDialogOpen`
   - Reuse existing state for tracking loading state: `saving`
   - Reuse existing state for tracking success/error messages: `success`, `error`

### Backend Components

The backend already has the necessary components implemented:

1. **API Route**: `DELETE /api/projects/{slug}/blocks/{blockId}`
2. **Controller Method**: `destroyBlock` in `ProjectController.php`
3. **Model**: `ProjectDetailBlock` with relationship to `ProjectDetailBlockMedia`

## Data Models

No changes to the existing data models are required. The feature will use:

1. **ProjectBlock Interface** (Frontend)
   ```typescript
   interface ProjectBlock {
     id: number;
     title: string;
     subtitle?: string;
     content: string;
     order: number;
     mediaItems: ProjectBlockMediaItem[];
   }
   ```

2. **ProjectDetailBlock Model** (Backend)
   ```php
   class ProjectDetailBlock extends Model
   {
       protected $fillable = [
           'project_detail_id',
           'title',
           'subtitle',
           'content',
           'order',
       ];

       public function projectDetail()
       {
           return $this->belongsTo(ProjectDetail::class);
       }

       public function mediaItems()
       {
           return $this->hasMany(ProjectDetailBlockMedia::class)->orderBy('order');
       }
   }
   ```

## Error Handling

1. **Frontend Error Handling**
   - Display error messages using the existing error state
   - Handle network errors and API response errors
   - Provide clear feedback to the user

2. **Backend Error Handling**
   - Use try-catch blocks to handle exceptions
   - Log errors for debugging
   - Return appropriate HTTP status codes and error messages

## Testing Strategy

1. **Manual Testing**
   - Test the delete button visibility and styling
   - Test the confirmation dialog functionality
   - Test successful deletion of blocks
   - Test error handling when deletion fails
   - Test cancellation of deletion

2. **Edge Cases to Test**
   - Deleting a block with no media items
   - Deleting a block with multiple media items
   - Network failures during deletion
   - Concurrent deletion attempts

## Implementation Details

### Frontend Implementation

1. Add a delete button next to the "Edit text" button:
   ```jsx
   <Button 
     variant="destructive" 
     size="sm" 
     onClick={() => handleOpenDeleteBlockDialog(block)} 
     className="flex-shrink-0 hover:cursor-pointer ml-2"
   >
     <Trash2 className="mr-2 h-4 w-4" /> Удалить
   </Button>
   ```

2. Add a confirmation dialog:
   ```jsx
   <AlertDialog open={blockDeleteDialogOpen} onOpenChange={setBlockDeleteDialogOpen}>
     <AlertDialogContent>
       <AlertDialogHeader>
         <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
         <AlertDialogDescription>
           Это действие необратимо удалит блок и все связанные с ним медиа-файлы.
         </AlertDialogDescription>
       </AlertDialogHeader>
       <AlertDialogFooter>
         <AlertDialogCancel disabled={saving}>Отмена</AlertDialogCancel>
         <AlertDialogAction 
           onClick={handleDeleteBlock} 
           disabled={saving} 
           className="bg-red-600 hover:bg-red-700"
         >
           {saving ? 'Удаление...' : 'Удалить'}
         </AlertDialogAction>
       </AlertDialogFooter>
     </AlertDialogContent>
   </AlertDialog>
   ```

3. Implement the handler functions:
   ```typescript
   const handleOpenDeleteBlockDialog = (block: ProjectBlock) => {
     setBlockToDelete(block);
     setBlockDeleteDialogOpen(true);
   };

   const handleDeleteBlock = async () => {
     if (!blockToDelete) return;
     
     setSaving(true);
     setError(null);
     
     try {
       const response = await fetch(
         `${apiUrl}/api/projects/${resolvedParams.slug}/blocks/${blockToDelete.id}`, 
         { method: 'DELETE' }
       );
       
       const data = await response.json();
       
       if (response.ok && data.success) {
         setSuccess('Блок успешно удален');
         await fetchProjectDetail();
         setTimeout(() => setSuccess(null), 3000);
       } else {
         setError(data.message || `Ошибка при удалении блока: ${response.status}`);
       }
     } catch (err) {
       setError(err instanceof Error ? err.message : 'Ошибка при удалении блока');
     } finally {
       setSaving(false);
       setBlockDeleteDialogOpen(false);
       setBlockToDelete(null);
     }
   };
   ```

### Backend Implementation

The backend implementation is already complete with the `destroyBlock` method in `ProjectController.php`:

```php
public function destroyBlock($slug, $blockId)
{
    $block = ProjectDetailBlock::with('mediaItems')->findOrFail($blockId);

    DB::beginTransaction();
    try {
        foreach ($block->mediaItems as $mediaItem) {
            if ($mediaItem->file_path && Storage::disk('public')->exists($mediaItem->file_path)) {
                Storage::disk('public')->delete($mediaItem->file_path);
            }
        }
        $block->mediaItems()->delete();
        $block->delete();
        DB::commit();

        return response()->json(['success' => true, 'message' => 'Блок успешно удален']);
    } catch (Exception $e) {
        DB::rollBack();
        Log::error('Ошибка удаления блока проекта: ' . $e->getMessage(), ['block_id' => $blockId]);
        return response()->json(['success' => false, 'message' => 'Ошибка сервера при удалении блока'], 500);
    }
}
```

## Conclusion

This design provides a comprehensive plan for implementing the project block delete feature. The implementation will leverage existing components and patterns in the application, ensuring consistency with the rest of the admin interface. The feature will provide a clear and intuitive way for administrators to delete project blocks when they are no longer needed.