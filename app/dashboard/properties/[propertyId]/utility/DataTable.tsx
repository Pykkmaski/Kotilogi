'use client';

import { AgGridReact } from 'ag-grid-react';
import { useUtilityProviderContext } from './UtilityContext';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { timestampToISOString } from 'kotilogi-app/utils/timestampToISOString';
import { useState } from 'react';
import { Button } from '@mui/material';
import { Menu } from '@/components/New/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { deleteUtilityAction } from './actions';

export function DataTable() {
  const { data } = useUtilityProviderContext();

  const deleteEntry = async (id: string) => {
    const c = confirm('Poistetaanko tieto?');
    if (!c) return;

    await deleteUtilityAction(id);
  };

  const rows = data.map(d => {
    return {
      ...d,
      time: new Date(parseInt(d.time)),
    };
  });

  const cols = [
    {
      headerName: 'Toiminnot',
      width: '100px',
      cellRenderer: params => {
        return (
          <Menu trigger={<MenuIcon />}>
            <button onClick={() => deleteEntry(params.data.id)}>Poista</button>
          </Menu>
        );
      },
    },

    {
      field: 'id',
      headerName: 'Tunnus',
    },
    {
      field: 'time',
      headerName: 'Aika',
    },
    {
      field: 'typeLabel',
      headerName: 'Tyyppi',
    },

    {
      field: 'monetaryAmount',
      headerName: 'Hinta (€)',
      filter: true,
      editable: true,
    },
    {
      field: 'unitAmount',
      headerName: 'Yksikkömäärä',
    },
  ] as TODO;

  return (
    <div
      className='ag-theme-quartz shadow-sm' // applying the Data Grid theme
      style={{ height: 500 }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact
        pagination={true}
        rowData={rows}
        columnDefs={cols}
        rowSelection='multiple'
        localeText={{
          equals: 'Yhtä kuin',
          notEqual: 'Ei yhtä kuin',

          lessThan: 'Vähemmän kuin',
          greaterThan: 'Enemmän kuin',
          contains: 'Sisältää',
          notContains: 'Ei sisällä',
          startsWith: 'Alkaa',
          endsWith: 'Loppuu',
          greaterThanOrEqual: 'Enemmän tai yhtä kuin',
          lessThanOrEqual: 'Vähemmän tai yhtä kuin',
          inRange: 'Väliltä',
          blank: 'Tyhjä',
          notBlank: 'Ei tyhjä',
        }}
      />
    </div>
  );
}
