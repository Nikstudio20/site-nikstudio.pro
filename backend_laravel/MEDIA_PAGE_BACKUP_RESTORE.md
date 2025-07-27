# Media Page Backup and Restore Utilities

This document describes the backup and restore utilities for the media page content management system.

## Overview

The media page system includes comprehensive backup and restore functionality to ensure data integrity and provide rollback capabilities. The utilities include:

1. **Database Seeder** - Populates database with complete data from mediaServices.ts
2. **Backup Command** - Creates JSON backups of all media page content
3. **Restore Command** - Restores content from backup files
4. **Migration Rollback** - Safely rolls back all media page migrations

## Commands

### 1. Database Seeding

Populate the database with complete data from mediaServices.ts:

```bash
php artisan db:seed --class=MediaPageSeeder
```

**Features:**
- Seeds all 7 media services with complete data
- Includes features, media items, testimonials, and process steps
- Data validation ensures integrity
- Progress reporting during seeding
- Error handling with detailed messages

**Data Seeded:**
- Media page content (hero, testimonials header, process header)
- 7 media services with features and media items
- 3 sample testimonials
- 4 process steps

### 2. Backup Creation

Create a backup of all media page content:

```bash
php artisan media-page:backup
```

**Features:**
- Creates timestamped JSON backup files
- Includes all related data (services, features, media, testimonials, process steps)
- Stores in `storage/app/private/backups/` directory
- Includes metadata (creation date, version)
- Progress reporting with record counts

**Backup File Format:**
```json
{
  "created_at": "2025-07-22T21:26:07.268063Z",
  "version": "1.0",
  "data": {
    "media_page_content": [...],
    "media_services": [...],
    "media_testimonials": [...],
    "media_process_steps": [...]
  }
}
```

### 3. Data Restoration

Restore media page content from a backup file:

```bash
php artisan media-page:backup --restore=backup_filename.json
```

**Features:**
- Validates backup file format
- Confirmation prompt before restoration
- Clears existing data before restore
- Restores all relationships correctly
- Progress reporting for each data type
- Error handling with rollback on failure

**Example:**
```bash
php artisan media-page:backup --restore=media_page_backup_2025_07_22_21_26_07.json
```

### 4. Migration Rollback

Rollback all media page migrations with optional backup:

```bash
php artisan media-page:rollback --backup
```

**Features:**
- Optional backup creation before rollback
- Identifies all media page related migrations
- Confirmation prompt before rollback
- Rolls back migrations in correct order
- Complete data removal
- Progress reporting

**Migration Order (rollback sequence):**
1. `create_media_process_steps_table`
2. `create_media_testimonials_table`
3. `create_media_service_media_table`
4. `create_media_service_features_table`
5. `create_media_services_table`
6. `create_media_page_content_table`

## Data Validation

The seeder includes comprehensive data validation:

### Media Page Content
- `hero_title`: required, string, max 255 characters
- `hero_description`: required, string, max 1000 characters
- `testimonials_title`: required, string, max 255 characters
- `testimonials_subtitle`: required, string, max 255 characters
- `process_title`: required, string, max 255 characters
- `process_subtitle`: required, string, max 255 characters

### Media Services
- `title`: required, string, max 255 characters
- `description`: required, string, max 1000 characters
- `order`: required, integer, minimum 1
- `dark_background`: required, boolean
- `slides`: required, array, minimum 1 item
- `features`: required, array, minimum 1 item

### Service Features
- `title`: required, string, max 255 characters
- `description`: required, array, minimum 1 item

### Media Items
- `mainImage`: required, string
- `secondaryImage`: required, string

### Testimonials
- `company`: required, string, max 255 characters
- `quote`: required, string, max 500 characters
- `description`: required, string, max 1000 characters
- `image_path`: required, string
- `order`: required, integer, minimum 1

### Process Steps
- `step_number`: required, string, max 10 characters
- `title`: required, string, max 255 characters
- `subtitle`: required, string, max 255 characters
- `image_path`: required, string
- `description_left`: required, string, max 500 characters
- `description_right`: required, string, max 500 characters
- `order`: required, integer, minimum 1

## Error Handling

All commands include comprehensive error handling:

- **Validation Errors**: Detailed field-specific error messages
- **File System Errors**: Backup directory creation and file access errors
- **Database Errors**: Connection and query execution errors
- **Restoration Errors**: Backup file format validation and data integrity checks
- **Migration Errors**: Rollback failure handling with detailed error messages

## File Locations

### Backup Files
- **Directory**: `storage/app/private/backups/`
- **Format**: `media_page_backup_YYYY_MM_DD_HH_MM_SS.json`
- **Access**: Private storage, not web accessible

### Command Files
- **Backup Command**: `app/Console/Commands/MediaPageBackup.php`
- **Rollback Command**: `app/Console/Commands/MediaPageMigrationRollback.php`
- **Seeder**: `database/seeders/MediaPageSeeder.php`

### Migration Files
- `database/migrations/2025_07_22_044328_create_media_page_content_table.php`
- `database/migrations/2025_07_22_044336_create_media_services_table.php`
- `database/migrations/2025_07_22_044344_create_media_service_features_table.php`
- `database/migrations/2025_07_22_044352_create_media_service_media_table.php`
- `database/migrations/2025_07_22_044400_create_media_testimonials_table.php`
- `database/migrations/2025_07_22_044408_create_media_process_steps_table.php`

## Usage Examples

### Complete Setup from Scratch
```bash
# Run migrations
php artisan migrate

# Seed with initial data
php artisan db:seed --class=MediaPageSeeder

# Create initial backup
php artisan media-page:backup
```

### Disaster Recovery
```bash
# Restore from backup
php artisan media-page:backup --restore=media_page_backup_2025_07_22_21_26_07.json
```

### Complete Rollback
```bash
# Rollback with backup
php artisan media-page:rollback --backup

# Re-run migrations if needed
php artisan migrate

# Re-seed data
php artisan db:seed --class=MediaPageSeeder
```

## Best Practices

1. **Regular Backups**: Create backups before major changes
2. **Test Restores**: Periodically test restore functionality
3. **Backup Before Rollback**: Always use `--backup` flag with rollback
4. **Validate Data**: Check data integrity after restoration
5. **Monitor Logs**: Check Laravel logs for detailed error information

## Troubleshooting

### Common Issues

1. **Permission Errors**: Ensure storage directory is writable
2. **Backup File Not Found**: Check file path and permissions
3. **Validation Failures**: Review data format and constraints
4. **Migration Conflicts**: Ensure clean migration state before rollback

### Log Files
- Laravel logs: `storage/logs/laravel.log`
- Command output includes detailed progress and error information

## Security Considerations

- Backup files are stored in private storage (not web accessible)
- Confirmation prompts prevent accidental data loss
- Validation prevents malformed data injection
- Error messages don't expose sensitive system information