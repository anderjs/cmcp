import { useQuery } from "@tanstack/react-query";
import { PublisherQueryKey } from "@src/query";

import * as publisherService from "@src/services/publisher";

export default function usePublishers() {
  const fetchPublishers = useQuery({
    queryKey: [PublisherQueryKey.PUBLISHER],
    queryFn: async () => {
      return publisherService.fetchPublishers();
    },
  });

  return {
    fetchPublishers,
  };
}
