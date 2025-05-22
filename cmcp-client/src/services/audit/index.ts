import type { IFetch, AuditLog, IFetchPagination } from "@src/types/common";
import httpClient from "@src/utils/http";

export const fetchAudit = (id: string) => {
  return httpClient.get<IFetch<AuditLog[]>>(`/api/v1/audit/${id}`);
};

export const exportCSV = async () => {
  const res = await httpClient.get("/api/v1/audit/export", {
    responseType: "blob",
  });

  const blob = new Blob([res.data], { type: "text/csv" });

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = "audit_logs.csv";

  document.body.appendChild(a);

  a.click();

  a.remove();

  return true;
};

export const fetchAuditLog = (id: string) => {
  return httpClient.get<IFetch<AuditLog>>(`/api/v1/audit/logs/${id}`, {
    params: {
      id,
    },
  });
};

export const fetchAuditLogs = (page: number, limit: number) => {
  return httpClient.get<IFetchPagination<AuditLog[]>>("/api/v1/audit/logs", {
    params: {
      page,
      limit,
    },
  });
};
