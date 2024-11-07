import { useMapArray } from '@/hooks/useMapArray';
import { Clear } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Image from 'next/image';

type FileListProps = {
  files: File[];
  onDelete?: (file: File) => void;
};

export function FileList({ files, onDelete }: FileListProps) {
  const content = useMapArray(files, file => {
    const src = URL.createObjectURL(file);

    return (
      <div className='relative object-cover aspect-square w-[200px] rounded-md overflow-hidden'>
        <div className='absolute top-0 right-0'>
          <IconButton
            onClick={() => onDelete && onDelete(file)}
            color='warning'>
            <Clear />
          </IconButton>
        </div>

        {file.type === 'image/jpeg' ? (
          <Image
            src={src}
            width={200}
            height={200}
            objectFit='cover'
            alt={file.name}
          />
        ) : (
          <iframe
            src={src}
            width={200}
            height={200}
          />
        )}
      </div>
    );
  });

  return <div className='flex gap-2 w-full'>{content}</div>;
}
