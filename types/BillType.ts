export type BillType = {
  id: number;
  refId: string;
  amount: number;
  customer: string;
  stamp: 'add_property';
  status: 'unpaid' | 'paid' | 'refunded';
  due: number;
};
