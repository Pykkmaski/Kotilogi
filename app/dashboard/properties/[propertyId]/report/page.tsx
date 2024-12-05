import { ContentBox } from '@/components/New/Boxes/ContentBox';
import { OverviewImage } from '@/components/New/Boxes/OverviewBox';
import { Document, Page, PDFViewer } from '@react-pdf/renderer';
import { events } from 'kotilogi-app/dataAccess/events';
import { properties } from 'kotilogi-app/dataAccess/properties';
import db from 'kotilogi-app/dbconfig';
import { Report, ReportProvider } from './Report';

export default async function ReportPage({ params }) {
  const { propertyId } = params;

  const data = await events.get({
    parentId: propertyId,
  });

  const property = await properties.get(propertyId);
  const [mainImageId] = await db('data_mainImages')
    .where({ objectId: propertyId })
    .pluck('imageId');

  const [heatingSystem] = await db('property.overview')
    .where({ 'property.overview.id': propertyId })
    .join('heating.types', { 'heating.types.id': 'property.overview.primaryHeatingSystemId' })
    .pluck('heating.types.name');

  const [propertyType] = await db('property.overview')
    .join('property.propertyTypes', {
      'property.propertyTypes.id': 'property.overview.propertyTypeId',
    })
    .where({ 'property.overview.id': propertyId })
    .pluck('property.propertyTypes.name');

  const [buildingMaterial] = await db('buildings.data')
    .join('buildings.materials', {
      'buildings.data.building_material_id': 'buildings.materials.id',
    })
    .where({ 'buildings.data.property_id': propertyId })
    .pluck('buildings.materials.name');

  const [roofMaterial] = await db('roofs.materials')
    .join('property.overview', { 'property.overview.roofMaterialId': 'roofs.materials.id' })
    .where({ 'property.overview.id': propertyId })
    .pluck('roofs.materials.name');

  const [roofType] = await db('roofs.types')
    .join('property.overview', { 'property.overview.roofTypeId': 'roofs.types.id' })
    .where({ 'property.overview.id': propertyId })
    .pluck('roofs.types.name');

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
