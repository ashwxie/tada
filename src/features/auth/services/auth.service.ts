import { LoginInput } from "../types/auth.types";

export async function login(data: LoginInput) {
  // Mocking API delay
  await new Promise((r) => setTimeout(r, 800));

  const mockData = {
    token: "valid-session-token-qwer-1234",
    user: { id: 1, name: "Ash", email: data.email },
  };

  // ✅ Set the cookie so Middleware can see it
  // In production, use 'httpOnly: true' via an actual Set-Cookie header from the server
  document.cookie = `auth-token=${mockData.token}; path=/; max-age=86400; SameSite=Lax`;

  return mockData;
}

export function logout() {
  // ✅ Clear the cookie
  document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}