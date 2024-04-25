import { GalleryError } from './GalleryError';

export function FileError(props: { message: string }) {
  return (
    <GalleryError
      {...props}
      title='Ei Tiedostoja'
      icon='fa-copy'
    />
  );
}
