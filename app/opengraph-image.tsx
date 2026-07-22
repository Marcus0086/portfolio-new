import { ImageResponse } from "next/og";

// Required for `output: "export"`. The image is rendered once at build time.
export const dynamic = "force-static";

export const alt = "Raghav Gupta, founding engineer and backend systems builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social card in the site's visual language: void background, cyan signal
// node, mono-tracked labels. Satori renders its default sans; the tracking
// and palette carry the identity.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#050510",
          color: "#e6f7ff",
          border: "1px solid rgba(0, 229, 255, 0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            letterSpacing: 6,
            color: "#7a8fa6",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#00e5ff",
              boxShadow: "0 0 24px rgba(0, 229, 255, 0.9)",
            }}
          />
          RAGHAV GUPTA
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 82, fontWeight: 700, letterSpacing: 2 }}>
            FOUNDING ENGINEER
          </div>
          <div style={{ fontSize: 40, color: "#00e5ff", letterSpacing: 4 }}>
            AI + BACKEND SYSTEMS
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: 5,
            color: "#7a8fa6",
          }}
        >
          <div>FEATURELY · SYNTHETIC USERS</div>
          <div style={{ color: "#ff2e88" }}>AVAILABLE FOR WORK</div>
        </div>
      </div>
    ),
    size,
  );
}
