'use client';

import { ADeleteFile, ASetMainImage } from '@/actions/files';
import { FileDataType } from 'kotilogi-app/models/types';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Menu } from './Menu';
import { CardMenuButton } from './CardMenuButton';
import { useState } from 'react';
import { FormStatus } from '@/hooks/useDataSubmissionForm';

type FileCardProps = {
  file: FileDataType;
  isMain?: boolean;
};

export function FileCard({ file, isMain }: FileCardProps) {
  const src = `/api/files/${file.id}`;
  const [status, setStatus] = useState(0);

  const deleteFile = async () => {
    const c = confirm('Haluatko varmasti poistaa valitsemasi tiedoston?');
    if (!c) return;

    setStatus(FormStatus.LOADING);
    const loadingToast = toast.loading('Poistetaan tiedostoa...');
    await ADeleteFile(file.id).then(res => {
      switch (res) {
        case 0:
          toast.success('Tiedoston poisto onnistui!');
          break;
        default:
          toast.error('Tiedoston poisto epäonnistui!');
      }
    });

    toast.dismiss(loadingToast);
    setStatus(FormStatus.IDLE);
  };

  const setMainImage = async () => {
    const c = confirm('Haluatko varmasti asettaa kuvan pääkuvaksi?');
    if (!c) return;

    setStatus(FormStatus.LOADING);
    const loadingToast = toast.loading('Päivitetään pääkuvaa...');
    await ASetMainImage(file.parentId, file.id).then(res => {
      switch (res) {
        case 0:
          toast.success('Pääkuvan vaihto onnistui!');
          break;

        default:
          toast.error('Pääkuvan vaihto epäonnistui!');
      }
    });
    toast.dismiss(loadingToast);
    setStatus(FormStatus.IDLE);
  };

  const loading = status == FormStatus.LOADING;

  return (
    <div className='relative flex flex-col aspect-square w-[25%] overflow-hidden rounded-md shadow-md'>
      <div className='flex p-2 gap-2 w-full z-20 justify-end bg-[#0004] items-center'>
        <Menu trigger={<CardMenuButton />}>
          {file.type == 'image/jpeg' && (
            <span onClick={!loading && setMainImage}>Aseta pääkuvaksi</span>
          )}
          <span onClick={!loading && deleteFile}>Poista</span>
        </Menu>
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
