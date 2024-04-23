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

  variant: 'image' | 'pdf';

  tablename: FileTableName;

  FileComponent: React.FC<ListItemProps<Kotidok.FileType>>;
};

export function FilesGallery({
  tablename,
  files,
  refId,
  variant,
  FileComponent,
}: FilesGalleryProps) {
  const getErrorComponent = () => {
    if (variant === 'image') {
      return <ImageError message='Et ole vielä lisännyt kohteelle kuvia.' />;
    } else {
      return <FileError message='Et ole vielä lisännyt kohteelle tiedostoja.' />;
    }
  };

  const getSuccessMessage = (afterAction: 'delete' | 'add') => {
    if (variant === 'image') {
      return afterAction === 'add' ? 'Kuva(t) lisätty!' : 'Kuva(t) poistettu!';
    } else {
      return afterAction === 'add' ? 'Tiedosto(t) lisätty!' : 'Tiedosto(t) poistettu!';
    }
  };

  return (
    <Gallery data={files}>
      <Gallery.Header title={variant === 'image' ? 'Kuvat' : 'Tiedostot'}>
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
                    successMessage={getSuccessMessage('delete')}
                    title={'Poista valitut ' + variant === 'image' ? 'kuvat' : 'tiedostot'}
                    bodyText={
                      'Olet poistamassa seuraavia ' + variant === 'image' ? 'kuvia:' : 'tiedostoja:'
                    }
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
          modalTitle={'Lisää ' + variant === 'image' ? 'kuvia' : 'tiedostoja'}
          submitMethod={async (data, files?) => {
            await addFiles(tablename, files, refId)
              .then(() => toast.success(getSuccessMessage('add')))
              .catch(err => console.log(err.message));
          }}>
          <Input
            name='file'
            type='file'
            multiple={true}
            required
            label={variant === 'image' ? 'Kuvat' : 'Tiedostot'}
            description={variant === 'image' ? 'JPG' : 'PDF'}
            accept={variant === 'image' ? 'image/jpeg' : 'application/pdf'}
          />
        </SubmitModalPrefab>
      </Gallery.Header>

      <Gallery.Body
        displayStyle={variant === 'image' ? 'horizontal' : 'vertical'}
        itemComponent={FileComponent}
        errorElement={getErrorComponent()}
      />
    </Gallery>
  );
}
