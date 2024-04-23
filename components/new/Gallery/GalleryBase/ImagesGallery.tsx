'use client';

import { ListItemProps } from '@/components/ListItem/ListItem';
import { AddButton } from '@/components/new/Gallery/GalleryBase/Buttons';
import DeleteSelectedItemsModal from '@/components/new/Gallery/GalleryBase/DeleteSelectedItemsModal';
import { Gallery } from '@/components/new/Gallery/GalleryBase/Gallery';
import { FileTableName } from 'kotilogi-app/types/FileTableName';
import { FileError } from './Components/Error/FileError';
import { addFiles, deleteFile } from 'kotilogi-app/actions/experimental/files';
import { SubmitModalPrefab } from '@/components/SubmitModalPrefab';
import toast from 'react-hot-toast';
import { Input } from '@/components/Input/Input';
import { SelectablesProvider } from '@/components/Util/SelectablesProvider';
import {
  CancelSelectionButton,
  DeleteButton,
  ListHeaderControlButtons,
} from '@/components/Prefabs/List.prefabs';
import { ConfirmModal } from '@/components/ConfirmModal';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider';
import { ImageError } from './Components/Error/ImageError';

type FilesGalleryProps = {
  files: Kotidok.FileType[];

  /**The id of the resource the images belong to, eg. the id of a property. */
  refId: string;

  tablename: FileTableName;

  ImageComponent: React.FC<ListItemProps<Kotidok.FileType>>;
};

export function ImagesGallery({ tablename, files, refId, ImageComponent }: FilesGalleryProps) {
  return (
    <Gallery data={files}>
      <Gallery.Header title='Kuvat'>
        <SelectablesProvider.HideIfNoneSelected>
          <div className='animate-slideup-fast'>
            <ListHeaderControlButtons>
              <SelectablesProvider.ResetSelectedTrigger>
                <CancelSelectionButton />
              </SelectablesProvider.ResetSelectedTrigger>
              <VisibilityProvider>
                <VisibilityProvider.Trigger>
                  <DeleteButton />
                </VisibilityProvider.Trigger>

                <VisibilityProvider.Target>
                  <Gallery.ConfirmDeleteModal
                    successMessage='Kuvien poisto onnistui!'
                    title='Poista valitut kuvat'
                    bodyText='Olet poistamassa seuraavia kuvia:'
                    deleteMethod={async id => {
                      await deleteFile(tablename, id);
                    }}></Gallery.ConfirmDeleteModal>
                </VisibilityProvider.Target>
              </VisibilityProvider>
            </ListHeaderControlButtons>
          </div>
        </SelectablesProvider.HideIfNoneSelected>
        <SubmitModalPrefab
          trigger={<AddButton />}
          modalTitle='Lisää kuvia'
          submitMethod={async (data, files?) => {
            await addFiles(tablename, files, refId)
              .then(() => toast.success('Kuva(t) lisätty!'))
              .catch(err => console.log(err.message));
          }}>
          <Input
            name='file'
            type='file'
            multiple={true}
            required
            label='Kuvat'
            description='JPG'
            accept='image/jpeg'
          />
        </SubmitModalPrefab>
      </Gallery.Header>

      <Gallery.Body
        displayStyle='horizontal'
        itemComponent={ImageComponent}
        errorElement={
          <ImageError message='Et ole vielä lisännyt kohteelle kuvia. Aloita painamalla Lisää-Uusi painiketta.' />
        }
      />
    </Gallery>
  );
}
