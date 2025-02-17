import { ContentBox } from '@/components/New/Boxes/ContentBox';
import { OverviewImage } from '@/components/New/Boxes/OverviewBox';
import { Document, Page, PDFViewer } from '@react-pdf/renderer';
import { events } from 'kotilogi-app/dataAccess/events';
import { properties } from 'kotilogi-app/dataAccess/properties';
import db from 'kotilogi-app/dbconfig';
import { Report, ReportProvider } from './Report';
import { heating } from 'kotilogi-app/dataAccess/heating';
import { roofs } from 'kotilogi-app/dataAccess/roofs';

export default async function ReportPage({ params }) {
  const { propertyId } = await params;

  const data = await events.get({
    property_id: propertyId,
  });

  const property = await properties.get(propertyId);
  const [mainImageId] = await db('data_mainImages')
    .where({ objectId: propertyId })
    .pluck('imageId');

  const heatingSystems = await heating.get(property.id, db);
  const [propertyType] = await db('property')
    .join('types.property_type', {
      'types.property_type.id': 'property.property_type_id',
    })
    .where({ 'property.id': propertyId })
    .pluck('types.property_type.name');

  const [buildingMaterial] = await db('building')
    .join('types.building_material_type', {
      'building.building_material_id': 'types.building_material_type.id',
    })
    .where({ 'building.property_id': propertyId })
    .pluck('types.building_material_type.name');

  const energyClass = await db('property')
    .where({ 'property.id': propertyId })
    .join(db.raw('types.energy_class_type as ec on ec.id = property.energy_class_id'))
    .select('energy_class_year as year', 'ec.name as energy_class')
    .first();

  const roof = await roofs.get(property.id, db);
  const { roof_material: roofMaterial, roof_type: roofType } = roof;

  const [{ count: ownerCount }] = await db('data_propertyOwners')
    .where({ propertyId })
    .count('*', { as: 'count' });

  return (
    <main className='w-full h-full'>
      <ReportProvider
        content={{
          property,
          events: data,
          propertyType,
          ownerCount: ownerCount as TODO,
          heatingSystems,
          mainImageId,
          buildingMaterial,
          roofMaterial,
          roofType,
          energyClass,
        }}>
        <Report />
      </ReportProvider>
    </main>
  );
}
