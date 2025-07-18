# Implementation Plan

- [x] 1. Create file validation utility functions








  - Implement validateFileSize function to check file size limits for images (2MB) and videos (50MB)
  - Implement getFileSizeLimit function to return human-readable size limits
  - Implement formatFileSize function to format bytes into readable format
  - Implement validateImageFile function to check image file types and MIME types
  - Add these functions to the main component file
  - _Requirements: 1.2, 2.2, 3.2, 4.3, 5.3, 6.1_

- [x] 2. Enhance Hero media creation form with poster upload







  - Replace poster_path text input with file input in "Добавление новой Hero группы" dialog
  - Add conditional rendering to show poster upload field only when file_type is 'video'
  - Implement handleNewPosterChange function to handle poster file selection
  - Add file validation for poster files using validateImageFile function
  - Update handleCreateHeroGroup function to include poster file validation
  - Add poster file to FormData submission with key pattern "hero_media_items[index][poster_file]"
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [x] 3. Enhance Hero media editing form with poster upload







  - Replace poster_path text input with file input in "Редактирование Hero медиа" dialog
  - Add conditional rendering to show poster upload field only when file_type is 'video'
  - Display current poster image preview when editing existing video items
  - Implement handlePosterChange function for editing form
  - Update handleSaveHeroGroup function to handle poster file uploads
  - Ensure existing poster files are preserved when no new poster is selected
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 4. Enhance Project block media creation form with poster upload




  - Replace poster_path text input with file input in "Добавление новой медиа-группы в блок" dialog
  - Add conditional rendering to show poster upload field only when file_type is 'video'
  - Implement handleNewBlockPosterChange function for block media poster selection
  - Add poster file validation using validateImageFile function
  - Update handleSaveBlockMedia function to include poster file in FormData
  - Add poster file validation to form submission process
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 5. Add file type selection to Project block media editing form












  - Add file_type Select component to "Редактирование медиа-группы" dialog
  - Implement handleBlockMediaFileTypeChange function to update file type
  - Add conditional rendering to show poster upload field when file_type is 'video'
  - Display current poster image preview for existing video items
  - Implement handleBlockPosterChange function for editing form
  - Update form validation to require poster files for video types
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 6. Implement consistent error handling across all forms


  - Add file size validation error messages using ERROR_MESSAGES constants
  - Implement poster requirement validation for video files
  - Add network error handling for file upload failures
  - Handle HTTP 413 status code for file size limit exceeded
  - Display specific validation errors for each file input field
  - Clear error messages after successful operations
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 6.3_

- [x] 7. Update backend API endpoints for block media poster handling






  - Extend existing block media creation endpoint to handle poster_file uploads
  - Extend existing block media update endpoint to handle poster_file uploads
  - Add poster file validation rules to Laravel validation
  - Implement poster file storage using Laravel Storage facade
  - Update database records with poster_path when poster files are uploaded
  - Ensure consistent file path normalization in API responses
  - _Requirements: 3.4, 4.5, 5.1, 6.4_

- [x] 8. Add comprehensive form validation and user feedback






  - Implement real-time file validation feedback in all forms
  - Add loading states during file upload operations
  - Display file size limits as helper text under file inputs
  - Show file selection status and selected file names
  - Add success messages after successful file uploads
  - Implement form reset functionality after successful submissions
  - _Requirements: 1.6, 2.4, 3.4, 4.5, 5.3, 6.2_

- [x] 9. Test and verify all form functionality






  - Test Hero media creation form with video files and poster uploads
  - Test Hero media editing form with existing and new poster files
  - Test Project block media creation form with video and poster files
  - Test Project block media editing form with file type changes
  - Verify error handling for oversized files and invalid file types
  - Test form behavior when poster files are missing for video types
  - _Requirements: 1.1, 2.1, 3.1, 4.1, 5.1, 6.1_

- [x] 10. Optimize file upload performance and user experience






  - Add file upload progress indicators where appropriate
  - Implement file preview functionality for selected images
  - Add drag-and-drop support for file inputs
  - Optimize file validation to run before form submission
  - Add keyboard navigation support for file inputs
  - Ensure responsive design for file upload components
  - _Requirements: 6.1, 6.2, 6.3, 6.4_