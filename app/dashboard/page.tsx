import { loadSession } from 'kotilogi-app/utils/loadSession';
import { properties } from 'kotilogi-app/features/properties/DAL/properties';

export default async function newDashboardPage() {
  const session = await loadSession();
  const data = await properties.getPropertiesOfUser(session.user.id);

  return null;
}
