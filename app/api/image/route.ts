import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export const preferredRegion = "icn1";

const ALLOWED_DOMAINS = ["consumer.go.kr", "eibexbylciqbdbewylvz.supabase.co"];

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const url = searchParams.get("url");
  const width = Math.min(parseInt(searchParams.get("w") || "180"), 1200);
  const height = Math.min(parseInt(searchParams.get("h") || "180"), 1200);
  const fit = searchParams.get("fit") === "inside" ? "inside" : "cover";

  if (!url) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    return new NextResponse("Invalid URL", { status: 400 });
  }

  const isAllowed = ALLOWED_DOMAINS.some(
    (domain) => parsedUrl.hostname === domain || parsedUrl.hostname.endsWith(`.${domain}`)
  );

  if (!isAllowed) {
    return new NextResponse("Domain not allowed", { status: 403 });
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return new NextResponse("Failed to fetch image", { status: 502 });
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    const webpBuffer = await sharp(buffer)
      .resize(width, height, { fit, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    return new NextResponse(new Uint8Array(webpBuffer), {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400"
      }
    });
  } catch {
    return new NextResponse("Image processing failed", { status: 502 });
  }
}
