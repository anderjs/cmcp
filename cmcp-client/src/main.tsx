import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import App from "./App.tsx";
import Fallback from "./components/Fallback/index.tsx";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      enabled: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<Fallback />}>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </Suspense>
  </StrictMode>
);
