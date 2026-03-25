# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server (port 3001)
npm run lint      # Run ESLint
```

No test runner is configured.

## Architecture Overview

Mobile-first Next.js 15 app (App Router) for product recall safety information. Fixed viewport width of 300px (`w-93.75`).

### Data Flow

```
UI Components → Custom Hooks (React Query) → Service Layer → Axios (withCredentials)
                                                                    ↓
                                                         Backend API (cookie auth)
Global State: Zustand (user, unread count)
Real-time: SSE (useSse) + Firebase FCM (useFcmToken)
```

### Key Layers

**Service Layer** (`services/`) — Plain objects exporting async methods wrapping axios calls. One file per domain: `authService.ts`, `recallService.ts`, `notificationService.ts`, `openaiService.ts`.

**Hooks** (`hooks/`) — React Query wrappers over services. `useQuery` for reads, `useMutation` for writes, `useInfiniteQuery` for paginated activity. Side-effect hooks: `useAuth` (fetches current user on startup), `useSse` (SSE connection), `useFcmToken` (registers FCM token).

**Stores** (`store/`) — Minimal Zustand stores: `authStore.ts` (`user/setUser/clearUser`) and `notificationStore.ts` (`unreadCount` + increment/decrement/reset).

**Axios Instance** (`lib/axios.ts`) — Single instance with `baseURL` and `withCredentials: true`. Response interceptor auto-refreshes on 401, queues in-flight requests during refresh, clears user state on refresh failure.

### Routing

```
app/
├── (hasTabBar)/           # Route group with persistent TabBar
│   ├── page.tsx           # Home
│   ├── recall/            # Recall list, [recallSn] detail, chatbot-search
│   ├── activity/          # Search/view/image history
│   └── setting/           # Settings + notification preferences
├── auth/kakao/callback/   # Kakao OAuth redirect handler
└── chat/                  # Chat interface
```

### Auth

Kakao OAuth with cookie-based session. `useLogin()` builds the OAuth URL, preserving the current pathname as `state` for post-login redirect. `AuthProvider` wraps the app and runs `useAuth()` on mount to hydrate the Zustand store.

### Notification System

Two delivery paths:
1. **SSE** (`useSse`) — Foreground real-time updates shown as toasts (Sonner)
2. **FCM** (`useFcmToken`, `lib/firebase.ts`) — Background push notifications

`FcmProvider` initializes both on user login.

### Component Patterns

- Server Components by default; `"use client"` only on interactive components
- `SuspenseWithErrorBoundary` wraps async data boundaries
- `LoginFallback` gates protected routes
- shadcn/ui components (New York style) + Lucide icons + Tailwind CSS v4

### Environment Variables

Required in `.env`:
- `NEXT_PUBLIC_KAKAO_CLIENT_ID`, `NEXT_PUBLIC_KAKAO_REDIRECT_URI`
- `NEXT_PUBLIC_BASE_URL` — Backend API base URL
- Firebase config: `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`, `NEXT_PUBLIC_FIREBASE_APP_ID`, `NEXT_PUBLIC_FIREBASE_VAPID_KEY`
