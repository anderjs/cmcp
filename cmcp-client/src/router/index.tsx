import { lazy } from "react";
import { PATH } from "@src/utils/path";
import type { RouteObject } from "react-router";

const Guard = lazy(() => import("../pages"));
const Main = lazy(() => import("../pages/Main"));
const Audit = lazy(() => import("../pages/Audit"));
const AuditLog = lazy(() => import("../pages/AuditLog"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const AuditLogs = lazy(() => import("../pages/AuditsLogs"));
const Protected = lazy(() => import("../components/Protected"));


const router: RouteObject[] = [
  {
    path: PATH.MAIN,
    element: (
      <Guard>
        <Main />
      </Guard>
    )
  },
  {
    path: PATH.DASHBOARD,
    element: (
      <Protected>
        <Dashboard />
      </Protected>
    )
  },
  {
    path: `${PATH.AUDIT}/logs`,
    element: (
      <Protected>
        <AuditLogs />
      </Protected>
    )
  },
  {
    path: `${PATH.AUDIT}/logs/:id`,
    element: (
      <Protected>
        <AuditLog/>
      </Protected>
    ),
  },
  {
    path: `${PATH.AUDIT}/:id`,
    element: (
      <Protected>
        <Audit />
      </Protected>
    ),
  },
];

export default router;