/* eslint-disable react-hooks/exhaustive-deps */
import { lazy, useCallback, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import router from "./router";
import useStore from "./store";

import useGenre from "./hooks/useGenre";
import useAuthors from "./hooks/useAuthors";
import usePublishers from "./hooks/usePublishers";

const Layout = lazy(() => import("./layout"));

function App() {
  const { isLoggedIn } = useStore();

  const { fetchGenre } = useGenre();

  const { fetchAuthors } = useAuthors();

  const { fetchPublishers } = usePublishers();

  const sync = useCallback(async () => {
    await Promise.all([
      fetchGenre.refetch(),
      fetchAuthors.refetch(),
      fetchPublishers.refetch(),
    ]);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      sync();
    }
  }, [isLoggedIn]);

  return (
    <MantineProvider defaultColorScheme="dark">
      <BrowserRouter>
        <Layout>
          <Routes>
            {router.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Layout>
      </BrowserRouter>
      <Notifications />
    </MantineProvider>
  );
}

export default App;
