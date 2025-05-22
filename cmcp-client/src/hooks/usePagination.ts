import { useCallback, useState } from "react";

export default function usePagination() {
  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(1);

  const setPageCallback = useCallback((page: number) => setPage(page), []);
  const setLimitCallback = useCallback((limit: number) => setLimit(limit), []);

  return {
    page,
    limit,
    setPage: setPageCallback,
    setLimit: setLimitCallback,
  };
}
