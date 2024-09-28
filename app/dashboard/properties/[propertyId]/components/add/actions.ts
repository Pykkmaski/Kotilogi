'use server';

import { addComponent } from 'kotilogi-app/dataAccess/components';

export const addComponentAction = async (propertyId: string, data: any) => {
  try {
    await addComponent(propertyId, data);
    return {
      status: 200,
      statusText: 'Osan lisäys onnistui!',
    };
  } catch (err) {
    const msg = err.message;
    if (msg.includes('duplicate')) {
      return {
        status: 409,
        statusText: 'Talolle on jo määritelty ulkopuoli!',
      };
    } else {
      console.error(err.message);
      return {
        status: 500,
        statusText: 'Palvelinvirhe!',
      };
    }
  }
};
