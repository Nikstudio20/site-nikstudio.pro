# Quick Test Guide - Task 23: Sidebar Display After Login

## 🚀 Quick Start

### 1. Start Servers

**Terminal 1 - Backend:**
```bash
cd backend_laravel
php artisan serve
```

**Terminal 2 - Frontend:**
```bash
cd frontend_next
npm run dev
```

### 2. Run Tests

**Terminal 3 - Tests:**
```bash
cd frontend_next
npx playwright test admin-sidebar-display.spec.ts --project=chromium
```

---

## 📋 Manual Testing Checklist

### Quick Checks (5 minutes)

1. **Login & Sidebar Visibility**
   - [ ] Go to `http://localhost:3000/admin/login`
   - [ ] Login with admin credentials
   - [ ] Verify sidebar is visible after login

2. **Menu Navigation**
   - [ ] Click "Проекты" → Should go to `/admin/projects`
   - [ ] Click "Блог" → Should go to `/admin/blog`
   - [ ] Click "Сменить пароль" → Should go to `/admin/settings/change-password`

3. **Active State**
   - [ ] On `/admin/projects`, "Проекты" should be red (#DE063A)
   - [ ] On `/admin/blog`, "Блог" should be red (#DE063A)

4. **Logout**
   - [ ] Click "Выйти" button in sidebar
   - [ ] Should redirect to `/admin/login`
   - [ ] Sidebar should be hidden on login page

---

## 🧪 Test Commands

### Run all sidebar tests
```bash
npx playwright test admin-sidebar-display.spec.ts --project=chromium
```

### Run with visible browser
```bash
npx playwright test admin-sidebar-display.spec.ts --project=chromium --headed
```

### Run with UI mode
```bash
npx playwright test admin-sidebar-display.spec.ts --project=chromium --ui
```

### Run specific test
```bash
npx playwright test admin-sidebar-display.spec.ts -g "Sub-task 1" --project=chromium
```

### Run and show report
```bash
npx playwright test admin-sidebar-display.spec.ts --project=chromium
npx playwright show-report
```

---

## ✅ Expected Results

### All Tests Should Pass:
- ✅ Sub-task 1: Sidebar visibility after login
- ✅ Sub-task 2: All menu items work (7/7)
- ✅ Sub-task 3: Active menu highlighting
- ✅ Sub-task 4: Logout button functionality
- ✅ Integration: Complete workflow
- ✅ Responsive: Toggle functionality
- ✅ Visual: Styling and branding

---

## 🐛 Troubleshooting

### Tests fail with "Executable doesn't exist"
```bash
npx playwright install chromium
```

### Backend connection refused
- Make sure Laravel is running on `http://localhost:8000`
- Check `.env` file in `backend_laravel`

### Frontend not loading
- Make sure Next.js is running on `http://localhost:3000`
- Try `npm install` if dependencies are missing

### Login fails in tests
- Check admin credentials in test file
- Default: `admin@example.com` / `password`
- Update in test file if different

---

## 📚 Full Documentation

For detailed testing guide, see: `TASK-23-SIDEBAR-TESTING-GUIDE.md`
For completion summary, see: `TASK-23-COMPLETION-SUMMARY.md`

---

**Quick Status Check:**
```bash
# Check if servers are running
curl http://localhost:8000/api/health  # Backend
curl http://localhost:3000              # Frontend
```
