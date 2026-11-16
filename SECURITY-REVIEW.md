# Authentication and Authorization Security Review

Review scope: backend authentication and authorization flow, including guards, role metadata, user routes, and password persistence. Findings below apply to the reviewed code state; endpoints require a valid access token where protected by the application’s access-token guard.

## Findings

| # | Severity | File | Lines | Vulnerability | Confidence |
|---|----------|------|-------|---------------|------------|
| 1 | 🟠 HIGH | `backend/src/app/user/user.controller.ts` | 28-55 | Authenticated callers can list users and update or delete arbitrary user IDs. The routes have no role metadata, the role guard allows routes without role metadata, and the controller/repository path does not enforce ownership or privilege checks. | 9/10 |
| 2 | 🟡 MEDIUM | `backend/src/app/user/user.controller.ts` | 22-25 | User creation persists the submitted password without hashing. The user repository saves the DTO directly, unlike the signup flow, which hashes passwords before persistence. | 9/10 |

## Recommended remediation

1. Restrict user enumeration and destructive user operations to authorized administrator roles. Enforce ownership checks for individual-user operations and restrict update fields to those the caller may modify.
2. Ensure every user-creation/password-write path hashes the password before persistence, preferably by using the existing signup/password-hashing flow.

## Scope note

`backend/src/app/auth/auth.module.ts` currently registers no controllers, so auth signup/login endpoints are not mounted through that module. This does not mitigate the findings on the mounted `/users` routes.
