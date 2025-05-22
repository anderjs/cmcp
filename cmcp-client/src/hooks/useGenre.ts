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
import { useQuery } from "@tanstack/react-query";
import { GenreQueryKey } from "@src/query";

import * as genreService from "@src/services/genre";

export default function useGenre() {
  const fetchGenre = useQuery({
    queryKey: [GenreQueryKey.GENRE],
    queryFn: async () => {
      return genreService.fetchGenre();
    },
  });

  return {
    fetchGenre,
  };
}
