import type { MetadataRoute } from "next";
import { getProjects } from "@/data/portfolio";
export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"; return [{ url: base, lastModified: new Date(), priority: 1 }, ...getProjects().map((project) => ({ url: `${base}/projects/${project.slug}`, lastModified: new Date(), priority: 0.8 }))]; }
