import { ImgHTMLAttributes } from "react";
import { toProxyImageUrl } from "@/lib/imageProxy";

interface ImageWithDefaultProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  proxyWidth?: number;
  proxyHeight?: number;
  proxyFit?: "cover" | "inside";
}

const ImageWithDefault = ({
  src,
  proxyWidth = 180,
  proxyHeight = 180,
  proxyFit,
  ...props
}: ImageWithDefaultProps) => {
  const resolvedSrc = toProxyImageUrl(src, proxyWidth, proxyHeight, proxyFit) || "/defaultImg.jpeg";
  return <img src={resolvedSrc} loading="lazy" decoding="async" {...props} />;
};

export default ImageWithDefault;
