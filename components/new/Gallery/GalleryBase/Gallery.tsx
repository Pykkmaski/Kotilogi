'use client';

import { CSSProperties, MutableRefObject, createContext, useContext, useRef, useState } from 'react';
import { ActionType } from './Gallery.reducer';
import { ModalProps } from 'kotilogi-app/components/Modals/Modal';
import { useGallery, StateType } from './Gallery.hooks';
import { Heading } from 'kotilogi-app/components/Heading';
import { Group } from 'kotilogi-app/components/Group';
import { ListItemProps } from 'kotilogi-app/components/ListItem/ListItem';
import { PrimaryButton } from 'kotilogi-app/components/Button/PrimaryButton';
import { SecondaryButton } from 'kotilogi-app/components/Button/SecondaryButton';
import React from 'react';
import { ModalRefType } from '@/components/Experimental/Modal/Modal';
import { default as ExperimentalModal } from '@/components/Experimental/Modal/Modal';
import { CloseButton } from '@/components/CloseButton';
import Button from '@/components/Button/Button';
import toast from 'react-hot-toast';

function Header(
  props: React.PropsWithChildren & {
    title: string;
    AddModal?: React.FC<ModalProps>;

    /**The modal displayed when deleting multiple items at once. */
    DeleteModal?: React.FC<ModalProps>;
  }
) {
  const { state, addModalRef } = useGalleryContext();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { AddModal, DeleteModal } = props;

  const getButtons = () => {
    const buttons: JSX.Element[] = [];

    if (DeleteModal) {
      buttons.push(
        <SecondaryButton onClick={() => setShowDeleteModal(true)} hidden={!state.selectedItems.length}>
          Poista
        </SecondaryButton>
      );
    }

    if (addModalRef.current) {
      buttons.push(
        <PrimaryButton onClick={() => addModalRef.current.toggleOpen(true)} className='shadow-md min-h-8'>
          <Group direction='row' gap={4}>
            <img src='/icons/plus.png' className='invert aspect-square w-[25px]' />
          </Group>
        </PrimaryButton>
      );
    }

    return buttons;
  };

  return (
    <>
      {/**AddModal ? <AddModal id="gallery-add-modal" show={showAddModal} onHide={() => setShowAddModal(false)}/> : null*/}
      {/**DeleteModal ? <DeleteModal id="gallery-delete-modal" show={showDeleteModal} onHide={() => setShowDeleteModal(false)}/> : null*/}

      <div className='mb-4 w-full'>
        <Group direction='row' justify='between' align='center'>
          <Heading>{props.title}</Heading>

          <Group direction='row' gap={4} align='center' justify='center'>
            {props.children}
          </Group>
        </Group>
      </div>
    </>
  );
}

type BodyProps = {
  displayStyle?: 'vertical' | 'horizontal';
  itemComponent: React.FC<ListItemProps<any>>;
  errorElement: JSX.Element;
};

function Body({ displayStyle = 'vertical', itemComponent: ItemComponent, ...props }: BodyProps) {
  const { state, data } = useGalleryContext();

  const bodyStyle: CSSProperties = {
    display: 'flex',
    flexFlow: displayStyle === 'vertical' ? 'column' : 'row wrap',
    gap: '0.5rem',
  };

  return data.length ? (
    <div style={bodyStyle}>
      {data.map((item, index: number) => {
        const isSelected = state.selectedItems.includes(item);
        return <ItemComponent selected={isSelected} item={item} key={`gallery-item-${index}`} />;
      })}
    </div>
  ) : (
    props.errorElement
  );
}

/**
 * Triggers the modal for adding new data, if it is present.
 * @param param0
 * @returns
 */
function AddModalTrigger({ children }) {
  const { addModalRef } = useGalleryContext();
  return React.Children.map(children, (child: React.ReactElement) =>
    React.cloneElement(child, {
      ...child.props,
      title: 'Lisää uusi kohde...',
      onClick: () => {
        if (child.props.onClick) {
          child.props.onClick();
        }

        addModalRef.current?.toggleOpen(true);
      },
    })
  );
}

function AddModal({ children }) {
  const { addModalRef } = useGalleryContext();
  return React.Children.map(children, (child: React.ReactElement) =>
    React.cloneElement(child, {
      ...child.props,
      ref: addModalRef,
    })
  );
}

function DeleteModal({ children }) {
  const { deleteModalRef } = useGalleryContext();
  return React.Children.map(children, (child: React.ReactElement) =>
    React.cloneElement(child, {
      ...child.props,
      ref: deleteModalRef,
    })
  );
}

function DeleteModalTrigger({ children }) {
  const { deleteModalRef, state } = useGalleryContext();

  return React.Children.map(children, (child: React.ReactElement) =>
    React.cloneElement(child, {
      ...child.props,
      title: child.props.title || 'Poista valitut kohteet...',
      hidden: state.selectedItems.length === 0,
      onClick: () => {
        if (child.props.onClick) {
          child.props.onClick();
        }

        deleteModalRef.current?.toggleOpen(true);
      },
    })
  );
}

type GalleryProps<T extends Kotidok.ItemType> = React.PropsWithChildren & {
  data: T[];
};

type GalleryContextValueType = {
  data: Kotidok.ItemType[];
  state: StateType<Kotidok.ItemType>;
  props: GalleryProps<Kotidok.ItemType>;

  addModalRef: MutableRefObject<ModalRefType>;
  deleteModalRef: MutableRefObject<ModalRefType>;

  dispatch: React.Dispatch<ActionType<Kotidok.ItemType>>;
};

const GalleryContext = createContext<GalleryContextValueType | null>(null);

export function Gallery<T extends Kotidok.ItemType>(props: GalleryProps<T>) {
  const { state, dispatch } = useGallery(props.data);
  const addModalRef = useRef<ModalRefType>(null);
  const deleteModalRef = useRef<ModalRefType>(null);

  const contextValue: GalleryContextValueType = {
    data: props.data,
    state,
    props,

    addModalRef,
    deleteModalRef,
    dispatch,
  };

  return (
    <GalleryContext.Provider value={contextValue}>
      <div className='relative flex flex-col flex-1 text-white z-[2] w-full'>{props.children}</div>
    </GalleryContext.Provider>
  );
}

Gallery.Header = Header;
Gallery.Body = Body;
Gallery.AddModal = AddModal;
Gallery.DeleteModal = DeleteModal;
Gallery.AddModalTrigger = AddModalTrigger;
Gallery.DeleteModalTrigger = DeleteModalTrigger;

type DeleteSelectedItemsModalProps<T extends Kotidok.ItemType> = {
  deleteMethod: (item: T) => Promise<void>;
};

/**The global modal displayed when deleting multiple selected items at once. */
Gallery.DeleteSelectedItemsModal = function <T extends Kotidok.ItemType>({ deleteMethod }: DeleteSelectedItemsModalProps<T>) {
  const { state, dispatch } = useGalleryContext();
  const [status, setStatus] = useState<'idle' | 'loading'>('idle');

  const executeDelete = () => {
    const promises: Promise<void>[] = [];
    for (const item of state.selectedItems) {
      promises.push(deleteMethod(item as TODO));
    }
    setStatus('loading');
    Promise.all(promises)
      .catch(err => toast.error('Joidenkin kohteiden poisto epäonnistui!'))
      .finally(() => setStatus('idle'));
  };

  const loading = status === 'loading';

  return (
    <ExperimentalModal>
      <ExperimentalModal.Header>
        <h1 className='text-xl text-slate-500'>Poista Valitut Kohteet</h1>
        <ExperimentalModal.CloseTrigger>
          <CloseButton />
        </ExperimentalModal.CloseTrigger>
      </ExperimentalModal.Header>

      <ExperimentalModal.Body>
        <div className='flex flex-col gap-4'>
          <p className='text-slate-500'>Olet poistamassa seuraavia kohteita:</p>
          <ul className='text-slate-500'>
            {state.selectedItems.map(item => (
              <li>{item.title}</li>
            ))}
          </ul>
        </div>
      </ExperimentalModal.Body>

      <ExperimentalModal.Footer>
        <ExperimentalModal.CloseTrigger>
          <Button variant='secondary' disabled={loading}>
            <span>Peruuta</span>
          </Button>
        </ExperimentalModal.CloseTrigger>

        <Button variant='primary-dashboard' disabled={loading} loading={loading} onClick={executeDelete}>
          <span className='mx-8'>Poista</span>
        </Button>
      </ExperimentalModal.Footer>
    </ExperimentalModal>
    /*
        <DeleteModal2 
            {...props} 
            targetsToDelete={state.selectedItems} 

            deleteMethod={deleteMethod}

            resetSelectedTargets={() => dispatch({
                type: 'reset_selected',
            })}/>
            */
  );
};

export function useGalleryContext() {
  const context = useContext(GalleryContext);
  if (!context) throw new Error('useGalleryContext must be used within the scope of a GalleryContext!');
  return context;
}
