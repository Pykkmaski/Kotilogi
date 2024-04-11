import { GalleryError } from "./GalleryError";

export function ImageError(props: { message: string }) {
  return <GalleryError {...props} title="Ei Kuvia" icon={"/icons/image.png"} />;
}
