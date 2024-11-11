'use client';

import { CSSProperties, createContext, useState } from 'react';
import { ActionType } from './Gallery.reducer';
import { useGallery, StateType } from './Gallery.hooks';
import { Heading } from '@/components/UI/Heading';
import React from 'react';
import toast from 'react-hot-toast';
import { SelectablesProvider } from '@/components/Util/SelectablesProvider';
import { List } from '@/components/New/List';
import { Modal } from '@/components/UI/Modal';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider';
import { createUseContextHook } from 'kotilogi-app/utils/createUseContextHook';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Link from 'next/link';
import { DialogControl } from '@/components/Util/DialogControl';
import { Delete } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ObjectDataType } from 'kotilogi-app/dataAccess/types';
import { Button } from '@/components/New/Button';
import { Spacer } from '@/components/UI/Spacer';

function Header(
  props: React.PropsWithChildren & {
    title: string;
  }
) {
  return (
    <div className='mb-4 w-full'>
      <Spacer
        direction='row'
        justify='between'
        items='center'>
        <Heading>{props.title}</Heading>

        <Spacer
          direction='row'
          gap={'medium'}
          items='center'
          justify='center'>
          {props.children}
        </Spacer>
      </Spacer>
    </div>
  );
}

type BodyProps = {
  contentType?: 'image' | 'other';
  displayStyle?: 'vertical' | 'horizontal';
  itemComponent: React.FC<any>;
  errorElement: JSX.Element;
};

function Body({
  displayStyle = 'vertical',
  itemComponent: ItemComponent,
  contentType = 'other',
  ...props
}: BodyProps) {
  const { data } = useGalleryContext();

  const bodyStyle: CSSProperties = {
    display: 'flex',
    flexFlow: displayStyle === 'vertical' ? 'column' : 'row',
    gap: '0.5rem',
  };

  const getBodyByContentType = () => {
    if (contentType === 'image') {
      return (
        <ImageList cols={4}>
          {data.map(image => (
            <div className='relative'>
              <SelectablesProvider.SelectTrigger item={image}>
                <input
                  type='checkbox'
                  className='absolute top-2 right-2 z-10 aspect-square h-8'
                />
              </SelectablesProvider.SelectTrigger>

              <Link
                href={`/api/files/${image.id}?tableName=propertyFiles`}
                target='_blank'>
                <ImageListItem key={image.id}>
                  <img
                    src={`/api/files/${image.id}?tableName=propertyFiles`}
                    loading='lazy'
                    alt={image.id}
                  />
                </ImageListItem>
              </Link>
            </div>
          ))}
        </ImageList>
      );
    } else {
      return (
        <List direction='col'>
          {data.map(d => (
            <ItemComponent item={d} />
          ))}
        </List>
      );
    }
  };

  return data.length ? getBodyByContentType() : props.errorElement;
}

type GalleryProps<T extends ObjectDataType> = React.PropsWithChildren & {
  data: T[];
};

type GalleryContextValueType = {
  data: ObjectDataType[];
  state: StateType<ObjectDataType>;
  props: GalleryProps<ObjectDataType>;

  dispatch: React.Dispatch<ActionType<ObjectDataType>>;
};

const GalleryContext = createContext<GalleryContextValueType | null>(null);

/**
 *
 * @param props
 * @deprecated
 */
export function Gallery<T extends ObjectDataType>(props: GalleryProps<T>) {
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
        <div className='flex flex-col flex-1 text-white z-[2] w-full'>{props.children}</div>
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
              variant='contained'
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
              variant='contained'
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

Gallery.ConfirmDeleteDialogControl = () => {
  return (
    <DialogControl
      trigger={({ onClick }) => (
        <Button
          type='button'
          onClick={onClick}>
          <Delete />
        </Button>
      )}
      control={({ show, handleClose }) => {
        return (
          <Dialog
            open={show}
            onClose={handleClose}>
            <DialogTitle>Olet poistamassa seuraavia kohteita. Oletko varma?</DialogTitle>
            <DialogContent>
              <ul className='flex flex-col gap-2'>
                <SelectablesProvider.SelectedItems Component={item => <li>{item.title}</li>} />
              </ul>
            </DialogContent>
            <DialogActions>
              <SelectablesProvider.ResetSelectedTrigger>
                <Button type='button'>Peruuta</Button>
              </SelectablesProvider.ResetSelectedTrigger>

              <SelectablesProvider.ActionTrigger action={async items => {}}>
                <Button type='button'>Vahvista</Button>
              </SelectablesProvider.ActionTrigger>
            </DialogActions>
          </Dialog>
        );
      }}
    />
  );
};

Gallery.Header = Header;
Gallery.Body = Body;

const useGalleryContext = createUseContextHook('GalleryContext', GalleryContext);
