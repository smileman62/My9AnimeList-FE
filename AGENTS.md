# AGENTS.md

## Project Overview

This repository contains the frontend application for **Life Anime Nine**.

Life Anime Nine is a taste-based community service where users can create, rank, and share their personal top 9 anime list.

The frontend is responsible for the following user experiences:

- Searching anime
- Selecting 9 anime titles
- Reordering the selected anime list
- Creating a post
- Browsing other users' anime lists
- Viewing post details
- Writing and reading comments
- Managing user-related pages such as login, signup, and my page

This repository only manages the frontend code.  
The backend will be managed in a separate repository.

---

## Tech Stack

The main frontend stack is:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- TanStack Query
- Zustand
- Axios

Planned libraries:

- dnd-kit
- React Hook Form
- Zod

---

## Project Structure

Use a feature-based project structure.

```txt
src/
├─ app/
│  ├─ page.tsx
│  ├─ login/
│  ├─ signup/
│  ├─ search/
│  ├─ posts/
│  │  ├─ page.tsx
│  │  ├─ new/
│  │  └─ [postId]/
│  └─ my/
│
├─ features/
│  ├─ auth/
│  ├─ anime/
│  ├─ post/
│  ├─ comment/
│  ├─ like/
│  └─ bookmark/
│
├─ shared/
│  ├─ api/
│  ├─ components/
│  ├─ constants/
│  ├─ hooks/
│  ├─ lib/
│  ├─ types/
│  └─ utils/
│
└─ stores/
```

---

## Folder Responsibilities

### `app`

The `app` directory contains route-level pages and layouts.

Page components should mainly handle:

- Page layout
- Data composition
- Feature component placement
- Route-level loading and error handling

Avoid placing complex business logic directly inside page components.

---

### `features`

The `features` directory contains domain-specific frontend logic.

Examples:

```txt
features/post/
├─ api/
├─ hooks/
├─ components/
├─ schemas/
├─ types/
└─ utils/
```

Each feature should manage its own API functions, query hooks, components, and types whenever possible.

---

### `shared`

The `shared` directory contains reusable code that can be used across multiple features.

Examples:

- Common UI components
- API client
- Constants
- Utility functions
- Shared hooks
- Shared types

Do not place feature-specific logic in `shared`.

---

### `stores`

The `stores` directory contains Zustand stores.

Use Zustand only for client-side state that is not directly managed by the server.

---

## Naming Conventions

Follow these naming rules consistently.

- Components: `PascalCase`
- Types and interfaces: `PascalCase`
- Variables and functions: `camelCase`
- Constants: `SNAKE_CASE`
- Folder names: `kebab-case`
- Route segment names: `kebab-case`
- Image files in `public`: `snake_case`
- Imported image variables: `PascalCase`

Example:

```ts
const MAX_ANIME_COUNT = 9;

type AnimeSearchResult = {
  id: number;
  title: string;
};

function addSelectedAnime() {}
```

---

## Core Domain Rules

The most important domain rule of this service is the **top 9 anime list**.

Always follow these rules:

- A post must contain exactly 9 anime items.
- Each anime item must have a unique `rankPosition` from 1 to 9.
- Duplicate anime selection is not allowed.
- Users cannot select more than 9 anime.
- Anime selection and ordering before post submission are client state.
- Created posts, comments, likes, bookmarks, and user information are server state.

These rules should be reflected in both UI behavior and request validation.

---

## State Management Rules

Use **TanStack Query** for server state.

Examples of server state:

- Current user
- Anime search results
- Post list
- Post detail
- Comment list
- Like status
- Bookmark status
- My page data

Use **Zustand** for client state.

Examples of client state:

- Selected anime list during post creation
- Anime order before submitting a post
- Temporary post creation state
- Global modal state when needed

Do not store server data in Zustand unless there is a clear reason.

---

## Authentication Rules

The backend is expected to use httpOnly cookie-based authentication.

Frontend rules:

- Do not store access tokens in `localStorage`.
- Do not store access tokens in Zustand.
- Use `withCredentials: true` for API requests.
- Use `/auth/me` to check the current login state.
- Manage the current user with TanStack Query.
- Protected pages should check authentication before allowing access.

Recommended query key:

```ts
['auth', 'me']
```

---

## API Client Rules

Use Axios through a shared API client.

```ts
// src/shared/api/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});
```

Do not hardcode backend URLs inside components.

Use environment variables instead.

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

---

## API Function Rules

Components should not directly call Axios.

Avoid this pattern:

```ts
useEffect(() => {
  axios.get('/posts');
}, []);
```

Prefer this structure:

```txt
features/post/
├─ api/
│  ├─ get-posts.ts
│  ├─ get-post-detail.ts
│  └─ create-post.ts
├─ hooks/
│  ├─ use-posts-query.ts
│  ├─ use-post-detail-query.ts
│  └─ use-create-post-mutation.ts
├─ components/
└─ types/
```

Components should use query or mutation hooks.

```ts
const { data, isLoading, isError } = usePostsQuery();
```

---

## Query Key Rules

Define query keys in a consistent and reusable way.

Example:

```ts
export const postQueryKeys = {
  all: ['posts'] as const,
  lists: () => [...postQueryKeys.all, 'list'] as const,
  list: (params: PostListParams) =>
    [...postQueryKeys.lists(), params] as const,
  detail: (postId: number) =>
    [...postQueryKeys.all, 'detail', postId] as const,
};
```

Do not use random string query keys directly inside components.

Avoid:

```ts
useQuery({
  queryKey: ['postList'],
  queryFn: getPosts,
});
```

Prefer:

```ts
useQuery({
  queryKey: postQueryKeys.list(params),
  queryFn: () => getPosts(params),
});
```

---

## Form Rules

Use React Hook Form and Zod for forms.

Forms that should use validation:

- Login form
- Signup form
- Post creation form
- Comment form
- Profile edit form

Validation schemas should be separated from components.

Example:

```txt
features/auth/
├─ schemas/
│  ├─ login-schema.ts
│  └─ signup-schema.ts
```

---

## UI Component Rules

Use reusable components for common UI.

Recommended shared components:

- Button
- Input
- Textarea
- Modal
- Spinner
- EmptyState
- ErrorMessage
- PostCard
- AnimeCard

Keep page components focused on layout and composition.

Move feature-specific UI into `features/*/components`.

---

## Styling Rules

Use Tailwind CSS as the primary styling method.

Guidelines:

- Prefer readable class names.
- Extract repeated UI patterns into reusable components.
- Keep spacing, radius, and shadow styles consistent.
- Avoid unnecessary global CSS.
- Use responsive layouts from the beginning.
- Avoid deeply nested class logic inside JSX when it reduces readability.

---

## Anime Search Rules

Anime search should support the following behavior:

- Search anime by keyword.
- Apply debounce before requesting search results.
- Show loading state while searching.
- Show empty state when no result exists.
- Prevent duplicate selection.
- Prevent selecting more than 9 anime.
- Store selected anime in Zustand.
- Allow users to remove selected anime before submission.

---

## Post Creation Rules

The post creation flow should follow this order:

1. Search anime.
2. Select anime.
3. Confirm exactly 9 selected anime.
4. Reorder selected anime with drag and drop.
5. Enter title and description.
6. Submit post.
7. Reset creation state after successful submission.
8. Navigate to the created post detail page or post list page.

Post creation should use a mutation hook.

```ts
const createPostMutation = useCreatePostMutation();
```

The request payload should include the selected anime list with `rankPosition`.

Example:

```ts
const payload = {
  title,
  content,
  animes: selectedAnimes.map((anime, index) => ({
    ...anime,
    rankPosition: index + 1,
  })),
};
```

---

## Error Handling Rules

Handle errors in a user-friendly way.

Use:

- Inline validation messages for form errors
- Toast messages for mutation success or failure
- Empty state for empty data
- Error state for failed queries
- Loading state for pending requests

Do not silently fail.

---

## Loading and Empty State Rules

Every server-state UI should consider the following states:

- Loading
- Error
- Empty
- Success

Example:

```tsx
if (isLoading) return <Spinner />;
if (isError) return <ErrorMessage />;
if (!data || data.length === 0) return <EmptyState />;
```

---

## MVP Scope

Prioritize these features first:

1. Main post feed
2. Anime search
3. Select 9 anime
4. Reorder selected anime
5. Create post
6. Post detail
7. Signup and login
8. Comment list
9. Comment creation
10. My page

The following features are not part of the initial MVP:

- Like
- Bookmark
- Follow
- Recommendation algorithm
- Notification
- OAuth login
- Share image generation

---

## Development Priorities

When implementing a feature, follow this order:

1. Define types.
2. Create mock data if the backend API is not ready.
3. Build UI components.
4. Create API request functions.
5. Create TanStack Query hooks.
6. Connect UI with real data.
7. Add loading, error, and empty states.
8. Refactor duplicated logic.

---

## Code Style

Prefer readable and explicit code.

Avoid:

- Overly large components
- Direct API calls inside components
- Unclear variable names
- Duplicated type definitions
- Business logic mixed inside JSX
- Unnecessary global state

Prefer:

- Small feature components
- Separated hooks
- Separated API functions
- Shared types
- Clear naming
- Type-safe implementations

---

## Commit Message Convention

Use conventional commit style.

Examples:

```txt
feat: add anime search page
feat: implement selected anime store
feat: add post creation form
fix: prevent duplicate anime selection
fix: prevent selecting more than nine anime
refactor: separate post query hooks
style: improve anime card layout
docs: update project convention
```

---

## Notes for AI Agents

When modifying this project:

- Follow the feature-based structure.
- Do not introduce unnecessary libraries.
- Do not change the architecture without a clear reason.
- Keep server state and client state separated.
- Preserve the top 9 anime domain rule.
- Prefer TypeScript-safe implementations.
- Keep components reusable and readable.
- Ask before changing the authentication strategy.
- Do not store authentication tokens on the frontend.
- Do not move feature-specific logic into `shared` without a clear reason.