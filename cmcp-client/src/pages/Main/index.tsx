import { useForm } from "react-hook-form";
import { Grid, Paper, Container, Text } from "@mantine/core";

import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@src/schema/login.schema";

import add from "@src/assets/add.png";
import Login from "@src/components/Login";
import Fallback from "@src/components/Fallback";

import useAuth from "@src/hooks/useAuth";
import useStore from "@src/store";
import { PATH } from "@src/utils/path";

const Main: React.FC = () => {
  const store = useStore();

  const navigate = useNavigate();

  const { login } = useAuth();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: LoginSchema) => {
    await login.mutateAsync(values, {
      onSuccess: async ({ data }) => {
        const notifications = await import("@mantine/notifications");

        navigate(PATH.DASHBOARD, { replace: true });

        store.setSession({
          token: data.response.token,
          refreshToken: null,
        });

        notifications.showNotification({
          color: "green",
          message: "Welcome back!",
        });
      },
      onError: async () => {
        const notifications = await import("@mantine/notifications");

        notifications.showNotification({
          color: "red",
          message: "Wrong password or email",
        });
      },
    });
  };

  if (login.isPending) {
    return <Fallback />;
  }

  return (
    <Container size="lg" mt="md">
      <Grid gutter="xl" align="center">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Text size="lg" className="font-bold flex flex-row gap-4 items-center">
            Join now in the world of Digital E-Books with CMCP.{" "}
            <img alt="logo" loading="eager" src={add} />
          </Text>
          <div>
            <Login onSubmit={handleLogin} form={form} />
          </div>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }} >
          <Paper mt="md" >
            <div className="space-y-4 gap-2.5 flex flex-col text-emerald-50">
              <Text size="xl">
                📚 Visualize your digital library
              </Text>
              <Text size="lg">
                Seamlessly track, manage, and review all your books in one
                place.
              </Text>

              <Text size="xl">🔍 Audit every action</Text>
              <Text size="lg">
                Stay in control with a full audit trail of updates, deletions,
                and changes.
              </Text>

              <Text size="xl">📤 Export your logs</Text>
              <Text size="lg">
                Generate CSV files instantly to share or analyze your system
                activity.
              </Text>
            </div>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Main;
