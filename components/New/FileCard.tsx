'use client';

import { ADeleteFile, ASetMainImage } from '@/actions/files';
import { FormStatus } from '@/hooks/useDataSubmissionForm';
import { Delete, Star } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { FileDataType } from 'kotilogi-app/models/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

type FileCardProps = {
  file: FileDataType;
  isMain?: boolean;
};

export function FileCard({ file, isMain }: FileCardProps) {
  const src = `/api/files/${file.id}`;
  const [status, setStatus] = useState(FormStatus.IDLE);

  const deleteFile = async () => {
    const c = confirm('Haluatko varmasti poistaa valitsemasi tiedoston?');
    if (!c) return;

    setStatus(FormStatus.LOADING);
    await ADeleteFile(file.id).then(res => {
      switch (res) {
        case 0:
          toast.success('Tiedoston poisto onnistui!');
          break;
        default:
          toast.error('Tiedoston poisto epäonnistui!');
      }
    });
    setStatus(FormStatus.IDLE);
  };

  const setMainImage = async () => {
    const c = confirm('Haluatko varmasti asettaa kuvan pääkuvaksi?');
    if (!c) return;

    setStatus(FormStatus.LOADING);
    await ASetMainImage(file.parentId, file.id).then(res => {
      switch (res) {
        case 0:
          toast.success('Pääkuvan vaihto onnistui!');
          break;

        default:
          toast.error('Pääkuvan vaihto epäonnistui!');
      }
    });
    setStatus(FormStatus.IDLE);
  };

  const loading = status == FormStatus.LOADING;

  return (
    <div className='relative flex flex-col aspect-square w-[25%] overflow-hidden rounded-md shadow-md'>
      <div className='flex p-2 gap-2 w-full z-10 justify-end bg-[#0004]'>
        {file.type == 'image/jpeg' && !isMain && (
          <IconButton
            title='Aseta pääkuvaksi'
            disabled={loading}
            onClick={setMainImage}>
            <Star sx={{ color: 'white' }} />
          </IconButton>
        )}
        <IconButton
          onClick={deleteFile}
          disabled={loading}>
          <Delete sx={{ color: 'white' }} />
        </IconButton>
      </div>
      {file.type == 'image/jpeg' ? (
        <Image
          src={src}
          fill={true}
          quality={50}
          objectFit='cover'
          alt={file.name}
          className='absolute top-0 left-0'
        />
      ) : (
        <iframe
          src={`${src}#toolbar=0`}
          className='w-full h-full object-cover absolute top-0 left-0'
        />
      )}
      <Link
        href={src}
        target='_blank'
        className='w-full h-full z-10'
      />{' '}
    </div>
  );
}
