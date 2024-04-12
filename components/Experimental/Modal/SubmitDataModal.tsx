'use client';

import { MutableRefObject, ReactElement, createContext, forwardRef, useContext, useId, useRef, useState } from 'react';
import Modal, { ModalRefType } from './Modal';
import React from 'react';
import toast from 'react-hot-toast';
import Button from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { useInputData, useInputFiles } from 'kotilogi-app/hooks/useInputFiles';

type StatusType = 'idle' | 'loading';

type SubmitDataModalContextProps = {
  formId: string;
  status: StatusType;
  formRef: MutableRefObject<HTMLFormElement>;
  onSubmit: (e: TODO) => void;
  updateData: (e: TODO) => void;
  updateFiles: (e: TODO) => void;
  close: () => void;
};

const SubmitDataModalContext = createContext<SubmitDataModalContextProps>(null);

type SubmitDataModalProps = React.PropsWithChildren & {
  submitMethod: <T>(data: T, files?: FormData[]) => Promise<void>;
};

function SubmitDataModal({ children, submitMethod }: SubmitDataModalProps, ref: React.MutableRefObject<ModalRefType>) {
  const [status, setStatus] = useState<StatusType>('idle');
  const { data, updateData, reset } = useInputData({});
  const { files, updateFiles } = useInputFiles();

  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async e => {
    e.preventDefault();
    setStatus('loading');

    submitMethod(data, files)
      .then(() => {
        close();
      })
      .catch(err => toast.error(err.message))
      .finally(() => {
        setStatus('idle');
      });
  };

  const close = () => {
    ref.current?.toggleOpen(false);
    formRef.current?.reset();
    reset();
  };

  return (
    <Modal ref={ref}>
      <SubmitDataModalContext.Provider
        value={{
          status,
          formId,
          formRef,
          onSubmit,
          updateData,
          updateFiles,
          close,
        }}>
        {children}
      </SubmitDataModalContext.Provider>
    </Modal>
  );
}

function Form({ children, ...props }: React.ComponentProps<'form'>) {
  const { updateData, updateFiles, onSubmit, formId, formRef } = useSubmitDataModalContext();

  return (
    <form {...props} onSubmit={onSubmit} id={formId} ref={formRef}>
      {React.Children.map(children, (child: ReactElement) => {
        if (child.props.type !== 'file') {
          return React.cloneElement(child, {
            ...child.props,
            onInput: updateData,
          });
        } else {
          return React.cloneElement(child, {
            ...child.props,
            onChange: updateFiles,
          });
        }
      })}
    </form>
  );
}

/**
 * Triggers the submission of the form of the modal. Only accepts one button element as a child. Internally adds a 'submit' type and a form id prop to the passed button.
 * @param param0
 * @returns
 */
function SubmitTrigger({ children }) {
  const { formId, status } = useSubmitDataModalContext();
  const loading = status === 'loading';

  if (React.Children.count(children) !== 1) {
    throw new Error('The SubmitDataModal.SubmitTrigger must have exactly one child!');
  }

  return React.Children.map(children, (child: ReactElement) =>
    React.cloneElement(child, {
      ...child.props,
      type: 'submit',
      form: formId,
      loading,
      disabled: loading,
    })
  );
}

function CloseTrigger({ children }) {
  const { status, close } = useSubmitDataModalContext();
  const loading = status === 'loading';

  return React.Children.map(children, (child: ReactElement) =>
    React.cloneElement(child, {
      ...child.props,
      disabled: loading,
      onClick: close,
    })
  );
}

SubmitDataModal.Form = Form;
SubmitDataModal.SubmitTrigger = SubmitTrigger;
SubmitDataModal.CloseTrigger = CloseTrigger;

export function useSubmitDataModalContext() {
  const ctx = useContext(SubmitDataModalContext);
  if (!ctx) throw new Error('useSubmitDataModalContext must be used within the scope of a SubmitDataModalContext!');
  return ctx;
}

export default Object.assign(forwardRef(SubmitDataModal), {
  Form,
  SubmitTrigger,
  CloseTrigger,
});
