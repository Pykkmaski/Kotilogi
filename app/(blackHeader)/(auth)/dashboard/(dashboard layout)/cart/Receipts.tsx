import { formatNumber } from 'kotilogi-app/utils/formatNumber';

type ReceiptItemProps = {
  receipt: TODO;
};

const ReceiptItem = ({ receipt }: ReceiptItemProps) => {
  const Group = ({ children }: React.PropsWithChildren) => {
    return <div className='flex flex-col gap-1'>{children}</div>;
  };

  const SmallText = ({ children }) => (
    <div className='text-sm text-slate-500 w-full flex'>{children}</div>
  );

  return (
    <div className='w-full flex items-center rounded-md bg-white p-2 justify-between shadow-md'>
      <div className='flex items-center gap-8'>
        <Group>
          <SmallText>Päiväys</SmallText>
          <span>{new Date(parseInt(receipt.paidOn)).toLocaleDateString('fi')}</span>
        </Group>

        <Group>
          <SmallText>Määrä</SmallText>
          <span className='text-green-700'>{formatNumber(receipt.amount / 100)}€</span>
        </Group>
      </div>

      <Group>
        <SmallText>
          <span className='text-right w-full flex-1'>Tunnus</span>
        </SmallText>
        <span className='text-sm text-right flex gap-2'>{receipt.id}</span>
      </Group>
    </div>
  );
};

type ReceiptsProps = {
  receipts: TODO[];
};

export function Receipts({ receipts }: ReceiptsProps) {
  return (
    <div className='flex flex-col gap-2 w-full flex-1'>
      <h2 className='text-xl text-slate-500 font-semibold mb-4'>Suoritetut Maksut</h2>
      {receipts?.length ? (
        receipts?.map(receipt => {
          return <ReceiptItem receipt={receipt} />;
        })
      ) : (
        <div className='flex flex-col gap-1 text-slate-500'>
          <h3 className='text-lg'>Ei suoritettuja maksuja.</h3>
          <small className='text-sm'>
            Aikaisemmin suoritetut maksut poistetaan vuoden kuluttua.
          </small>
        </div>
      )}
    </div>
  );
}
