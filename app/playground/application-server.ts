import { createNextActionStorage, type NextStorageOptions } from "@ssr-storage/next";
import { cookies } from "next/headers";
import { applicationCells, applicationIdCell } from "./storage";

export async function commitApplicationCookie(
  applicationId: string,
  cookieFactory?: NextStorageOptions["cookies"],
): Promise<void> {
  const storage = await createNextActionStorage({
    cells: applicationCells,
    cookies: cookieFactory ?? cookies,
  });
  await storage.set(applicationIdCell, applicationId);
  await storage.commit();
}
