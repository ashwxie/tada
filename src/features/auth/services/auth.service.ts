import { LoginInput, AuthResponse } from "../types/auth.types";

export async function login(data: LoginInput): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    token: "mock-token-xyz-123",
    user: {
      id: 1,
      name: "Ash",
      email: data.email,
    },
  };
}