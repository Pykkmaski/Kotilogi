'use client';

import { AgGridReact } from 'ag-grid-react';
import { useUtilityProviderContext } from './UtilityContext';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

import MenuIcon from '@mui/icons-material/Menu';
import { deleteUtilityAction } from './actions';
import { VisibilityProvider } from '@/components/Util/VisibilityProvider';
import { VPMenu } from '@/components/UI/VPMenu';

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
          <VisibilityProvider>
            <VisibilityProvider.Trigger setAsAnchorForMUI>
              <MenuIcon />
            </VisibilityProvider.Trigger>

            <VisibilityProvider.Target>
              <VPMenu>
                <button onClick={() => deleteEntry(params.data.id)}>Poista</button>
              </VPMenu>
            </VisibilityProvider.Target>
          </VisibilityProvider>
        );
      },
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
    {
      field: 'time',
      headerName: 'Aika',
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
