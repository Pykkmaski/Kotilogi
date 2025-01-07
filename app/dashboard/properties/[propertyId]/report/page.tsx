import { ContentBox } from '@/components/New/Boxes/ContentBox';
import { OverviewImage } from '@/components/New/Boxes/OverviewBox';
import { Document, Page, PDFViewer } from '@react-pdf/renderer';
import { events } from 'kotilogi-app/dataAccess/events';
import { properties } from 'kotilogi-app/dataAccess/properties';
import db from 'kotilogi-app/dbconfig';
import { Report, ReportProvider } from './Report';
import { heating } from 'kotilogi-app/dataAccess/heating';

export default async function ReportPage({ params }) {
  const { propertyId } = params;

  const data = await events.get({
    parentId: propertyId,
  });

  const property = await properties.get(propertyId);
  const [mainImageId] = await db('data_mainImages')
    .where({ objectId: propertyId })
    .pluck('imageId');

  const heatingSystem = await heating.getPrimary(propertyId, db);

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

  const [roofMaterial] = await db('roof')
    .join(db.raw('types.roof_material_type on types.roof_material_type.id = roof."roofMaterialId"'))
    .where({ 'roof.property_id': propertyId })
    .pluck('types.roof_material_type.name');

  const [roofType] = await db('roof')
    .join(db.raw('types.roof_type on types.roof_type.id = roof."roofTypeId"'))
    .where({ 'roof.property_id': propertyId })
    .pluck('types.roof_type.name');

  const [{ count: ownerCount }] = await db('data_propertyOwners')
    .where({ propertyId })
    .count('*', { as: 'count' });

  console.log(roofMaterial, roofType);
  return (
    <main className='w-full h-full'>
      <ReportProvider
        content={{
          property,
          events: data,
          propertyType,
          ownerCount: ownerCount as TODO,
          heatingSystem,
          mainImageId,
          buildingMaterial,
          roofMaterial,
          roofType,
        }}>
        <Report />
      </ReportProvider>
    </main>
  );
}
