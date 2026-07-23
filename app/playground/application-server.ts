import { createNextActionStorage, type NextStorageOptions } from "@ssr-storage/next";
import { applicationCells, applicationIdCell } from "./storage";

export async function commitApplicationCookie(
  applicationId: string,
  cookieFactory?: NextStorageOptions["cookies"],
): Promise<void> {
  const storage = await createNextActionStorage({
    cells: applicationCells,
    cookies: cookieFactory,
  });
  await storage.set(applicationIdCell, applicationId);
  await storage.commit();
}
