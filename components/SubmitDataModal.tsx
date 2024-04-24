'use client';

import { Modal } from './Experimental/Modal/PlainModal/Modal';
import { VisibilityProvider } from './Util/VisibilityProvider';
import { MutableRefObject, createContext, useContext, useEffect, useId, useRef } from 'react';
import Button from './Button/Button';
import { useSubmitData } from 'hooks/useSubmitData';
import { createUseContextHook } from 'kotilogi-app/utils/createUseContext';
import { useInputFiles } from 'kotilogi-app/hooks/useInputFiles';
import React from 'react';

const SubmitDataModalProviderContext = createContext<{
  formId: string;
  formRef: MutableRefObject<HTMLFormElement | null>;
  status: string;
  updateData: (e: any) => void;
  updateDataViaProperty: (name: string, value: number | string) => void;
  submit: (e: any) => void;
  onInput: (e: any) => void;
} | null>(null);

type SubmitDataModalProviderProps = React.PropsWithChildren & {
  hidden?: boolean;
  submitMethod: (data: any, files?: FormData[]) => Promise<void>;
  inputValidator?: (e: TODO) => void;
};

/**A preset for creating modals containing a form that submits data to the server. */
export function SubmitDataModalProvider({
  children,
  hidden,
  submitMethod,
  inputValidator,
}: SubmitDataModalProviderProps) {
  const { updateData, updateDataViaProperty, updateFiles, submit, status } = useSubmitData(
    {},
    submitMethod
  );

  const formRef = useRef<HTMLFormElement>(null);
  const formId = useId();

  const onInput = (e: TODO) => {
    if (inputValidator) {
      inputValidator(e);
    }

    if (e.target.type === 'file') {
      updateFiles(e);
    } else {
      updateData(e);
    }
  };

  return (
    <Modal hidden={hidden}>
      <SubmitDataModalProviderContext.Provider
        value={{ formId, formRef, submit, onInput, updateData, updateDataViaProperty, status }}>
        {children}
      </SubmitDataModalProviderContext.Provider>
    </Modal>
  );
}

SubmitDataModalProvider.Form = ({ children }: React.PropsWithChildren) => {
  const { formId, onInput, formRef, submit, updateDataViaProperty } =
    useSubmitDataModalProviderContext();

  //Insert default values of the inputs into the contained data object
  const insertDefaultValues = children => {
    React.Children.map(children as React.ReactElement, child => {
      if (!child || !child.props) return;

      if (child.props.children) {
        return insertDefaultValues(child.props.children);
      } else {
        if (child.props.defaultValue) {
          const { name, defaultValue } = child.props;
          console.log('Setting default value: ', defaultValue, name);
          updateDataViaProperty(name, defaultValue);
        }
      }
    });
  };

  useEffect(() => {
    insertDefaultValues(children);
  }, []);

  return (
    <form
      id={formId}
      className='xs:p-2 flex flex-col gap-4 overflow-y-scroll overflow-hidden'
      onInput={onInput}
      ref={formRef}
      onSubmit={submit}>
      {children}
    </form>
  );
};

SubmitDataModalProvider.Footer = ({ cancelText = 'Cancel', submitText = 'Submit' }) => {
  const { formId, status } = useSubmitDataModalProviderContext();
  const loading = status === 'loading';

  return (
    <Modal.Footer>
      <div className='flex gap-4 items-center'>
        <VisibilityProvider.Trigger>
          <Button
            variant='secondary'
            type='button'>
            {cancelText}
          </Button>
        </VisibilityProvider.Trigger>

        <Button
          variant='primary-dashboard'
          type='submit'
          form={formId}
          loading={loading}
          disabled={loading}>
          <span className='mx-4 text-slate-100'>{submitText}</span>
        </Button>
      </div>
    </Modal.Footer>
  );
};

const useSubmitDataModalProviderContext = createUseContextHook(
  'SubmitDataModalProviderContext',
  SubmitDataModalProviderContext
);
