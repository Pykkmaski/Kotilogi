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

/**Renders a dialog displaying images, that when clicked, are chosen as the main image of a target (Property or event). */
export function SelectImageDialog({ images, ...props }: SelectImageDialogProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'loading_images'>(
    'loading_images'
  );

  const router = useRouter();

  return (
    <VPDialog {...props}>
      <DialogTitle>Valitse Pääkuva</DialogTitle>
      <DialogContent>
        <RenderOnCondition
          condition={status !== 'loading'}
          fallback={<Spinner message='Ladataan kuvia...' />}>
          <div className='grid gap-4 lg:grid-cols-3 xs:grid-cols-2 w-full'>
            {images.length ? (
              images.map((img, i) => (
                <ImageSelector
                  key={`image-selector-${i}`}
                  onClick={async () => {
                    if (status === 'loading' || status === 'done') return;
                    setStatus('loading');
                    const loadingToast = toast.loading('Vaihdetaan pääkuvaa...');

                    await setMainImageAction(img.parent_id, img.id)
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
              ))
            ) : (
              <span>Ei kuvia.</span>
            )}
          </div>
        </RenderOnCondition>
      </DialogContent>
    </VPDialog>
  );
}

function ImageSelector({ onClick, imageId }) {
  const imageSrc = `/api/protected/files/${imageId}`;

  return (
    <div className='aspect-square object-cover'>
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
