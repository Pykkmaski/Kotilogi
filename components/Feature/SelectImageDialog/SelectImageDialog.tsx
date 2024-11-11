'use client';

import { VPDialog } from '@/components/UI/VPDialog';
import { DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { RenderOnCondition } from '@/components/Util/RenderOnCondition';
import Spinner from '@/components/UI/Spinner';
import { setMainImageAction } from '@/actions/files';

type SelectImageDialogProps = {
  images: TODO[];
  [x: string]: any;
};

export function SelectImageDialog({ images, ...props }: SelectImageDialogProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'loading_images'>(
    'loading_images'
  );

  const router = useRouter();
  console.log(images);
  return (
    <VPDialog {...props}>
      <DialogTitle>Valitse Pääkuva</DialogTitle>
      <DialogContent>
        <RenderOnCondition
          condition={status !== 'loading'}
          fallback={<Spinner message='Ladataan kuvia...' />}>
          <div className='flex gap-2 w-full'>
            {images.map(img => (
              <ImageSelector
                onClick={async () => {
                  if (status === 'loading' || status === 'done') return;
                  setStatus('loading');
                  const loadingToast = toast.loading('Vaihdetaan pääkuvaa...');

                  await setMainImageAction(img.parentId, img.id)
                    .then(res => {
                      if (res.status == 200) {
                        toast.dismiss(loadingToast);
                        toast.success(res.statusText);
                        props.onClose && props.onClose();
                        setStatus('idle');
                        router.refresh();
                      } else {
                        toast.error(res.statusText);
                      }
                    })
                    .catch(err => toast.error(err.message))
                    .finally(() => {
                      setStatus(prev => (prev === 'loading' ? 'idle' : prev));
                      toast.dismiss(loadingToast);
                    });
                }}
                imageId={img.id}
              />
            ))}
          </div>
        </RenderOnCondition>
      </DialogContent>
    </VPDialog>
  );
}

function ImageSelector({ onClick, imageId }) {
  const imageSrc = `/api/protected/files/${imageId}`;

  return (
    <div className='w-[200px] aspect-square object-cover'>
      <Image
        onClick={onClick}
        className='rounded-md overflow-hidden cursor-pointer'
        src={imageSrc}
        objectFit='cover'
        alt=''
        width={200}
        height={200}
      />
    </div>
  );
}
