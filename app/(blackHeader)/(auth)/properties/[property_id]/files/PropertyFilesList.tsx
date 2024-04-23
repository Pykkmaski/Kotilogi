'use client';

import { Heading } from '@/components/Heading';
import { List } from '@/components/List';
import { ListHeader, ListBody, ListHeaderControlButtons } from '@/components/Prefabs/List.prefabs';
import { PropertyFileListItem } from '@/components/ListItem/FileListItem';
import { DeleteSelectedModal, ResetSelectedButton } from '@/components/Prefabs/List.prefabs';
import { SelectablesProvider } from '@/components/Util/SelectablesProvider';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider';
import { AddButton } from '@/components/new/Gallery/GalleryBase/Buttons';
import { deleteFile } from 'kotilogi-app/actions/experimental/files';

export function PropertyFilesList({ files }) {
  return (
    <SelectablesProvider>
      <ListHeader>
        <Heading>Tiedostot</Heading>
        <SelectablesProvider.HideIfNoneSelected>
          <ListHeaderControlButtons>
            <ResetSelectedButton />

            <DeleteSelectedModal
              bodyText='Haluatko varmasti poistaa valitsemasi tiedostot?'
              headerText='Poista valitut tiedostot'
              iconHoverText='Poista valitut tiedostot...'
              successText='Tiedosto(t) poistettu!'
              deleteMethod={async item => {
                await deleteFile('propertyFiles', item.id);
              }}
            />
          </ListHeaderControlButtons>
        </SelectablesProvider.HideIfNoneSelected>

        <VisibilityProvider>
          <VisibilityProvider.Trigger>
            <AddButton />
          </VisibilityProvider.Trigger>

          <VisibilityProvider.Target></VisibilityProvider.Target>
        </VisibilityProvider>
      </ListHeader>

      <ListBody>
        <List
          data={files}
          Component={props => {
            return (
              <SelectablesProvider.HighlightIfSelected item={props.item}>
                <PropertyFileListItem item={props.item as Kotidok.FileType} />
              </SelectablesProvider.HighlightIfSelected>
            );
          }}
        />
      </ListBody>
    </SelectablesProvider>
  );
}
