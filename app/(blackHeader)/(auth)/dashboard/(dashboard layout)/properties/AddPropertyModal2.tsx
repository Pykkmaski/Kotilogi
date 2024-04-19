import { CloseButton } from '@/components/CloseButton';
import { Modal } from '@/components/Experimental/Modal/PlainModal/Modal';
import { Input } from '@/components/Input/Input';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider/VisibilityProvider';
import { AddButton } from '@/components/new/Gallery/GalleryBase/Buttons';
import { useInputData } from 'kotilogi-app/hooks/useInputFiles';

export function AddPropertyModal2({ owner }) {
  const { data, updateData } = useInputData({ refId: owner });

  return (
    <VisibilityProvider>
      <VisibilityProvider.Trigger>
        <AddButton />
      </VisibilityProvider.Trigger>

      <VisibilityProvider.Target>
        <Modal>
          <div className='flex flex-col bg-white rounded-lg overflow-hidden text-slate-500'>
            <Modal.Header>
              <h1>Lisää Talo</h1>
              <VisibilityProvider.Trigger>
                <CloseButton />
              </VisibilityProvider.Trigger>
            </Modal.Header>

            <Modal.Body>
              <form onChange={updateData} className='flex flex-col gap-2'>
                <Input label='Kiinteistötunnus' name='buildingNumber' required />
                <Input label='Osoite' name='title' required />
              </form>
            </Modal.Body>
          </div>
        </Modal>
      </VisibilityProvider.Target>
    </VisibilityProvider>
  );
}
