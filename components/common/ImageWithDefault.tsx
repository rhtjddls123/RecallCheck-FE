import { ImgHTMLAttributes } from "react";

interface ImageWithDefaultProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
}

const ImageWithDefault = ({ src, ...props }: ImageWithDefaultProps) => {
  return <img src={src || "/defaultImg.jpeg"} {...props} />;
};

export default ImageWithDefault;
