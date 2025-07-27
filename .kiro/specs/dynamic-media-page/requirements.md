# Requirements Document

## Introduction

This feature will transform the static media page into a dynamic, admin-manageable system. The media page currently displays hardcoded service sections with carousel images, descriptions, and features. The goal is to create a comprehensive admin interface that allows full management of all media page content while preserving the exact existing layout and styling. The system will support both desktop and mobile layouts with identical visual presentation but dynamic data sourcing.

## Requirements

### Requirement 1

**User Story:** As an admin, I want to manage media page service blocks through an admin interface, so that I can add, edit, and delete service sections without code changes.

#### Acceptance Criteria

1. WHEN admin accesses the media admin page THEN system SHALL display a list of all existing service blocks
2. WHEN admin clicks "Add Service Block" THEN system SHALL open a dialog to create a new service block
3. WHEN admin fills service block form with title, description, and features THEN system SHALL validate and save the new block
4. WHEN admin clicks edit on a service block THEN system SHALL open a dialog with pre-filled current data
5. WHEN admin saves edited service block THEN system SHALL update the block and refresh the display
6. WHEN admin clicks delete on a service block THEN system SHALL show confirmation dialog before deletion
7. WHEN admin confirms deletion THEN system SHALL remove the block from database and update display

### Requirement 2

**User Story:** As an admin, I want to manage carousel media for each service block, so that I can upload and organize images/videos for each service section.

#### Acceptance Criteria

1. WHEN admin edits a service block THEN system SHALL display current carousel media items
2. WHEN admin clicks "Add Media Group" THEN system SHALL allow upload of paired images (main and secondary)
3. WHEN admin uploads media files THEN system SHALL validate file size (images: 2MB max, videos: 50MB max)
4. WHEN admin uploads video files THEN system SHALL require poster image upload
5. WHEN admin saves media group THEN system SHALL store files and update carousel data
6. WHEN admin deletes media group THEN system SHALL remove files and update carousel
7. WHEN admin reorders media groups THEN system SHALL update display order

### Requirement 3

**User Story:** As an admin, I want to manage service features within each block, so that I can add, edit, and remove feature descriptions dynamically.

#### Acceptance Criteria

1. WHEN admin edits a service block THEN system SHALL display current features list
2. WHEN admin clicks "Add Feature" THEN system SHALL provide form for feature title and description paragraphs
3. WHEN admin edits a feature THEN system SHALL allow modification of title and multiple description paragraphs
4. WHEN admin saves feature changes THEN system SHALL update the feature data
5. WHEN admin deletes a feature THEN system SHALL remove it from the service block
6. WHEN admin reorders features THEN system SHALL update display order within the block

### Requirement 4

**User Story:** As an admin, I want to manage testimonials section content, so that I can update client testimonials, quotes, and images.

#### Acceptance Criteria

1. WHEN admin accesses testimonials management THEN system SHALL display current testimonials list
2. WHEN admin adds new testimonial THEN system SHALL require company name, quote, description text, and image
3. WHEN admin uploads testimonial image THEN system SHALL validate image format and size (2MB max)
4. WHEN admin edits testimonial THEN system SHALL allow modification of all testimonial fields
5. WHEN admin saves testimonial changes THEN system SHALL update testimonial data
6. WHEN admin deletes testimonial THEN system SHALL remove testimonial and associated image
7. WHEN admin reorders testimonials THEN system SHALL update carousel display order

### Requirement 5

**User Story:** As an admin, I want to manage the process section content, so that I can update process steps, descriptions, and images.

#### Acceptance Criteria

1. WHEN admin accesses process management THEN system SHALL display current process steps
2. WHEN admin adds new process step THEN system SHALL require step number, title, subtitle, descriptions, and image
3. WHEN admin uploads process step image THEN system SHALL validate image format and size (2MB max)
4. WHEN admin edits process step THEN system SHALL allow modification of all step fields including dual descriptions
5. WHEN admin saves process step changes THEN system SHALL update step data
6. WHEN admin deletes process step THEN system SHALL remove step and associated image
7. WHEN admin reorders process steps THEN system SHALL update display sequence

### Requirement 6

**User Story:** As a website visitor, I want to see the media page with identical layout and styling, so that the user experience remains consistent while content is dynamically loaded.

#### Acceptance Criteria

1. WHEN visitor accesses media page THEN system SHALL display all service blocks in original layout
2. WHEN page loads service sections THEN system SHALL preserve exact desktop styling from ServiceSection component
3. WHEN page loads on mobile THEN system SHALL preserve exact mobile styling from ServiceSection_mobile component
4. WHEN carousel displays media THEN system SHALL maintain original CarouselWithLightbox functionality
5. WHEN testimonials section loads THEN system SHALL preserve original carousel and transition effects
6. WHEN process section loads THEN system SHALL maintain original alternating layout pattern
7. WHEN any section fails to load THEN system SHALL display appropriate fallback content

### Requirement 7

**User Story:** As an admin, I want to manage hero section content, so that I can update the main title and description text.

#### Acceptance Criteria

1. WHEN admin accesses hero section management THEN system SHALL display current hero title and description
2. WHEN admin edits hero content THEN system SHALL provide form for title and description text
3. WHEN admin saves hero changes THEN system SHALL validate text length and update content
4. WHEN hero content is updated THEN system SHALL immediately reflect changes on public page
5. WHEN hero content is empty THEN system SHALL display default fallback text

### Requirement 8

**User Story:** As a system administrator, I want all media uploads to be properly validated and stored, so that the system maintains security and performance standards.

#### Acceptance Criteria

1. WHEN any file is uploaded THEN system SHALL validate file type against allowed formats
2. WHEN image is uploaded THEN system SHALL enforce 2MB maximum file size limit
3. WHEN video is uploaded THEN system SHALL enforce 50MB maximum file size limit
4. WHEN video is uploaded THEN system SHALL require corresponding poster image
5. WHEN file validation fails THEN system SHALL display specific error message in Russian
6. WHEN file upload succeeds THEN system SHALL store file securely and return normalized path
7. WHEN file is deleted THEN system SHALL remove file from storage and database references