'use client';

import AddFilesModal from '@/components/Experimental/Modal/AddFilesModal';
import { Gallery } from 'kotilogi-app/components/new/Gallery/GalleryBase/Gallery';
import { FileError } from '@/components/new/Gallery/GalleryBase/Components/Error/FileError';
import { PropertyFileListItem } from 'kotilogi-app/components/ListItem/FileListItem';
import DeleteSelectedItemsModal from '@/components/new/Gallery/GalleryBase/DeleteSelectedItemsModal';
import { AddButton, DeleteButton } from '@/components/new/Gallery/GalleryBase/Buttons';
import { addFiles, deleteFile } from 'kotilogi-app/actions/experimental/files';
import { SubmitModalPrefab } from '@/components/SubmitModalPrefab';
import toast from 'react-hot-toast';
import { Input } from '@/components/Input/Input';

export function Content({ files, propertyId }) {
  return (
    <Gallery data={files}>
      <Gallery.AddModal>
        <AddFilesModal
          accept='application/pdf'
          uploadMethod={async (fdata: FormData[]) => {
            await addFiles('propertyFiles', fdata, propertyId);
          }}
        />
      </Gallery.AddModal>

      <Gallery.DeleteModal>
        <DeleteSelectedItemsModal
          deleteMethod={async (fileData: Kotidok.FileType) => {
            await deleteFile('propertyFiles', fileData.id);
          }}
        />
      </Gallery.DeleteModal>

      <Gallery.Header title='Tiedostot'>
        <SubmitModalPrefab
          trigger={<AddButton />}
          modalTitle='Lisää tiedostoja'
          submitMethod={async (data, files?) => {
            await addFiles('propertyFiles', files, propertyId)
              .then(() => toast.success('Tiedosto(t) lisätty!'))
              .catch(err => console.log(err.message));
          }}>
          <Input
            name='file'
            type='file'
            multiple={true}
            accept='application/pdf'
            required
            label='Tiedostot'
            description='PDF'
          />
        </SubmitModalPrefab>
      </Gallery.Header>

      <Gallery.Body
        displayStyle='vertical'
        itemComponent={PropertyFileListItem}
        errorElement={
          <FileError message='Et ole vielä lisännyt talolle tiedotoja. Aloita painamalla Lisää-Uusi painiketta.' />
        }
      />
    </Gallery>
  );
}
