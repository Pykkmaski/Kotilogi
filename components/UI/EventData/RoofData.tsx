import { DataDisplay } from '../DataDisplay';

export function RoofData({ data }) {
  const getTitle = (key: string) => {
    switch (key) {
    }
  };
  return (
    <>
      <DataDisplay
        title='Tyyppi'
        value={data.eventTypeLabel}
      />
    </>
  );
}
