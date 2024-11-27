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

  const [heatingSystem] = await db('properties.base')
    .where({ 'properties.base.id': propertyId })
    .join('heating.types', { 'heating.types.id': 'properties.base.primaryHeatingSystemId' })
    .pluck('heating.types.name');

  const [propertyType] = await db('properties.base')
    .join('properties.propertyTypes', {
      'properties.propertyTypes.id': 'properties.base.propertyTypeId',
    })
    .where({ 'properties.base.id': propertyId })
    .pluck('properties.propertyTypes.name');

  const [buildingMaterial] = await db('properties.base')
    .join('properties.buildingMaterials', {
      'properties.base.buildingMaterialId': 'properties.buildingMaterials.id',
    })
    .where({ 'properties.base.id': propertyId })
    .pluck('properties.buildingMaterials.name');

  const [roofMaterial] = await db('roofs.materials')
    .join('properties.base', { 'properties.base.buildingMaterialId': 'roofs.materials.id' })
    .where({ 'properties.base.id': propertyId })
    .pluck('roofs.materials.name');

  const [roofType] = await db('roofs.types')
    .join('properties.base', { 'properties.base.buildingMaterialId': 'roofs.types.id' })
    .where({ 'properties.base.id': propertyId })
    .pluck('roofs.types.name');

  const [{ count: ownerCount }] = await db('data_propertyOwners')
    .where({ propertyId })
    .count('*', { as: 'count' });

  console.log(data);
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
