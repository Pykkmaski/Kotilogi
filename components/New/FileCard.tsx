'use client';

import { FileDataType } from 'kotilogi-app/dataAccess/types';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { MenuButton } from './MenuButton';
import { useCallback, useMemo, useState } from 'react';
import axios from 'axios';
import { deleteFileAction } from 'kotilogi-app/app/dashboard/files/actions';
import { MenuPrefab, VPMenu } from '../UI/VPMenu';
import { RenderOnCondition } from '../Util/RenderOnCondition';
import { setMainImageAction } from '@/actions/files';
import { useRouter } from 'next/navigation';
import { CopyAll } from '@mui/icons-material';

type FileCardProps = {
  file: FileDataType;
  isMain?: boolean;
};

export function FileCard({ file, isMain }: FileCardProps) {
  const src = `/api/protected/files/${file.id}`;
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const router = useRouter();

  const deleteFile = useCallback(async () => {
    const c = confirm('Haluatko varmasti poistaa valitsemasi tiedoston?');
    if (!c) return;

    setStatus('loading');
    const loadingToast = toast.loading('Poistetaan tiedostoa...');

    const response = await deleteFileAction(file.id);
    if (response.status === 200) {
      toast.success(response.statusText);
      router.refresh();
    } else {
      toast.error(response.statusText);
    }

    toast.dismiss(loadingToast);
    setStatus('idle');
  }, [file.id, setStatus, deleteFileAction]);

  const setMainImage = useCallback(async () => {
    const c = confirm('Haluatko varmasti asettaa kuvan pääkuvaksi?');
    if (!c) return;

    setStatus('loading');
    const loadingToast = toast.loading('Päivitetään pääkuvaa...');

    await setMainImageAction(file.parent_id, file.id)
      .then(res => {
        if (res.status == 200) {
          toast.success(res.statusText);
        } else {
          toast.error(res.statusText);
        }
      })
      .catch(err => toast.error(err.message));

    toast.dismiss(loadingToast);
    setStatus('idle');
  }, [setStatus, file.id, file.parent_id, axios]);

  const loading = useMemo(() => status == 'loading', [status]);

  return (
    <div className='relative flex flex-col aspect-square lg:w-[250px] xs:w-[100%] overflow-hidden rounded-md shadow-md'>
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
      <Link
        href={src}
        target='_blank'
        className='h-full z-0'>
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
          <PDFContainer file={file} />
        </RenderOnCondition>
      </Link>
    </div>
  );
}

export function PDFContainer({ file }: TODO) {
  return (
    <div className='flex flex-col w-full h-full items-center justify-center text-2xl text-red-500 absolute top-0'>
      <div className='flex items-center gap-2'>
        <CopyAll />
        <span>PDF</span>
      </div>

      <span className='text-slate-500 text-sm text-wrap'>{file.name.split('--').at(1)}</span>
    </div>
  );
}
