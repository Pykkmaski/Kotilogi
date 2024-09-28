'use server';

export const addRoofAction = async (propertyId: string, data: TODO) => {
  try {
    throw new Error('Action not implemented!');
  } catch (err) {
    console.error(err.message);
    return {
      status: 500,
      statusText: 'Palvelinvirhe!',
    };
  }
};
