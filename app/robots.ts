import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/content";

// Required for `output: "export"` — the route is emitted as a static file.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
