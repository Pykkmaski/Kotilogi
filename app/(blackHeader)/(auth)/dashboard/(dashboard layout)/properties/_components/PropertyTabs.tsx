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
import { MuiAddPropertyDialog } from './MuiAddPropertyDialog';

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
            return (
              <MuiAddPropertyDialog
                show={show}
                handleClose={handleClose}
              />
            );
          }}
        />
      </Tabs>

      <PropertyOverview selectedProperty={properties.find(prop => prop.id === currentPropertyId)} />
    </>
  );
}
