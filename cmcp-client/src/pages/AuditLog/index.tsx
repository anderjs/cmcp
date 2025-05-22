/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import { Box, Button, Card, Code } from "@mantine/core";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";

import useAudit from "@src/hooks/useAudit";
import useQueryStore from "@src/store/query";

import Loading from "@src/components/Loading";

import { AuditQueryKey } from "@src/query";
import { getQueryData } from "@src/utils";
import { PATH } from "@src/utils/path";
import { FaCode } from "react-icons/fa";

const AuditLog: React.FC = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { fetchLogAudit } = useAudit();

  const { setAuditArgs } = useQueryStore();

  useEffect(() => {
    if (id) {
      setAuditArgs(AuditQueryKey.AUDIT, { id });

      fetchLogAudit.refetch();
    }
  }, [id]);

  const handleSeeLogs = () => {
    navigate(`${PATH.AUDIT}/logs`);
  }

  const log = useMemo(() => getQueryData(fetchLogAudit), [fetchLogAudit.data]);

  return (
    <Box p="lg">
      <Loading status={fetchLogAudit.isLoading}>
        <div className="flex justify-center w-[30%]">
          {log && (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section className="text-emerald-200 uppercase" p="md">
                <span className="font-bold ">User</span> {log?.user?.name}
              </Card.Section>
              <Card.Section className="text-emerald-200 uppercase" p="md">
                <span className="font-bold">Action</span> {log?.type}
              </Card.Section>
              <Card.Section className="text-red-300" p="md">
                Metadata
                <Code block>{log?.metadata}</Code>
              </Card.Section>
              <Card.Section p="md" className="text-amber-300">
                <span className="font-bold">Date:</span>{" "}
                {dayjs(log?.createdAt).format("DD/MM/YYYY HH:mm a")}
              </Card.Section>
              <Card.Section p="xs">
                <Button color="gray" rightSection={<FaCode />} onClick={handleSeeLogs}>
                  See more logs
                </Button>
              </Card.Section>
            </Card>
          )}
        </div>
      </Loading>
    </Box>
  );
};

export default AuditLog;
