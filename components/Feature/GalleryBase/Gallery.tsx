'use client';

import { CSSProperties, createContext, useState } from 'react';
import { ActionType } from './Gallery.reducer';
import { useGallery, StateType } from './Gallery.hooks';
import { Heading } from '@/components/UI/Heading';
import { Group } from '@/components/UI/Group';
import { ListItemProps } from '@/components/Feature/ListItem/ListItem';
import React from 'react';
import Button from '@/components/UI/Button/Button';
import toast from 'react-hot-toast';
import { SelectablesProvider } from '@/components/Util/SelectablesProvider';
import { List } from '@/components/Feature/List';
import { Modal } from '@/components/UI/Modal';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider';
import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';

function Header(
  props: React.PropsWithChildren & {
    title: string;
  }
) {
  return (
    <div className='mb-4 w-full'>
      <Group
        direction='row'
        justify='between'
        align='center'>
        <Heading>{props.title}</Heading>

        <Group
          direction='row'
          gap={4}
          align='center'
          justify='center'>
          {props.children}
        </Group>
      </Group>
    </div>
  );
}

type BodyProps = {
  displayStyle?: 'vertical' | 'horizontal';
  itemComponent: React.FC<ListItemProps<any>>;
  errorElement: JSX.Element;
};

function Body({ displayStyle = 'vertical', itemComponent: ItemComponent, ...props }: BodyProps) {
  const { data } = useGalleryContext();

  const bodyStyle: CSSProperties = {
    display: 'flex',
    flexFlow: displayStyle === 'vertical' ? 'column' : 'row',
    gap: '0.5rem',
  };

  return data.length ? (
    <div style={bodyStyle}>
      <List
        data={data}
        Component={({ item }) => {
          return <ItemComponent item={item} />;
        }}
      />
    </div>
  ) : (
    props.errorElement
  );
}

type GalleryProps<T extends Kotidok.ItemType> = React.PropsWithChildren & {
  data: T[];
};

type GalleryContextValueType = {
  data: Kotidok.ItemType[];
  state: StateType<Kotidok.ItemType>;
  props: GalleryProps<Kotidok.ItemType>;

  dispatch: React.Dispatch<ActionType<Kotidok.ItemType>>;
};

const GalleryContext = createContext<GalleryContextValueType | null>(null);

export function Gallery<T extends Kotidok.ItemType>(props: GalleryProps<T>) {
  const { state, dispatch } = useGallery(props.data);
  const contextValue: GalleryContextValueType = {
    data: props.data,
    state,
    props,
    dispatch,
  };

  return (
    <GalleryContext.Provider value={contextValue}>
      <SelectablesProvider>
        <div className='relative flex flex-col flex-1 text-white z-[2] w-full'>
          {props.children}
        </div>
      </SelectablesProvider>
    </GalleryContext.Provider>
  );
}

type ConfirmDeleteModalProps = {
  bodyText: string;
  title: string;
  successMessage: string;
  deleteMethod: (item: TODO) => Promise<void>;
  hidden?: boolean;
};
Gallery.ConfirmDeleteModal = function ({
  bodyText,
  title,
  successMessage,
  deleteMethod,
  ...props
}: ConfirmDeleteModalProps) {
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');
  const loading = status === 'loading';

  return (
    <Modal hidden={props.hidden}>
      <Modal.DefaultContentContainer>
        <Modal.HeaderWithTitle
          title={title}
          icon='fa-trash'
        />
        <Modal.Body>
          {bodyText}
          <br />
          <br />
          <ul className='flex flex-col'>
            <SelectablesProvider.SelectedItems
              Component={props => {
                return <li>{props.item.title}</li>;
              }}
            />
          </ul>
          <br />
          Oletko varma?
        </Modal.Body>

        <Modal.Footer>
          <VisibilityProvider.Trigger>
            <Button
              variant='secondary'
              disabled={loading}>
              Ei
            </Button>
          </VisibilityProvider.Trigger>

          <SelectablesProvider.ActionTrigger
            action={async selectedItems => {
              setStatus('loading');
              const promises = selectedItems.map(item => deleteMethod(item.id));
              await Promise.all(promises)
                .then(() => toast.success(successMessage))
                .catch(err => toast.error(err.message))
                .finally(() => setStatus('idle'));
            }}>
            <Button
              variant='primary-dashboard'
              loading={loading}
              disabled={loading}>
              <span className='mx-4'>Kyllä</span>
            </Button>
          </SelectablesProvider.ActionTrigger>
        </Modal.Footer>
      </Modal.DefaultContentContainer>
    </Modal>
  );
};

Gallery.Header = Header;
Gallery.Body = Body;

const useGalleryContext = createUseContextHook('GalleryContext', GalleryContext);
