'use client';

import { VisibilityProvider } from '@/components/Util/VisibilityProvider';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
} from '@mui/material';
import { NewAddPropertyModalTrigger } from './NewAddPropertyModal/NewAddPropertyModal';
import { addProperty } from '@/actions/experimental/properties';
import { Add, Check, Home } from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { DialogControl } from '@/components/Util/DialogControl';
import { PropertyForm, PropertyFormContext } from './NewAddPropertyModal/Form/PropertyForm';
import { useInputData } from '@/hooks/useInputData';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { TargetTypeField } from './NewAddPropertyModal/Form/TargetTypeField';
import { GeneralField } from './NewAddPropertyModal/Form/GeneralField';
import { ExteriorField } from './NewAddPropertyModal/Form/ExteriorField';
import { YardField } from './NewAddPropertyModal/Form/YardField';
import { InteriorField } from './NewAddPropertyModal/Form/InteriorField';
import { HeatingField } from './NewAddPropertyModal/Form/HeatingField';
import { OtherInfoField } from './NewAddPropertyModal/Form/OtherInfoField';
import { PropertyOverview } from './PropertyOverview';

type PropertyTabsProps = {
  properties: Kotidok.PropertyType[];
  currentPropertyId: Kotidok.IdType;
};

export function PropertyTabs({ properties, currentPropertyId }: PropertyTabsProps) {
  const currentTabIndex = properties.findIndex(prop => prop.id === currentPropertyId);

  return (
    <>
      <Tabs value={currentTabIndex}>
        {properties.map((p, i) => (
          <Tab
            label={p.title + p.appartmentNumber || ''}
            component={Link}
            href={`/dashboard/properties?property_id=${p.id}`}
            key={`property-tab-${i}`}
          />
        ))}

        <DialogControl
          trigger={({ onClick }) => {
            return (
              <Button
                title='Lisää uusi kohde...'
                onClick={onClick}
                variant='text'>
                <Add />
              </Button>
            );
          }}
          control={({ show, handleClose }) => {
            const { data, updateData } = useInputData({} as Kotidok.PropertyType);
            const [status, setStatus] = useState<'idle' | 'loading'>('idle');
            const loading = status === 'loading';

            return (
              <Dialog
                fullWidth
                maxWidth='lg'
                sx={{
                  xs: {
                    width: '100%',
                    height: '100%',
                  },
                }}
                PaperProps={{
                  component: 'form',

                  onChange: updateData,
                  id: 'add-property-form',
                  onSubmit: async e => {
                    e.preventDefault();
                    setStatus('loading');

                    const dataToSubmit = {
                      ...data,
                      propertyNumber:
                        data.targetType === 'Kiinteistö' ? data.propertyNumber : undefined,
                      appartmentNumber:
                        data.targetType === 'Huoneisto' ? data.appartmentNumber : undefined,
                      yardArea: data.yardOwnership !== 'Ei Mitään' ? data.yardArea : undefined,
                    };

                    addProperty(dataToSubmit)
                      .then(() => {
                        setStatus('idle');
                        handleClose();
                      })
                      .catch(err => toast.error(err.message));
                  },
                }}
                open={show}
                onClose={handleClose}>
                <DialogTitle className='text-slate-500 flex items-center gap-4'>
                  <Home /> Lisää Uusi Kohde
                </DialogTitle>
                <DialogContent>
                  <PropertyFormContext.Provider value={{ property: data }}>
                    <TargetTypeField />
                    <GeneralField />
                    <ExteriorField />
                    <YardField />
                    <InteriorField />

                    <HeatingField />
                    <OtherInfoField />
                  </PropertyFormContext.Provider>
                </DialogContent>
                <DialogActions>
                  <Button
                    disabled={loading}
                    onClick={handleClose}>
                    Peruuta
                  </Button>
                  <Button
                    type='submit'
                    startIcon={<Check />}
                    disabled={loading}>
                    Vahvista
                  </Button>
                </DialogActions>
              </Dialog>
            );
          }}
        />
      </Tabs>

      <PropertyOverview selectedProperty={properties.find(prop => prop.id === currentPropertyId)} />
    </>
  );
}
