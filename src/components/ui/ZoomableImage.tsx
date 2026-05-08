import { useState, type ImgHTMLAttributes } from "react";
import Lightbox from "./Lightbox";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "onClick"> & {
  src: string;
  alt: string;
};

const ZoomableImage = ({ className = "", src, alt, ...rest }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <img
        {...rest}
        src={src}
        alt={alt}
        onClick={() => setOpen(true)}
        className={`${className} cursor-zoom-in`}
      />
      <Lightbox
        src={src}
        alt={alt}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default ZoomableImage;
