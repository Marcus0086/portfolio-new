"use client";

import type { StorageSnapshot } from "@ssr-storage/core";
import { StorageProvider } from "@ssr-storage/react";
import type { ReactNode } from "react";
import { applicationCells } from "./storage";

export function PlaygroundProvider({
  children,
  snapshot,
}: {
  children: ReactNode;
  snapshot: StorageSnapshot;
}) {
  return (
    <StorageProvider cells={applicationCells} snapshot={snapshot}>
      {children}
    </StorageProvider>
  );
}
