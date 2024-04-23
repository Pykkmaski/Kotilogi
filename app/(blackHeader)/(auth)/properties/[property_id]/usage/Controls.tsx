'use client';

import { DateRangeSelector } from '@/components/DateRangeSelector/DateRangeSelector';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider';
import { MobileUsageFilterModal } from './MobileUsageFilterModal';

import { SelectablesProvider } from '@/components/Util/SelectablesProvider';
import {
  CancelSelectionButton,
  DeleteButton,
  ListHeaderControlButtons,
} from '@/components/Prefabs/List.prefabs';
import { Modal } from '@/components/Experimental/Modal/PlainModal/Modal';
import Button from '@/components/Button/Button';
import toast from 'react-hot-toast';
import { del as deleteUsage } from '@/actions/usage';
import { AddUsageModalTrigger } from './AddUsageModalTrigger';
import { useUsageProviderContext } from './UsageProvider';

export function Controls() {
  const { timestamps, displayYear: currentYear, type } = useUsageProviderContext();

  return (
    <div className='flex xs:gap-8 lg:gap-4 items-center'>
      <div className='flex gap-2 items-center xs:hidden lg:block'>
        <span className='text-slate-500'>Suodata:</span>
        <DateRangeSelector
          timestamps={timestamps}
          currentYear={currentYear}
        />
      </div>

      <VisibilityProvider>
        <VisibilityProvider.Trigger>
          <div className='flex items-baseline xs:block lg:hidden cursor-pointer'>
            <span className='text-sm text-slate-500'>Suodata: </span>
            <i className='fa fa-filter text-2xl'></i>
          </div>
        </VisibilityProvider.Trigger>

        <VisibilityProvider.Target>
          <MobileUsageFilterModal />
        </VisibilityProvider.Target>
      </VisibilityProvider>

      <SelectablesProvider.HideIfNoneSelected>
        <div className='animate-slideup-fast'>
          <ListHeaderControlButtons>
            <SelectablesProvider.ResetSelectedTrigger>
              <CancelSelectionButton />
            </SelectablesProvider.ResetSelectedTrigger>

            <VisibilityProvider>
              <VisibilityProvider.Trigger>
                <DeleteButton />
              </VisibilityProvider.Trigger>

              <VisibilityProvider.Target>
                <Modal>
                  <Modal.DefaultContentContainer>
                    <Modal.HeaderWithTitle title='Poista valitut tiedot' />
                    <Modal.Body>Haluatko varmasti poistaa valitsemasi tiedot?</Modal.Body>
                    <Modal.Footer>
                      <VisibilityProvider.Trigger>
                        <Button variant='secondary'>Ei</Button>
                      </VisibilityProvider.Trigger>

                      <SelectablesProvider.ActionTrigger
                        action={async selectedItems => {
                          const promises = selectedItems.map(item => deleteUsage(item));
                          await Promise.all(promises)
                            .then(() => toast.success('Tiedot poistettu!'))
                            .catch(err => toast.error(err.message));
                        }}>
                        <Button variant='primary-dashboard'>
                          <span className='mx-4'>Kyllä</span>
                        </Button>
                      </SelectablesProvider.ActionTrigger>
                    </Modal.Footer>
                  </Modal.DefaultContentContainer>
                </Modal>
              </VisibilityProvider.Target>
            </VisibilityProvider>
          </ListHeaderControlButtons>
        </div>
      </SelectablesProvider.HideIfNoneSelected>
      <AddUsageModalTrigger />
    </div>
  );
}
