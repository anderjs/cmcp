import React, { type PropsWithChildren } from "react";

const BarLoader = React.lazy(() =>
  import("react-spinners").then((module) => ({ default: module.BarLoader }))
);

type Props = PropsWithChildren<{
  width?: number;
  status: boolean;
}>;

const Loading: React.FC<Props> = ({ children, width, status }) => {
  return <>{status ? <BarLoader className="mt-5" color="#34d399" width={width} /> : children}</>;
};

export default React.memo(Loading);
