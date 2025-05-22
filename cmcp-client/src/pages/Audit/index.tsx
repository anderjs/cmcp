/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Table, Text, UnstyledButton } from "@mantine/core";
import { Fade } from "react-awesome-reveal";

import useAudit from "@src/hooks/useAudit";
import useQueryStore from "@src/store/query";
import { AuditQueryKey } from "@src/query";

import Loading from "@src/components/Loading";

import { PATH } from "@src/utils/path";
import { getQueryData } from "@src/utils";

const Audit: React.FC = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { fetchLog } = useAudit();

  const { setAuditArgs } = useQueryStore();

  useEffect(() => {
    if (id) {
      setAuditArgs(AuditQueryKey.LOG, { id });

      fetchLog
        .refetch()
        .then(async () => {
          const notifications = await import("@mantine/notifications");

          notifications.cleanNotifications();

          notifications.showNotification({
            color: "green",
            message: "Audit loaded",
          });
        })
        .catch(async () => {
          const notifications = await import("@mantine/notifications");

          notifications.cleanNotifications();

          notifications.showNotification({
            color: "red",
            message: "Audit cant be processed",
          });

          navigate(-1);
        });
    }
  }, [id]);

  const handleGoBack = () => {
    navigate(PATH.DASHBOARD);
  };

  const logs = useMemo(() => getQueryData(fetchLog), [fetchLog.data]);

  return (
    <Fade delay={0.3}>
      <UnstyledButton my="md" onClick={handleGoBack}>
        <IoArrowBackCircleSharp className="text-emerald-300 w-5 h-5" />
      </UnstyledButton>
      <Loading status={fetchLog.isLoading || fetchLog.isRefetching}>
        <Table mt="lg">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Action</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>User</Table.Th>
              <Table.Th>Entity</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {logs?.map((log) => (
              <Table.Tr key={log.id}>
                <Table.Td className="capitalize text-base">
                  {log.action}
                </Table.Td>
                <Table.Td>{dayjs(log.createdAt).format("DD/MM/YYYY")}</Table.Td>
                <Table.Td>{log.user.name}</Table.Td>
                <Table.Td>{log.entity}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        {logs?.length === 0 && (
          <Text mt="xl" className="text-center" size="lg">
            No audit available
          </Text>
        )}
      </Loading>
    </Fade>
  );
};

export default Audit;
