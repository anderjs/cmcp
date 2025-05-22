import { useQuery } from "@tanstack/react-query";
import { AuthorsQueryKey } from "@src/query";

import * as authorService from "@src/services/authors";

export default function useAuthors() {
  const fetchAuthors = useQuery({
    queryKey: [AuthorsQueryKey.AUTHORS],
    queryFn: async () => {
      return authorService.fetchAuthors();
    },
  });

  return {
    fetchAuthors,
  };
}
