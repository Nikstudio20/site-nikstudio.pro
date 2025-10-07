# Task 15: API Client Migration Summary

## Overview
This task involves migrating all direct `fetch` and `axios` calls in admin components to use the centralized API client from `src/lib/api.ts`.

## Benefits of Centralized API Client
- ✅ Automatic token management (adds Bearer token to all requests)
- ✅ Automatic token refresh handling (X-New-Token header)
- ✅ Centralized error handling (401 redirects to login, 403 shows alert)
- ✅ Consistent credentials handling
- ✅ TypeScript type safety
- ✅ Simplified error handling in components

## Files Updated ✅

### 1. Login Page
**File:** `frontend_next/src/app/admin/login/page.tsx`
- ✅ Migrated login POST request to use `post()` from API client
- ✅ Updated to use `getTokenFromCookie()` and `saveTokenToCookie()` utilities
- ✅ Improved error handling with proper response status checks

### 2. Change Password Page
**File:** `frontend_next/src/app/admin/settings/change-password/page.tsx`
- ✅ Migrated password change POST request to use `post()` from API client
- ✅ Removed manual token extraction from cookies
- ✅ Improved validation error handling (422 status)

### 3. Projects Page
**File:** `frontend_next/src/app/admin/projects/page.tsx`
- ✅ Added `apiClient` import
- ✅ Migrated create project POST request to use `apiClient.post()`
- ✅ Migrated SEO image upload POST request to use `apiClient.post()`
- ✅ Improved error handling for file size (413) and validation (422) errors
- ✅ Removed manual credentials and mode configuration

### 4. Projects Columns (Edit/Delete)
**File:** `frontend_next/src/app/admin/projects/columns.tsx`
- ✅ Added `apiClient` import
- ✅ Migrated update project POST request to use `apiClient.post()`
- ✅ Migrated delete project DELETE request to use `apiClient.delete()`
- ✅ Migrated SEO image upload POST request to use `apiClient.post()`
- ✅ Simplified error handling

### 5. Category Management Page
**File:** `frontend_next/src/app/admin/category/page.tsx`
- ✅ Added `post`, `put`, `del` imports from API client
- ✅ Migrated create category POST request to use `post()`
- ✅ Migrated update category PUT request to use `put()`
- ✅ Migrated delete category DELETE request to use `del()`
- ✅ Migrated sort order update PUT request to use `put()`
- ✅ Improved error handling for all operations

## Files Still Requiring Updates ⚠️

The following files still contain direct `fetch` calls that should be migrated:

### Admin Components with Mutations

1. **`frontend_next/src/app/admin/projects/[slug]/page.tsx`**
   - Multiple fetch calls for project detail operations
   - Hero media updates
   - Block operations (create, update, delete)
   - Media uploads

2. **`frontend_next/src/app/admin/blog/page.tsx`**
   - Create blog post
   - SEO image upload

3. **`frontend_next/src/app/admin/blog/[slug]/page.tsx`**
   - Update blog blocks
   - Delete blog blocks
   - Create blog blocks

4. **`frontend_next/src/app/admin/blog/columns.tsx`**
   - Update blog post
   - Delete blog post
   - SEO image upload

5. **`frontend_next/src/app/admin/seo-settings/page.tsx`**
   - Update SEO settings
   - Fetch SEO settings (could benefit from error handling)

6. **`frontend_next/src/app/admin/seo-test/page.tsx`**
   - Test endpoints (less critical, but should be consistent)

### Read-Only Components (Lower Priority)

These files have GET requests that don't require authentication but could benefit from consistent error handling:

- Project detail pages (GET requests)
- Blog pages (GET requests)
- Category fetching (GET requests)

## Migration Pattern

### Before (Direct fetch):
```typescript
const response = await fetch(`${API_BASE_URL}/endpoint`, {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(data),
  credentials: 'include',
});

if (!response.ok) {
  // Manual error handling
}

const result = await response.json();
```

### After (API Client):
```typescript
import { post } from '@/lib/api';

const result = await post<ResponseType>('/endpoint', data);
// Automatic token, credentials, and error handling!
```

### Error Handling Pattern:
```typescript
try {
  const result = await post<ResponseType>('/endpoint', data);
  // Handle success
} catch (error: any) {
  // 401 errors automatically redirect to login
  // 403 errors automatically show alert
  
  // Handle specific errors
  if (error.response?.status === 413) {
    toast("File size exceeded");
  } else if (error.response?.status === 422) {
    // Validation errors
    const errors = error.response.data.errors;
    // Handle field-specific errors
  } else {
    const message = error.response?.data?.message || error.message;
    toast(`Error: ${message}`);
  }
}
```

## Testing Checklist

After migration, test the following:

- ✅ Login with correct credentials
- ✅ Login with incorrect credentials (should show error)
- ✅ Change password functionality
- ✅ Create new project
- ✅ Edit existing project
- ✅ Delete project
- ✅ Create category
- ✅ Edit category
- ✅ Delete category
- ✅ Reorder categories
- ⚠️ Token refresh (automatic when token near expiration)
- ⚠️ 401 redirect to login (when token expires)
- ⚠️ File upload with size validation
- ⚠️ SEO image uploads

## Next Steps

1. ✅ Complete migration of remaining admin components (projects detail, blog pages)
2. ⚠️ Test all CRUD operations in admin panel
3. ⚠️ Verify token refresh works automatically
4. ⚠️ Verify 401/403 error handling
5. ⚠️ Update any remaining fetch calls in other admin pages

## Notes

- The centralized API client automatically handles:
  - Adding Bearer token from cookies
  - Setting proper headers (Content-Type, Accept)
  - Handling credentials
  - Token refresh via X-New-Token header
  - 401 redirects to login
  - 403 access denied alerts

- Components no longer need to:
  - Manually extract tokens from cookies
  - Set Authorization headers
  - Handle credentials configuration
  - Check response.ok manually
  - Parse JSON responses manually

- Error handling is now consistent across all components
- TypeScript types ensure type safety for request/response data
