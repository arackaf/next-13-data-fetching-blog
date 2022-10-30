"use client";

import { FC, PropsWithChildren } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const ReactQueryRoot: FC<PropsWithChildren<{}>> = (props) => {
  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
};
