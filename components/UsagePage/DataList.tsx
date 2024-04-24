'use client';

import { createContext, useContext, useRef, useState } from 'react';
import Modal, { ModalProps } from '../Modals/Modal';
import { Input } from '../Input/Input';
import { PrimaryButton } from '../Button/PrimaryButton';
import { SecondaryButton } from '../Button/SecondaryButton';
import toast from 'react-hot-toast';
import * as usage from '@/actions/usage';
import { splitByMonth } from 'kotilogi-app/actions/usage.utils';
import { monthNameToLang } from 'kotilogi-app/utils/translate/planNameToLang';
import { Icon } from './Icon';
import { ModalRefType } from '../Experimental/Modal/Modal';
import { EditUsageTrigger } from './EditUsageTrigger';
import { VisibilityProvider } from '../Util/VisibilityProvider';
import { SelectablesProvider } from '../Util/SelectablesProvider';

const ListItemContext = createContext<any>(null);

type ListItemProps = {
  item: Kotidok.UsageType;
};

function Item({ item }: ListItemProps) {
  const deleteItem = () => {
    const c = confirm('Olet poistamassa tietoa. Oletko varma?');
    if (!c) return;

    const loadingToast = toast.loading('Poistetaan tietoa...');

    usage
      .del(item)
      .then(() => toast.success('Tieto poistettu.'))
      .catch(err => toast.error(err.message))
      .finally(() => toast.dismiss(loadingToast));
  };

  const getUnits = () => (item.type === 'heat' ? 'mw/h' : item.type === 'water' ? 'L' : 'kw/h');
  return (
    <ListItemContext.Provider value={{ item }}>
      <span className='flex p-2 rounded-lg shadow-lg text-slate-500 justify-between border-gray-100 border hover:bg-orange-100'>
        <div className='flex gap-4 items-center'>
          <Icon type={item.type} />
          <h1 className='text-slate-500 font-semibold flex-1'>{item.price.toFixed(2)}€</h1>
          <span className='text-black'>
            {item.unitAmount}
            <span className='text-sm text-slate-500'>{getUnits()}</span>
          </span>
          <span className='text-sm flex-1 xs:hidden lg:hidden'>{item.time}</span>
        </div>

        <div className='flex gap-2 items-center'>
          <EditUsageTrigger />
          <VisibilityProvider>
            <VisibilityProvider.Trigger>
              <span
                className='font-semibold cursor-pointer'
                onClick={deleteItem}>
                <i
                  className='fa fa-trash'
                  title='Poista...'
                />
              </span>
            </VisibilityProvider.Trigger>
            <VisibilityProvider.Target></VisibilityProvider.Target>
          </VisibilityProvider>
        </div>
      </span>
    </ListItemContext.Provider>
  );
}

type DataListProps = {
  data: Kotidok.UsageType[];
};

export function DataList({ data }: DataListProps) {
  const dataSorted = data.sort((a, b) => {
    const timeA = new Date(a.time).getTime();
    const timeB = new Date(b.time).getTime();

    return timeA - timeB;
  });

  const Divider = ({ month, margin }) => (
    <div
      className={`w-full border-b border-slate-200 mt-${margin}`}
      key={`divider-${month}`}>
      {month}
    </div>
  );

  const getElementsSortedByMonth = (data: Kotidok.UsageType[]) => {
    const splitData = splitByMonth(data);
    const elements: JSX.Element[] = [];

    for (var month = 0; month < splitData.length; ++month) {
      const currentMonthData = splitData[month];
      if (currentMonthData.length) {
        elements.push(
          <>
            <Divider
              month={monthNameToLang(month, 'fi')}
              margin={elements.length === 0 ? 0 : 4}
            />
            {currentMonthData.map(d => (
              <Item
                item={d}
                key={d.toString()}
              />
            ))}
          </>
        );
      }
    }
    return elements;
  };

  return (
    <div className='flex flex-col gap-2 max-h-full overflow-hidden'>
      {getElementsSortedByMonth(dataSorted)}
    </div>
  );
}

export function useItemContext() {
  const context = useContext(ListItemContext);
  if (!context) throw new Error('useItemContext must be used within the scope of an ItemContext');
  return context;
}
