import React, { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDisclosure } from "@mantine/hooks";
import {
  Tabs,
  Box,
  Text,
  Menu,
  Group,
  Burger,
  Avatar,
  AppShell,
  UnstyledButton,
  type AppShellProps,
} from "@mantine/core";
import Books from "@src/assets/information.png";
import { MdDashboard, MdAssignment } from "react-icons/md";

import useStore from "@src/store";
import { FaSignOutAlt } from "react-icons/fa";
import { PATH } from "@src/utils/path";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const store = useStore();

  const location = useLocation();

  const navigate = useNavigate();

  const [opened, burger] = useDisclosure();

  const navbar = useMemo(
    () => ({
      width: 0,
      breakpoint: "sm",
      collapsed: { mobile: !opened },
    }),
    [opened]
  );

  const handleSignOut = () => {
    store.clear();

    navigate("/", { replace: true });
  };

  const active = useMemo(() => {
    if (location.pathname.includes(PATH.DASHBOARD)) {
      return "Dashboard";
    }

    if (location.pathname.includes(PATH.AUDIT)) {
      return "Audit";
    }
  }, [location.pathname]);

  
  const handleNavigateTab = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  return (
    <>
      <AppShell header={header} navbar={navbar} padding="md">
        <AppShell.Header className="flex items-center justify-between">
          <Burger
            size="sm"
            opened={opened}
            onClick={burger.toggle}
            hiddenFrom="sm"
          />
          <Box ml="lg" py="md" mt="sm">
            <UnstyledButton>
              <img alt="logo" src={Books} loading="lazy" />
            </UnstyledButton>
          </Box>
          <Group mr="lg" align="center" justify="end" gap="sm">
            {store.isLoggedIn && (
              <Menu shadow="md" width={140}>
                <Menu.Target>
                  <Avatar
                    color="initials"
                    className="hover:cursor-pointer"
                    name={store.user?.email}
                    allowedInitialsColors={["green"]}
                  />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>CMCP</Menu.Label>
                  <Menu.Item
                    color="red"
                    leftSection={<FaSignOutAlt />}
                    rightSection={<Text size="xs">Sign Out</Text>}
                    onClick={handleSignOut}
                  />
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
        </AppShell.Header>
        <AppShell.Main className="p-5">
          {store.isLoggedIn && (
            <Tabs value={active}>
              <Tabs.List>
                <Tabs.Tab
                  color="green"
                  value="Dashboard"
                  onClick={() => handleNavigateTab(PATH.DASHBOARD)}
                  rightSection={<MdDashboard className="text-emerald-300" />}
                >
                  <p className="font-medium text-sm text-gray-100">Dashboard</p>
                </Tabs.Tab>
                <Tabs.Tab
                  color="green"
                  value="Audit"
                  onClick={() => handleNavigateTab(`${PATH.AUDIT}/logs`)}
                  rightSection={<MdAssignment className="text-emerald-300" />}
                >
                  <p className="font-medium text-sm text-gray-100">Audit</p>
                </Tabs.Tab>
              </Tabs.List>
            </Tabs>
          )}
          {children}
        </AppShell.Main>
      </AppShell>
    </>
  );
};

const header: AppShellProps["header"] = {
  height: 60,
};

export default Layout;
