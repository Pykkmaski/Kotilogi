'use client';

import { ADeleteFile, ASetMainImage } from '@/actions/files';
import { FileDataType } from 'kotilogi-app/dataAccess/types';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { CardMenuButton } from './CardMenuButton';
import { useCallback, useState } from 'react';
import { FormStatus } from '@/hooks/useDataSubmissionForm';
import axios from 'axios';
import { deleteFileAction } from 'kotilogi-app/app/dashboard/files/actions';
import { VisibilityProvider } from '../Util/VisibilityProvider';
import { VPMenu } from '../UI/VPMenu';
import { RenderOnCondition } from '../Util/RenderOnCondition';

type FileCardProps = {
  file: FileDataType;
  isMain?: boolean;
};

export function FileCard({ file, isMain }: FileCardProps) {
  const src = `/api/protected/files/${file.id}`;
  const [status, setStatus] = useState(0);

  const deleteFile = async () => {
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
  };

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
  }, [setStatus, file]);

  const loading = status == FormStatus.LOADING;

  return (
    <div className='relative flex flex-col aspect-square w-[250px] overflow-hidden rounded-md shadow-md'>
      <div className='flex p-2 gap-2 w-full z-20 justify-end bg-[#0004] items-center'>
        <VisibilityProvider>
          <VisibilityProvider.Trigger setAsAnchorForMUI>
            <CardMenuButton />
          </VisibilityProvider.Trigger>

          <VisibilityProvider.Target>
            <VPMenu>
              <RenderOnCondition condition={file.type == 'image/jpeg'}>
                <span onClick={!loading && setMainImage}>Aseta pääkuvaksi</span>
              </RenderOnCondition>

              <span onClick={!loading && deleteFile}>Poista</span>
            </VPMenu>
          </VisibilityProvider.Target>
        </VisibilityProvider>
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
