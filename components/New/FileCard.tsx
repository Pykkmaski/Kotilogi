'use client';

import { FileDataType } from 'kotilogi-app/dataAccess/types';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { MenuButton } from './MenuButton';
import { useCallback, useState } from 'react';
import { FormStatus } from '@/hooks/useDataSubmissionForm';
import axios from 'axios';
import { deleteFileAction } from 'kotilogi-app/app/dashboard/files/actions';
import { MenuPrefab, VPMenu } from '../UI/VPMenu';
import { RenderOnCondition } from '../Util/RenderOnCondition';

type FileCardProps = {
  file: FileDataType;
  isMain?: boolean;
};

export function FileCard({ file, isMain }: FileCardProps) {
  const src = `/api/protected/files/${file.id}`;
  const [status, setStatus] = useState(0);

  const deleteFile = useCallback(async () => {
    const c = confirm('Haluatko varmasti poistaa valitsemasi tiedoston?');
    if (!c) return;

    setStatus(FormStatus.LOADING);
    const loadingToast = toast.loading('Poistetaan tiedostoa...');

    const response = await deleteFileAction(file.id);
    if (response.status === 200) {
      toast.success(response.statusText);
    } else {
      toast.error(response.statusText);
    }

    toast.dismiss(loadingToast);
    setStatus(FormStatus.IDLE);
  }, [file.id, setStatus, deleteFileAction]);

  const setMainImage = useCallback(async () => {
    const c = confirm('Haluatko varmasti asettaa kuvan pääkuvaksi?');
    if (!c) return;

    setStatus(FormStatus.LOADING);
    const loadingToast = toast.loading('Päivitetään pääkuvaa...');

    await axios
      .post('/api/protected/files/set_main_image', {
        objectId: file.parentId,
        imageId: file.id,
      })
      .then(res => {
        if (res.status == 200) {
          toast.success(res.statusText);
        } else {
          toast.error(res.statusText);
        }
      })
      .catch(err => toast.error(err.message));

    toast.dismiss(loadingToast);
    setStatus(FormStatus.IDLE);
  }, [setStatus, file.id, file.parentId, axios]);

  const loading = status == FormStatus.LOADING;

  return (
    <div className='relative flex flex-col aspect-square lg:w-[250px] xs:w-[50%] overflow-hidden rounded-md shadow-md'>
      <div className='flex p-2 gap-2 w-full z-20 justify-end bg-[#0004] items-center'>
        <MenuPrefab
          trigger={<MenuButton />}
          target={
            <VPMenu>
              <RenderOnCondition condition={file.type == 'image/jpeg'}>
                <span onClick={!loading && setMainImage}>Aseta pääkuvaksi</span>
              </RenderOnCondition>

              <span onClick={!loading && deleteFile}>Poista</span>
            </VPMenu>
          }
        />
      </div>
      <RenderOnCondition condition={file.type == 'image/jpeg'}>
        <Image
          src={src}
          fill={true}
          quality={50}
          objectFit='cover'
          alt={file.name}
          className='absolute top-0 left-0'
        />
      </RenderOnCondition>

      <RenderOnCondition condition={file.type == 'application/pdf'}>
        <iframe
          src={`${src}#toolbar=0`}
          className='w-full h-full object-cover absolute top-0 left-0'
        />
      </RenderOnCondition>
      <Link
        href={src}
        target='_blank'
        className='w-full h-full z-10'
      />
    </div>
  );
}
