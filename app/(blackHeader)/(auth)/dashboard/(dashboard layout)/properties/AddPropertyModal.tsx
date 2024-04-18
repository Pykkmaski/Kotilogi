import { MutableRefObject, createContext, forwardRef, useContext, useRef } from 'react';
import Modal, { ModalRefType } from '../../../../../../components/Experimental/Modal/Modal';
import { CloseButton } from '@/components/CloseButton';
import Button from '@/components/Button/Button';
import { Input, Select, Textarea } from '@/components/Input/Input';
import { buildingTypes, serviceName } from 'kotilogi-app/constants';
import Link from 'next/link';
import SubmitDataModal, { useSubmitDataModalContext } from '@/components/Experimental/Modal/SubmitDataModal';
import toast from 'react-hot-toast';
import { addProperty, transferOwnership } from 'kotilogi-app/actions/experimental/properties';

type StepType = 'intro' | 'create_new' | 'add_with_token';

type AddPropertyModalContextProps = {
  step: StepType;
  owner: string;
  modalRef: MutableRefObject<ModalRefType>;
  formId: string;
  formRef: MutableRefObject<HTMLFormElement>;
  updateData: (e: TODO) => void;
  onSubmit: (e: TODO) => Promise<void>;
  setStep: React.Dispatch<React.SetStateAction<StepType>>;
};

const AddPropertyModalContext = createContext<AddPropertyModalContextProps>(null);

function PricingDescription() {
  const LongDescription = () => (
    <small className='text-sm text-slate-500 text-right mt-4'>
      Jos maksua ei makseta kuukauden sisällä, lukkiutuu tilisi, ja avautuu kun maksu on suoritettu.
      <br />
      Tapahtuman hinta lisätään nykyiseen ostoskoriisi, joka löytyy{' '}
      <Link href='/dashboard/cart' target='_blank' className='text-orange-500'>
        täältä.
      </Link>
      <br />
      {serviceName} ei suorita maksujen palautuksia.
    </small>
  );

  return (
    <div className='flex flex-col w-full'>
      <div className='flex items-center w-full gap-4 justify-end'>
        <span className='text-slate-500'>
          Talojen vuosimaksu on <span className='text-green-600 text-lg'>(9,90€)</span>
        </span>
      </div>
    </div>
  );
}

function IntroStep() {
  const { setStep } = useAddPropertyModalContext();

  const SelectorButton = ({ children, ...props }: React.ComponentProps<'div'>) => {
    return (
      <div {...props} className='aspect-square rounded-lg bg-gray-200 flex items-center justify-center text-lg p-4 cursor-pointer'>
        {children}
      </div>
    );
  };

  return (
    <div className='w-full flex justify-center items-center gap-4'>
      <SelectorButton onClick={() => setStep('create_new')}>
        <span>1</span>
      </SelectorButton>

      <SelectorButton onClick={() => setStep('add_with_token')}>
        <span>2</span>
      </SelectorButton>
    </div>
  );
}

type CreateNewStepProps = {
  ref: MutableRefObject<ModalRefType>;
};

function CreateNewStep() {
  return (
    <SubmitDataModal.Form className='flex flex-col gap-4 xs:w-full'>
      <Input
        name='propertyNumber'
        label='Kiinteistötunnus'
        description='Talon kiinteistötunnus'
        placeholder='Kirjoita talon kiinteistötunnus...'
        required={true}
        autoComplete='off'
      />

      <Input name='title' label='Osoite' description='Talon katuosoite.' placeholder='Kirjoita osoite...' required={true} autoComplete='off' />

      <Input
        name='zipCode'
        label='Postinumero'
        description='Talon viisinumeroinen postinumero.'
        placeholder='Kirjoita postinumero...'
        maxLength={5}
        minLength={5}
        required={true}
        autoComplete='off'
      />

      <Input name='buildYear' label='Rakennusvuosi' description='Vuosi jona talo valmistui.' placeholder='Kirjoita talon rakennusvuosi...' required={true} autoComplete='off' />

      <Select name='buildingType' label='Talotyyppi' description='Talon tyyppi.'>
        {buildingTypes.map(type => (
          <Select.Option key={type}>{type}</Select.Option>
        ))}
      </Select>

      <Textarea label='Kuvaus' description='Talon lyhyt kuvaus.' placeholder='Kirjoita kuvaus...' spellCheck={false} name='description' className='xs:hidden lg:block' />

      <PricingDescription />
    </SubmitDataModal.Form>
  );
}

function CreateFromTokenStep() {
  const { status } = useSubmitDataModalContext();
  const tokenInputRef = useRef<HTMLInputElement>(null);

  const checkToken = async () => {
    const token = tokenInputRef.current.value;
    transferOwnership(token)
      .then(() => toast.success('Talon omistajuus vastaanotettu!'))
      .catch(() => toast.error('Omistajuuden vastaanotto epäonnistui!'));
  };

  const loading = status === 'loading';
  return (
    <div className='flex flex-col'>
      <h1 className='text-xl'>Luo varmenteella</h1>
      <input ref={tokenInputRef} />
      <Button variant='primary-dashboard' loading={loading} disabled={loading || !tokenInputRef.current} onClick={checkToken}>
        <span className='mx-8'>Luo</span>
      </Button>
    </div>
  );
}

type AddPropertyModalProps = {
  owner: string;
};

function AddPropertyModal({ owner }: AddPropertyModalProps, ref: React.Ref<ModalRefType>) {
  return (
    <SubmitDataModal
      ref={ref}
      submitMethod={async data => {
        const propertyData = {
          ...data,
          refId: owner,
        };

        await addProperty(propertyData as TODO)
          .then(() => toast.success('Talo lisätty onnistuneesti!'))
          .catch(err => {
            const msg = err.message.toUpperCase();
            if (msg.includes('SIZE')) {
              toast.error('Jokin tiedostoista on liian suuri!');
            } else if (msg.includes('TYPE')) {
              toast.error('Jonkin tiedoston muotoa ei tueta!');
            } else {
              throw err;
            }
          });
      }}>
      <Modal.Header>
        <h1 className='text-xl text-slate-500'>Lisää Talo</h1>
        <SubmitDataModal.CloseTrigger>
          <CloseButton />
        </SubmitDataModal.CloseTrigger>
      </Modal.Header>

      <Modal.Body>
        <CreateNewStep />
      </Modal.Body>

      <Modal.Footer>
        <SubmitDataModal.CloseTrigger>
          <Button variant='secondary'>
            <span>Peruuta</span>
          </Button>
        </SubmitDataModal.CloseTrigger>

        <SubmitDataModal.SubmitTrigger>
          <Button variant='primary-dashboard'>
            <span className='mx-8'>Lähetä</span>
          </Button>
        </SubmitDataModal.SubmitTrigger>
      </Modal.Footer>
    </SubmitDataModal>
  );
}

function useAddPropertyModalContext() {
  const ctx = useContext(AddPropertyModalContext);
  if (!ctx) throw new Error('useAddPropertyModalContext must be used within the scope of an AddPropertyModalContext!');
  return ctx;
}
export default forwardRef(AddPropertyModal);
