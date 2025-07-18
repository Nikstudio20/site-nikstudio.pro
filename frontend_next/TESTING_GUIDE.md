# Video Poster Upload - Manual Testing Guide

This guide provides comprehensive testing scenarios to verify all form functionality for video poster uploads.

## Test Environment Setup

1. Start the development server:
   ```bash
   cd frontend_next
   npm run dev
   ```

2. Navigate to a project detail page: `http://localhost:3000/admin/projects/[slug]`

## Test Scenarios

### 1. Hero Media Creation Form Tests

#### Test 1.1: Video File with Poster Upload
**Objective**: Verify video files require poster uploads

**Steps**:
1. Click "Добавить группу" button in Hero Карусель section
2. Change file type from "Изображение" to "Видео"
3. Upload a valid video file (< 50MB, .mp4/.webm/.ogg)
4. Verify poster upload field appears
5. Upload a valid poster image (< 2MB, .jpg/.png/.gif/.webp)
6. Fill in alt text
7. Click "Создать группу"

**Expected Result**: ✅ Group created successfully with success message

#### Test 1.2: Video File without Poster
**Objective**: Verify poster is required for video files

**Steps**:
1. Click "Добавить группу" button
2. Change file type to "Видео"
3. Upload a valid video file
4. Do NOT upload a poster
5. Click "Создать группу"

**Expected Result**: ❌ Error message "Пожалуйста, выберите постер для каждого видео файла."

#### Test 1.3: Oversized Video File
**Objective**: Verify video file size validation

**Steps**:
1. Click "Добавить группу" button
2. Change file type to "Видео"
3. Try to upload a video file > 50MB

**Expected Result**: ❌ Error message about file size exceeding 50 MB limit

#### Test 1.4: Oversized Poster File
**Objective**: Verify poster file size validation

**Steps**:
1. Click "Добавить группу" button
2. Change file type to "Видео"
3. Upload a valid video file
4. Try to upload a poster image > 2MB

**Expected Result**: ❌ Error message about poster file size exceeding 2 MB limit

#### Test 1.5: Invalid Poster Format
**Objective**: Verify poster file format validation

**Steps**:
1. Click "Добавить группу" button
2. Change file type to "Видео"
3. Upload a valid video file
4. Try to upload a non-image file as poster (.txt, .pdf, etc.)

**Expected Result**: ❌ Error message about invalid image format

#### Test 1.6: Double Group Type
**Objective**: Verify double group functionality

**Steps**:
1. Click "Добавить группу" button
2. Change group type to "Двойной"
3. Verify two file upload sections appear
4. Upload video files with posters for both elements
5. Click "Создать группу"

**Expected Result**: ✅ Double group created with two video elements

### 2. Hero Media Editing Form Tests

#### Test 2.1: Load Existing Hero Media
**Objective**: Verify existing hero media loads for editing

**Steps**:
1. Find an existing hero media group
2. Click the edit button (pencil icon)
3. Verify existing data is populated in form fields

**Expected Result**: ✅ Form loads with existing file paths, alt text, and settings

#### Test 2.2: Change File Type from Video to Image
**Objective**: Verify poster field is hidden when switching to image

**Steps**:
1. Edit an existing video hero media
2. Change file type from "Видео" to "Изображение"
3. Verify poster upload field disappears

**Expected Result**: ✅ Poster field is hidden, existing poster data is cleared

#### Test 2.3: Update Video with New Poster
**Objective**: Verify video poster can be updated

**Steps**:
1. Edit an existing video hero media
2. Upload a new poster file
3. Click "Сохранить"

**Expected Result**: ✅ Video updated with new poster, success message shown

### 3. Project Block Media Creation Form Tests

#### Test 3.1: Create Block Media with Video and Poster
**Objective**: Verify block media creation with video files

**Steps**:
1. Find a project block
2. Click "Добавить медиа" button
3. Change file type to "Видео"
4. Upload a valid video file (< 50MB)
5. Upload a valid poster image (< 2MB)
6. Fill in alt text and order
7. Click "Создать медиа"

**Expected Result**: ✅ Block media created successfully

#### Test 3.2: Block Media without Poster
**Objective**: Verify poster is required for block video files

**Steps**:
1. Click "Добавить медиа" for a block
2. Change file type to "Видео"
3. Upload a video file but no poster
4. Click "Создать медиа"

**Expected Result**: ❌ Error message requiring poster for video files

#### Test 3.3: Oversized Block Video File
**Objective**: Verify block video file size validation

**Steps**:
1. Click "Добавить медиа" for a block
2. Change file type to "Видео"
3. Try to upload a video file > 50MB

**Expected Result**: ❌ Error message about file size exceeding limit

### 4. Project Block Media Editing Form Tests

#### Test 4.1: Edit Existing Block Media
**Objective**: Verify existing block media can be edited

**Steps**:
1. Find a block with existing media
2. Click "Редактировать медиа" button
3. Verify existing data is loaded

**Expected Result**: ✅ Form loads with existing media data

#### Test 4.2: Change Block Media File Type
**Objective**: Verify file type changes work in block media editing

**Steps**:
1. Edit existing block video media
2. Change file type from "Видео" to "Изображение"
3. Verify poster field disappears

**Expected Result**: ✅ Poster field is hidden when switching to image type

### 5. Error Handling Tests

#### Test 5.1: Network Error Handling
**Objective**: Verify graceful handling of network errors

**Steps**:
1. Disconnect from internet or stop backend server
2. Try to create/edit any media
3. Verify error message is displayed

**Expected Result**: ❌ User-friendly error message about network issues

#### Test 5.2: 413 File Size Error
**Objective**: Verify server-side file size error handling

**Steps**:
1. Upload files that might trigger server 413 error
2. Verify specific error message is shown

**Expected Result**: ❌ Specific error message about file size limits

#### Test 5.3: Missing Files Validation
**Objective**: Verify validation when no files are selected

**Steps**:
1. Open any media creation form
2. Don't select any files
3. Try to submit

**Expected Result**: ❌ Error message about selecting at least one file

### 6. Form Behavior Tests

#### Test 6.1: Show/Hide Poster Fields
**Objective**: Verify poster fields appear/disappear based on file type

**Steps**:
1. Open any media creation form
2. Switch between "Изображение" and "Видео" file types
3. Verify poster field visibility changes accordingly

**Expected Result**: ✅ Poster field only visible for video file types

#### Test 6.2: File Selection Feedback
**Objective**: Verify user gets feedback when files are selected

**Steps**:
1. Open any media creation form
2. Select various files
3. Verify file names and sizes are displayed

**Expected Result**: ✅ Selected file information is shown to user

#### Test 6.3: Real-time Validation Feedback
**Objective**: Verify validation errors appear immediately

**Steps**:
1. Try to upload oversized or invalid files
2. Verify error messages appear immediately
3. Upload valid files and verify errors clear

**Expected Result**: ✅ Immediate feedback on file validation

## Test Completion Checklist

- [ ] Hero media creation with video and poster
- [ ] Hero media creation validation (missing poster, oversized files, invalid formats)
- [ ] Hero media editing with file type changes
- [ ] Block media creation with video and poster
- [ ] Block media creation validation
- [ ] Block media editing with file type changes
- [ ] Error handling for network issues and server errors
- [ ] Form behavior (show/hide fields, real-time validation)
- [ ] Edge cases (zero-byte files, exact size limits)

## Success Criteria

All tests should pass with:
- ✅ Proper validation of file sizes (2MB for images, 50MB for videos)
- ✅ Proper validation of image formats (jpg, jpeg, png, gif, webp)
- ✅ Required poster uploads for video files
- ✅ Proper error messages for all validation failures
- ✅ Successful creation/editing of media with valid files
- ✅ Proper form behavior (show/hide fields based on file type)
- ✅ Real-time validation feedback to users

## Notes

- Test with various file sizes and formats
- Test on different browsers if possible
- Verify all error messages are user-friendly and in Russian
- Ensure success messages appear and auto-dismiss after 3 seconds
- Check that form state is properly reset after successful operations