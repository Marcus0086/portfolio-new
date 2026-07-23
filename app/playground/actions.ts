"use server";

import { commitApplicationCookie } from "./application-server";

export async function setActiveApplication(
  applicationId: string,
): Promise<{ applicationId: string }> {
  if (!/^APP-[0-9]{4}$/.test(applicationId)) {
    throw new Error("Application IDs must look like APP-1001.");
  }

  await commitApplicationCookie(applicationId);
  return { applicationId };
}
