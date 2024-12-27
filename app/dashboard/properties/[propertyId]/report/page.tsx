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

  const [propertyType] = await db('property.overview')
    .join('types.property_type', {
      'types.property_type.id': 'property.overview.property_type_id',
    })
    .where({ 'property.overview.id': propertyId })
    .pluck('types.property_type.name');

  const [buildingMaterial] = await db('buildings.data')
    .join('buildings.materials', {
      'buildings.data.building_material_id': 'buildings.materials.id',
    })
    .where({ 'buildings.data.property_id': propertyId })
    .pluck('buildings.materials.name');

  const [roofMaterial] = await db('roofs.data')
    .join(db.raw('roofs.materials on roofs.materials.id = roofs.data."roofMaterialId"'))
    .where({ 'roofs.data.property_id': propertyId })
    .pluck('roofs.materials.name');

  const [roofType] = await db('roofs.data')
    .join(db.raw('types.roof_type on types.roof_type.id = roofs.data."roofTypeId"'))
    .where({ 'roofs.data.property_id': propertyId })
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
          ownerCount,
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
