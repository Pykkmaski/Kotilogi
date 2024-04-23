import { List } from '@/components/List';
import { ListItem } from '@/components/ListItem/ListItem';
import { SelectablesProvider } from '@/components/Util/SelectablesProvider';
import { DeleteButton } from '@/components/new/Gallery/GalleryBase/Buttons';

export function UsageDataList({ data }) {
  return (
    <SelectablesProvider>
      {/**Header */}
      <div className='flex justify-between items-center w-full'>
        <h1>Kulutustiedot</h1>
        <SelectablesProvider.ActionTrigger
          action={() => {
            console.log('Kalja');
          }}>
          <i className='fa fa-pencil' />
        </SelectablesProvider.ActionTrigger>

        <SelectablesProvider.HideIfNoneSelected>
          <SelectablesProvider.ActionTrigger action={() => console.log('Deleting selected...')}>
            <DeleteButton />
          </SelectablesProvider.ActionTrigger>
        </SelectablesProvider.HideIfNoneSelected>
      </div>

      <div className='flex flex-col gap-2'>
        <List<Kotidok.UsageType>
          data={data}
          Component={({ item }) => {
            return (
              <div className='flex'>
                <h1>{item.price}</h1>
                <SelectablesProvider.SelectTrigger item={item}>
                  <input type='checkbox' />
                </SelectablesProvider.SelectTrigger>
              </div>
            );
          }}
        />
      </div>
    </SelectablesProvider>
  );
}
