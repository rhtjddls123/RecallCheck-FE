import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://recall-check.site";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: `${baseUrl}/recall`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8
    },
    {
      url: `${baseUrl}/setting`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3
    },
    {
      url: `${baseUrl}/activity`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5
    }
  ];

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/recall/sitemap`, {
    next: { revalidate: 60 * 60 * 3 }
  });

  if (!res.ok) return staticPages;

  const data = (await res.json()) as { recallSn: string }[];

  const dynamicPages = data.map(({ recallSn }) => ({
    url: `${baseUrl}/recall/${recallSn}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7
  }));

  return [...staticPages, ...dynamicPages];
}
