import { describe, expect, it, vi } from "vitest";
import { commitApplicationCookie } from "../app/playground/application-server";

describe("commitApplicationCookie", () => {
  it("writes the application cookie through Atomic commit effects", async () => {
    const set = vi.fn();
    const cookieStore = {
      get: () => undefined,
      getAll: () => [],
      set,
    };

    await commitApplicationCookie("APP-1001", () => cookieStore);

    expect(set).toHaveBeenCalledOnce();
    const [name, encodedValue, options] = set.mock.calls[0];
    expect(name).toBe("atomic-application");
    expect(JSON.parse(encodedValue)).toMatchObject({ v: 1, x: "APP-1001" });
    expect(options).toMatchObject({ path: "/", sameSite: "lax" });
  });
});
