export interface PurchaseInfo {
  product: string;
  date: string;
  supplier: string;
  status: string;
  total: string;
  paid: string;
  balance: string;
  paystatus: string;
}

export interface PurchaseStateInterface {
  purchase: PurchaseInfo[];
  activePurchase?: PurchaseInfo;
}

function state(): PurchaseStateInterface {
  return {
    purchase: [
      {
        product: 'Chocolate Powder',
        date: '9/24/2021',
        supplier: 'Milo Company',
        status: 'Pending',
        total: '200 packs',
        paid: 'Partial',
        balance: 'Paid',
        paystatus: 'Ongoing',
      },
    ],
  };
}

export default state;
