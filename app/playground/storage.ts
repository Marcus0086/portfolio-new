import {
  cell,
  cookie,
  json,
  literal,
  localStorage,
  requestMemory,
  sessionStorage,
  string,
} from "@ssr-storage/core";

export type ApplicationDraft = {
  role: string;
  experience: string;
};

export type ApplicationStep = "role" | "experience" | "review";

export const applicationIdCell = cell("application-id", {
  default: "NEW",
  codec: string(),
  adapter: cookie({
    name: "atomic-application",
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  }),
  expose: true,
  description: "Application identifier visible to the server and browser",
});

export const applicationDraftCell = cell<ApplicationDraft>("application-draft", {
  default: { role: "Backend Engineer", experience: "" },
  codec: json<ApplicationDraft>(),
  adapter: localStorage({ key: "atomic:application-draft" }),
  description: "Unfinished answers stored in this browser",
});

export const applicationStepCell = cell<ApplicationStep>("application-step", {
  default: "role",
  codec: literal(["role", "experience", "review"] as const),
  adapter: sessionStorage({ key: "atomic:application-step" }),
  description: "Current application step for this browser tab",
});

export const requestTraceCell = cell("request-trace", {
  default: "not-set",
  codec: string(),
  adapter: requestMemory({ key: "atomic:request-trace" }),
  description: "Temporary identifier for one server request",
});

export const applicationCells = [
  applicationIdCell,
  applicationDraftCell,
  applicationStepCell,
  requestTraceCell,
] as const;
