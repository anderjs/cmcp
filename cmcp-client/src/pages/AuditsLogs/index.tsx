/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import { useCallback, useEffect, useMemo } from "react";
import { Box, Table, Text, LoadingOverlay, Button } from "@mantine/core";
import { Fade } from "react-awesome-reveal";
import { FaFileCsv } from "react-icons/fa";

import useAudit from "@src/hooks/useAudit";

import Loading from "@src/components/Loading";
import { paginate } from "@src/utils";
import { AuditQueryKey } from "@src/query";

import useQueryStore from "@src/store/query";
import usePagination from "@src/hooks/usePagination";
import { MdOutlineBook } from "react-icons/md";
import { loaderProps, overlayProps } from "@src/utils/props";
import { PATH } from "@src/utils/path";

const AuditLogs: React.FC = () => {
  const navigate = useNavigate();

  const { fetchLogs, exportCSV } = useAudit();

  const { page, limit } = usePagination();

  const { setAuditArgs } = useQueryStore();

  useEffect(() => {
    setAuditArgs(AuditQueryKey.LOGS, {
      page,
      limit,
    });

    fetchLogs.refetch();
  }, [page, limit]);

  const handleWatchLog = useCallback((id: number) => {
    navigate(`${PATH.AUDIT}/logs/${id}`);
  }, []);

  const handleExportCSV = async () => {
    const { notifications } = await import("@mantine/notifications");

    notifications.show({
      loading: true,
      color: "pink",
      message: "Exporting CSV..",
    });

    const csv = await exportCSV.refetch();

    if (csv.isSuccess) {
      notifications.clean();

      notifications.show({
        color: "green",
        message: "Audit logs CSV has been downloaded ✅",
      });
    }

    if (csv.isError) {
      notifications.clean();

      notifications.show({
        color: "red",
        message: "Export failed",
      });
    }
  };

  const logs = useMemo(() => paginate(fetchLogs), [fetchLogs.data]);

  return (
    <Fade delay={0.1}>
      <Box className="flex justify-end items-center gap-1.5" my="md">
        <Button
          color="gray"
          onClick={handleExportCSV}
          rightSection={<FaFileCsv size={24} className="text-emerald-200" />}
        >
          Export
        </Button>
      </Box>
      <Loading status={fetchLogs.isLoading} width={400}>
        <Box pos="relative">
          <LoadingOverlay
            zIndex={1000}
            loaderProps={loaderProps}
            overlayProps={overlayProps}
            visible={fetchLogs.isRefetching}
          />
          <Table
            mt="lg"
            withTableBorder
            highlightOnHover
            withColumnBorders
            striped
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Action</Table.Th>
                <Table.Th>User</Table.Th>
                <Table.Th>Entity</Table.Th>
                <Table.Th>Date</Table.Th>
                <Table.Th>Metadata</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {logs?.data?.map((log) => (
                <Table.Tr key={log.id}>
                  <Table.Td className="capitalize text-base">
                    {log.action}
                  </Table.Td>
                  <Table.Td>{log.user.name}</Table.Td>
                  <Table.Td>{log.entity}</Table.Td>
                  <Table.Td className="font-bold text-gray-300">
                    {dayjs(log.createdAt).format("DD/MM/YYYY HH:mm a")}
                  </Table.Td>
                  <Table.Td>
                    <Button
                      size="xs"
                      color="green"
                      onClick={() => handleWatchLog(log.id)}
                    >
                      <MdOutlineBook />
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
          {logs?.data?.length === 0 && (
            <Text mt="xl" className="text-center text-white" size="lg">
              No logs available
            </Text>
          )}
        </Box>
      </Loading>
    </Fade>
  );
};

export default AuditLogs;
