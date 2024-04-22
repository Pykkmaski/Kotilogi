import { Modal } from './Experimental/Modal/PlainModal/Modal';
import { VisibilityProvider } from './Util/VisibilityProvider';
import { MutableRefObject, createContext, useContext, useId, useRef } from 'react';
import Button from './Button/Button';
import { useSubmitData } from 'hooks/useSubmitData';

const SubmitDataModalProviderContext = createContext<{
  formId: string;
  formRef: MutableRefObject<HTMLFormElement | null>;
  status: string;
  updateData: (e: any) => void;
  submit: (e: any) => void;
  onInput: (e: any) => void;
} | null>(null);

type SubmitDataModalProviderProps = React.PropsWithChildren & {
  hidden?: boolean;
  submitMethod: (data: any, files?: File[]) => Promise<void>;
  inputValidator?: (e: TODO) => void;
};

/**A preset for creating modals containing a form that submits data to the server. */
export function SubmitDataModalProvider({
  children,
  hidden,
  submitMethod,
  inputValidator,
}: SubmitDataModalProviderProps) {
  const { updateData, submit, status } = useSubmitData({}, submitMethod);
  const formRef = useRef<HTMLFormElement>(null);
  const formId = useId();

  const onInput = (e: TODO) => {
    if (inputValidator) {
      inputValidator(e);
    }

    updateData(e);
  };

  return (
    <Modal hidden={hidden}>
      <SubmitDataModalProviderContext.Provider
        value={{ formId, formRef, submit, onInput, updateData, status }}>
        {children}
      </SubmitDataModalProviderContext.Provider>
    </Modal>
  );
}

SubmitDataModalProvider.Form = ({ children }: React.PropsWithChildren) => {
  const { formId, onInput, formRef, submit } = useSubmitDataModalProviderContext();

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
          <Button variant='secondary' type='button'>
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

function useSubmitDataModalProviderContext() {
  const ctx = useContext(SubmitDataModalProviderContext);
  if (!ctx)
    throw new Error(
      'useSubmitDataModalProviderContext can only be used within the scope of a SubmitDataModalProviderContext!'
    );
  return ctx;
}
