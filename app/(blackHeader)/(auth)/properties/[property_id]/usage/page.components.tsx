'use client';

import { ContentCard } from 'kotilogi-app/components/RoundedBox/RoundedBox';
import { useRef } from 'react';
import { UsageColumnChart } from 'kotilogi-app/components/Experimental/Chart/Chart';
import { UsagePieChart } from '@/components/UsagePage/PieChart';
import { colors } from 'kotilogi-app/apex.config';
import { UsageDataCategorized } from '@/components/UsagePage/UsageDataCategorized';
import { TotalPrice } from '@/components/UsagePage/TotalPrice';
import { AllUsageDataChart } from '@/components/UsagePage/AllUsageDataChart';
import { DateRangeSelector } from '@/components/DateRangeSelector/DateRangeSelector';
import { DataList } from '@/components/UsagePage/DataList';
import { ModalRefType } from '@/components/Experimental/Modal/Modal';
import AddUsageModal from './AddUsageModal';
import { AddButton } from '@/components/new/Gallery/GalleryBase/Buttons';
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

type ControlsProps = {
  timestamps: { time: string }[];
  currentYear: string;
  type: Kotidok.UsageTypeType;
};

export function Controls({ timestamps, currentYear, type }: ControlsProps) {
  const addModalRef = useRef<ModalRefType>(null);

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
          <div className='flex gap-2 items-baseline xs:block lg:hidden cursor-pointer'>
            <span className='text-sm text-slate-500'>Suodata: </span>
            <i className='fa fa-filter text-2xl'></i>
          </div>
        </VisibilityProvider.Trigger>

        <VisibilityProvider.Target>
          <MobileUsageFilterModal
            type={type}
            initialYear={currentYear}
            timestamps={timestamps}
          />
        </VisibilityProvider.Target>
      </VisibilityProvider>

      <AddUsageModal ref={addModalRef} />
      <SelectablesProvider.HideIfNoneSelected>
        <div className='animate-slideup-fast'>
          <ListHeaderControlButtons>
            <CancelSelectionButton />

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
      <AddButton onClick={() => addModalRef.current?.toggleOpen(true)} />
    </div>
  );
}

function DataRing({ data, year }) {
  return (
    <div className='flex justify-center items-center relative'>
      <UsagePieChart data={data} />
      <div className='absolute text-2xl text-slate-500'>{year}</div>
    </div>
  );
}

type PageContentProps = {
  data: Kotidok.UsageType[];
  displayYear: string;
  type: Kotidok.UsageTypeType | 'all';
};

export function PageContent({ data, displayYear, type }: PageContentProps) {
  const getChart = () => {
    if (type === 'all') {
      return <AllUsageDataChart data={data} />;
    } else {
      return (
        <UsageColumnChart
          data={data}
          columnColor={colors[type]}
          options={{
            chart: {
              width: '100%',
            },
            title: {
              text: 'Kulutus',
            },
          }}
        />
      );
    }
  };

  return (
    <div className='flex xs:flex-col lg:flex-row gap-2 w-full max-h-full'>
      <div className='flex-[1]'>
        <ContentCard title='Yhteenveto'>
          <div className='flex flex-col gap-2'>
            <div className='xs:hidden lg:block'>{getChart()}</div>

            <div className='flex-1 lg:flex xs:flex-col lg:flex-row justify-center items-center'>
              <div className='xs:mb-8 lg:m-0'>
                <TotalPrice data={data} />
              </div>

              <DataRing
                data={data}
                year={displayYear}
              />
              {type === 'all' ? <UsageDataCategorized data={data} /> : null}
            </div>
          </div>
        </ContentCard>
      </div>

      <div className='flex-1 overflow-y-scroll max-h-[100%]'>
        <ContentCard title='Tiedot'>
          <DataList data={data} />
        </ContentCard>
      </div>
    </div>
  );
}
