const PROXY_DOMAINS = ["consumer.go.kr"];

export function toProxyImageUrl(
  src?: string,
  width = 180,
  height = 180,
  fit: "cover" | "inside" = "cover"
) {
  if (!src) return undefined;

  try {
    const url = new URL(src);
    const shouldProxy = PROXY_DOMAINS.some(
      (domain) => url.hostname === domain || url.hostname.endsWith(`.${domain}`)
    );

    if (!shouldProxy) return src;

    return `/api/image?url=${encodeURIComponent(src)}&w=${width}&h=${height}&fit=${fit}`;
  } catch {
    return src;
  }
}
