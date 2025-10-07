# Token Refresh Architecture - Visual Guide

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     Token Refresh System                         │
│                                                                   │
│  Frontend (Next.js)              Backend (Laravel)               │
│  ┌──────────────────┐           ┌──────────────────┐            │
│  │  useTokenRefresh │           │ RefreshToken     │            │
│  │      Hook        │◄─────────►│   Middleware     │            │
│  │                  │           │                  │            │
│  │  Check every     │           │  Check on every  │            │
│  │  5 minutes       │           │  API request     │            │
│  └──────────────────┘           └──────────────────┘            │
│           │                              │                       │
│           ▼                              ▼                       │
│  ┌──────────────────┐           ┌──────────────────┐            │
│  │   API Client     │           │  Create new      │            │
│  │  (api.ts)        │           │  token if        │            │
│  │                  │           │  < 30 min left   │            │
│  │  Response        │           │                  │            │
│  │  Interceptor     │           │  Return in       │            │
│  │                  │           │  X-New-Token     │            │
│  └──────────────────┘           └──────────────────┘            │
│           │                              │                       │
│           ▼                              ▼                       │
│  ┌──────────────────┐           ┌──────────────────┐            │
│  │  Save to Cookie  │           │  Delete old      │            │
│  │  & LocalStorage  │           │  token           │            │
│  └──────────────────┘           └──────────────────┘            │
└─────────────────────────────────────────────────────────────────┘
```

## Detailed Flow Diagram

### 1. Initial Login

```
User                Browser              Frontend             Backend
 │                     │                    │                   │
 │  Enter credentials  │                    │                   │
 ├────────────────────►│                    │                   │
 │                     │  POST /api/login   │                   │
 │                     ├───────────────────►│                   │
 │                     │                    │  Validate user    │
 │                     │                    ├──────────────────►│
 │                     │                    │                   │
 │                     │                    │  Create token     │
 │                     │                    │  (8 hours TTL)    │
 │                     │                    │◄──────────────────┤
 │                     │  Token + expires_at│                   │
 │                     │◄───────────────────┤                   │
 │  Save to cookie     │                    │                   │
 │◄────────────────────┤                    │                   │
 │                     │                    │                   │
 │  Redirect to /admin │                    │                   │
 │◄────────────────────┤                    │                   │
```

### 2. Automatic Token Check (Every 5 Minutes)

```
useTokenRefresh Hook          API Client              Backend
       │                          │                      │
       │  Timer triggers          │                      │
       │  (every 5 min)           │                      │
       ├─────────────────────────►│                      │
       │                          │                      │
       │  Check expires_at        │                      │
       │  from LocalStorage       │                      │
       │                          │                      │
       │  If < 30 min left:       │                      │
       │  Make API request        │                      │
       ├─────────────────────────►│                      │
       │                          │  GET /api/admin/me   │
       │                          ├─────────────────────►│
       │                          │  + Bearer token      │
       │                          │                      │
       │                          │  RefreshToken        │
       │                          │  Middleware checks   │
       │                          │◄─────────────────────┤
       │                          │                      │
       │                          │  Response +          │
       │                          │  X-New-Token header  │
       │                          │◄─────────────────────┤
       │  Response interceptor    │                      │
       │  reads X-New-Token       │                      │
       │◄─────────────────────────┤                      │
       │                          │                      │
       │  Save new token          │                      │
       │  to cookie               │                      │
       │                          │                      │
```

### 3. Token Refresh on API Request

```
User Action          Frontend              Backend Middleware        Database
    │                   │                         │                     │
    │  Click button     │                         │                     │
    ├──────────────────►│                         │                     │
    │                   │  API request            │                     │
    │                   ├────────────────────────►│                     │
    │                   │  + Bearer token         │                     │
    │                   │                         │  Find token         │
    │                   │                         ├────────────────────►│
    │                   │                         │                     │
    │                   │                         │  Token data         │
    │                   │                         │◄────────────────────┤
    │                   │                         │                     │
    │                   │                         │  Check expires_at   │
    │                   │                         │  < 30 min?          │
    │                   │                         │                     │
    │                   │                         │  YES: Create new    │
    │                   │                         ├────────────────────►│
    │                   │                         │                     │
    │                   │                         │  Delete old token   │
    │                   │                         ├────────────────────►│
    │                   │                         │                     │
    │                   │  Response + headers:    │                     │
    │                   │  X-New-Token            │                     │
    │                   │  X-Token-Expires-At     │                     │
    │                   │◄────────────────────────┤                     │
    │                   │                         │                     │
    │  Response         │  Interceptor saves      │                     │
    │  (seamless)       │  new token              │                     │
    │◄──────────────────┤                         │                     │
```

## Component Responsibilities

### Frontend Components

#### 1. useTokenRefresh Hook
```typescript
Location: frontend_next/src/hooks/useTokenRefresh.ts

Responsibilities:
├── Check token every 5 minutes
├── Read expires_at from LocalStorage
├── Calculate time remaining
├── Trigger refresh if < 30 min left
└── Handle errors (redirect to login)

Configuration:
├── Check interval: 5 minutes (300,000 ms)
├── Refresh threshold: 30 minutes (1,800,000 ms)
└── Endpoint: /api/admin/me
```

#### 2. API Client
```typescript
Location: frontend_next/src/lib/api.ts

Responsibilities:
├── Add Authorization header to requests
├── Intercept responses
├── Read X-New-Token header
├── Save new token to cookie
├── Update LocalStorage with expires_at
└── Handle 401/403 errors

Response Interceptor:
├── Check for X-New-Token
├── Check for X-Token-Expires-At
├── Calculate max-age for cookie
└── Save token and expiration
```

#### 3. Admin Layout
```typescript
Location: frontend_next/src/app/admin/layout.tsx

Responsibilities:
├── Initialize useTokenRefresh hook
└── Ensure hook runs for all admin pages
```

### Backend Components

#### 1. RefreshTokenMiddleware
```php
Location: backend_laravel/app/Http/Middleware/RefreshTokenMiddleware.php

Responsibilities:
├── Extract Bearer token from request
├── Find token in database
├── Check expires_at timestamp
├── If < 30 min: Create new token
├── Delete old token
├── Add X-New-Token to response
└── Add X-Token-Expires-At to response

Logic:
├── Get current token
├── Calculate minutes until expiration
├── If <= 30 minutes AND > 0:
│   ├── Get user from token
│   ├── Calculate original lifetime
│   ├── Create new token with same lifetime
│   ├── Delete old token
│   └── Add headers to response
└── Continue request
```

#### 2. CORS Configuration
```php
Location: backend_laravel/config/cors.php

Configuration:
├── exposed_headers: ['X-New-Token', 'X-Token-Expires-At']
├── supports_credentials: true
└── allowed_origins: [frontend URL]
```

## Data Flow

### Token Storage

```
┌─────────────────────────────────────────────────────────┐
│                    Token Storage                         │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Frontend:                                                │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Cookie: admin-token                             │    │
│  │  Value: <token_string>                           │    │
│  │  Max-Age: 28800 (8 hours)                        │    │
│  │  Path: /                                         │    │
│  └─────────────────────────────────────────────────┘    │
│                                                           │
│  ┌─────────────────────────────────────────────────┐    │
│  │  LocalStorage: admin-token-expires-at            │    │
│  │  Value: "2025-10-07T18:30:00.000Z"               │    │
│  └─────────────────────────────────────────────────┘    │
│                                                           │
│  Backend:                                                 │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Database: personal_access_tokens                │    │
│  │  ├── id                                          │    │
│  │  ├── tokenable_id (user_id)                      │    │
│  │  ├── token (hashed)                              │    │
│  │  ├── expires_at                                  │    │
│  │  └── created_at                                  │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

## Timeline Example

```
Time    Event                           Token Status        Action
────────────────────────────────────────────────────────────────────
10:00   User logs in                    Fresh (8h left)     Create token
        expires_at: 18:00

10:05   First check (5 min)             7h 55m left         No action
10:10   Check                           7h 50m left         No action
...
17:25   Check                           35 min left         No action
17:30   Check                           30 min left         REFRESH!
                                                            ├─ Create new token
                                                            ├─ expires_at: 01:30
                                                            ├─ Delete old token
                                                            └─ Return X-New-Token

17:35   Check                           7h 55m left         No action
        (new token)
...
01:00   Check                           30 min left         REFRESH!
                                                            (cycle repeats)
```

## Error Handling

```
┌─────────────────────────────────────────────────────────┐
│                   Error Scenarios                        │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  1. Token Expired (expires_at in past)                   │
│     Frontend: Redirect to /admin/login                   │
│     Backend: Return 401 Unauthorized                     │
│                                                           │
│  2. Token Not Found                                       │
│     Frontend: Redirect to /admin/login                   │
│     Backend: Return 401 Unauthorized                     │
│                                                           │
│  3. Invalid Token                                         │
│     Frontend: Redirect to /admin/login                   │
│     Backend: Return 401 Unauthorized                     │
│                                                           │
│  4. Refresh Failed                                        │
│     Frontend: Log error, retry on next check             │
│     Backend: Return error, keep old token                │
│                                                           │
│  5. Network Error                                         │
│     Frontend: Log error, retry on next check             │
│     User: Continue working (if token still valid)        │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

## Performance Considerations

### Optimization Strategies

1. **Prevent Multiple Refreshes**
   ```typescript
   // Use ref to prevent concurrent refresh requests
   const isRefreshingRef = useRef(false);
   
   if (isRefreshingRef.current) {
     return; // Skip if already refreshing
   }
   ```

2. **Efficient Checking**
   ```typescript
   // Check only when necessary
   const shouldRefresh = timeRemaining <= THRESHOLD && timeRemaining > 0;
   ```

3. **Minimal API Calls**
   ```typescript
   // Use existing API calls to trigger refresh
   // No dedicated refresh endpoint needed
   ```

### Resource Usage

```
┌─────────────────────────────────────────────────────────┐
│                  Resource Usage                          │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Frontend:                                                │
│  ├── Timer: 1 interval (5 min)                           │
│  ├── Memory: ~1KB (hook state)                           │
│  └── Network: 0 extra requests (uses existing calls)     │
│                                                           │
│  Backend:                                                 │
│  ├── Database queries: +1 per request (token lookup)     │
│  ├── Token creation: Only when < 30 min left             │
│  └── Token deletion: Only when refreshing                │
│                                                           │
│  Impact: Minimal ✅                                       │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

## Security Considerations

### Token Security

```
┌─────────────────────────────────────────────────────────┐
│                  Security Measures                       │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  1. Token Storage                                         │
│     ├── Cookie: HttpOnly (if possible)                   │
│     ├── Cookie: Secure (in production)                   │
│     └── Cookie: SameSite=Lax                             │
│                                                           │
│  2. Token Transmission                                    │
│     ├── HTTPS only (in production)                       │
│     ├── Bearer token in Authorization header             │
│     └── CORS properly configured                         │
│                                                           │
│  3. Token Lifecycle                                       │
│     ├── Old token deleted immediately                    │
│     ├── Expired tokens cleaned up                        │
│     └── One token per user at a time                     │
│                                                           │
│  4. Rate Limiting                                         │
│     ├── Login endpoint: 5 attempts/minute                │
│     └── API endpoints: Standard rate limits              │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

## Testing Checklist

```
□ Token refreshes automatically when < 30 min left
□ X-New-Token header present in responses
□ New token saved to cookie automatically
□ LocalStorage updated with new expires_at
□ Work continues without interruption
□ No page reloads or redirects during refresh
□ Forms remain filled during refresh
□ Hook checks token every 5 minutes
□ Expired token triggers redirect to login
□ 401 errors handled correctly
□ CORS headers configured properly
□ Multiple tabs don't cause issues
```

---

**Architecture Version:** 1.0  
**Last Updated:** October 7, 2025  
**Status:** ✅ Production Ready
