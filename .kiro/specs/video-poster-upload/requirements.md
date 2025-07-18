# Requirements Document

## Introduction

This feature enhances the video media management system by replacing text input fields for video poster paths with proper file upload functionality. The enhancement applies to four specific forms in the admin interface: Hero media creation, Hero media editing, Project block media creation, and Project block media editing. This improvement will provide a more user-friendly interface and ensure proper file validation and storage.

## Requirements

### Requirement 1

**User Story:** As an admin user, I want to upload poster images for videos in the Hero media creation form, so that I can provide proper thumbnails for video content without manually entering file paths.

#### Acceptance Criteria

1. WHEN the user selects "video" as file type in the "Добавление новой Hero группы" form THEN the system SHALL display a file upload field for poster images
2. WHEN the user selects a poster file THEN the system SHALL validate that the file is an image format (jpg, jpeg, png, gif, webp)
3. WHEN the user selects a poster file THEN the system SHALL validate that the file size does not exceed 2MB
4. IF the poster file exceeds 2MB THEN the system SHALL display an error message "Размер файла постера не должен превышать 2 MB"
5. WHEN the user saves the form with a valid poster file THEN the system SHALL upload the poster file and store the file path in the database
6. WHEN the form is saved successfully THEN the system SHALL display a success message and refresh the hero media list

### Requirement 2

**User Story:** As an admin user, I want to upload poster images for videos in the Hero media editing form, so that I can update or change poster thumbnails for existing video content.

#### Acceptance Criteria

1. WHEN the user opens the "Редактирование Hero медиа" form for a video item THEN the system SHALL display the current poster image if one exists
2. WHEN the user selects "video" as file type in the editing form THEN the system SHALL display a file upload field for poster images
3. WHEN the user selects a new poster file THEN the system SHALL validate that the file is an image format and under 2MB
4. WHEN the user saves the form with a new poster file THEN the system SHALL replace the existing poster file and update the database
5. WHEN no new poster file is selected THEN the system SHALL preserve the existing poster file path

### Requirement 3

**User Story:** As an admin user, I want to upload poster images for videos in the Project block media creation form, so that I can provide proper thumbnails for video content within project blocks.

#### Acceptance Criteria

1. WHEN the user selects "video" as file type in the "Добавление новой медиа-группы в блок" form THEN the system SHALL display a file upload field for poster images
2. WHEN the user selects a poster file THEN the system SHALL validate file format and size constraints
3. WHEN the user saves the form with a valid poster file THEN the system SHALL upload the file and store the path in the project block media table
4. WHEN the form submission fails due to file validation THEN the system SHALL display specific error messages for the validation failure

### Requirement 4

**User Story:** As an admin user, I want to select video file type and upload poster images in the Project block media editing form, so that I can manage video content and thumbnails within existing project blocks.

#### Acceptance Criteria

1. WHEN the user opens the "Редактирование медиа-группы" form THEN the system SHALL display a file type selection field
2. WHEN the user selects "video" as file type THEN the system SHALL display a file upload field for poster images
3. WHEN the user selects "image" as file type THEN the system SHALL hide the poster upload field
4. WHEN editing an existing video item THEN the system SHALL show the current poster image if one exists
5. WHEN the user saves the form with file type changes THEN the system SHALL update the media item type and poster accordingly

### Requirement 5

**User Story:** As a system administrator, I want proper error handling for file upload operations, so that users receive clear feedback when upload operations fail.

#### Acceptance Criteria

1. WHEN a file upload fails due to server errors THEN the system SHALL display a user-friendly error message
2. WHEN a file upload fails due to network issues THEN the system SHALL display a retry option
3. WHEN file validation fails THEN the system SHALL display specific validation error messages
4. WHEN the server returns a 413 status code THEN the system SHALL display a file size limit exceeded message

### Requirement 6

**User Story:** As a developer, I want consistent file upload patterns across all forms, so that the codebase is maintainable and user experience is uniform.

#### Acceptance Criteria

1. WHEN implementing file upload functionality THEN the system SHALL use consistent validation helper functions
2. WHEN displaying file size limits THEN the system SHALL use consistent formatting across all forms
3. WHEN handling file upload errors THEN the system SHALL use consistent error message patterns
4. WHEN processing uploaded files THEN the system SHALL use consistent FormData handling patterns