import Image from 'next/image';

type FileListProps = {
  files: File[];
  onDelete?: (file: File) => void;
};

export function FileList({ files, onDelete }: FileListProps) {
  return (
    <div className='flex gap-2 w-full'>
      {files.map(f => (
        <div className='object-cover aspect-square w-[200px] rounded-md overflow-hidden'>
          <Image
            src={URL.createObjectURL(f)}
            width={200}
            height={200}
            objectFit='cover'
            alt={f.name}
          />
        </div>
      ))}
    </div>
  );
}
