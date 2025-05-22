/**
 * Custom React hook for handling authentication logic.
 *
 * Provides a `login` mutation using React Query's `useMutation` hook,
 * which wraps the `loginService` function. The mutation can be used to
 * perform user login operations and manage their state (loading, error, etc.).
 *
 * @returns An object containing the `login` mutation.
 *
 * @example
 * const { login } = useAuth();
 * login.mutate({ username: 'user', password: 'pass' });
 */
import { AuthQueyKey } from "@src/query";
import { useMutation } from "@tanstack/react-query";

import { loginService } from "@src/services/auth";

export default function useAuth() {
  const login = useMutation({
    mutationKey: [AuthQueyKey.Login],
    mutationFn: async (data: Parameters<typeof loginService>[0]) => {
      return loginService(data);
    },
  });

  return {
    login,
  }
}
