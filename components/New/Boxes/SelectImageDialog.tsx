'use client';

import { Spacer } from '@/components/UI/Spacer';
import { VPDialog } from '@/components/UI/VPDialog';
import { DialogContent, DialogTitle } from '@mui/material';
import db from 'kotilogi-app/dbconfig';
import { FileCard } from '../FileCard';
import { useEffect, useState } from 'react';
import { getImageIdsAction } from './actions';
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';

type SelectImageDialogProps = {
  parentId: string;
  onSelect?: (imageId: string) => void;
  [x: string]: any;
};

export function SelectImageDialog({ parentId, onSelect, ...props }: SelectImageDialogProps) {
  const [imageIds, setImageIds] = useState<string[]>([]);

  useEffect(() => {
    getImageIdsAction(parentId).then(imageIds => setImageIds(imageIds));
  }, []);

  return (
    <VPDialog {...props}>
      <DialogTitle>Valitse Pääkuva</DialogTitle>
      <DialogContent>
        <div className='flex gap-2 w-full'>
          {imageIds.map(img => (
            <ImageSelector
              onClick={async () => {
                await axios
                  .post('/api/protected/files/set_main_image', {
                    objectId: parentId,
                    imageId: img,
                  })
                  .then(res => {
                    if (res.status == 200) {
                      toast.success(res.statusText);
                      props.onClose && props.onClose();
                    } else {
                      toast.error(res.statusText);
                    }
                  })
                  .catch(err => toast.error(err.message));
              }}
              imageId={img}
            />
          ))}
        </div>
      </DialogContent>
    </VPDialog>
  );
}

function ImageSelector({ onClick, imageId }) {
  const imageSrc = `/api/protected/files/${imageId}`;

  return (
    <Image
      onClick={onClick}
      className='cursor-pointer rounded-md overflow-hidden'
      src={imageSrc}
      width={200}
      height={200}
      objectFit='cover'
      alt=''
    />
  );
}
