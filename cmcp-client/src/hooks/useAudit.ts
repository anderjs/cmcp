import { useQuery } from "@tanstack/react-query";
import { AuditQueryKey } from "@src/query";

import * as auditService from "@src/services/audit";
import useQueryStore from "@src/store/query";

export default function useAudit() {
  const fetchLogs = useQuery({
    queryKey: [AuditQueryKey.LOGS],
    queryFn: async () => {
      const { logs } = useQueryStore.getState();

      const { page, limit } = logs[AuditQueryKey.LOGS];

      return auditService.fetchAuditLogs(page as number, limit as number);
    },
  });

  const fetchLog = useQuery({
    queryKey: [AuditQueryKey.LOG],
    queryFn: async () => {
      const { logs } = useQueryStore.getState();

      const { id } = logs[AuditQueryKey.LOG];

      return auditService.fetchAudit(id as string);
    },
  });

  const fetchLogAudit = useQuery({
    queryKey: [AuditQueryKey.AUDIT],
    queryFn: async () => {
      const { logs } = useQueryStore.getState();

      const { id } = logs[AuditQueryKey.AUDIT];

      return auditService.fetchAuditLog(id as string);
    },
  });


  const exportCSV = useQuery({
    queryKey: [AuditQueryKey.CSV],
    queryFn: async () => {
      return auditService.exportCSV();
    },
  });

  return {
    fetchLog,
    fetchLogs,
    exportCSV,
    fetchLogAudit,
  };
}
