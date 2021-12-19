export interface IPurchaseInfo {
  purchaseReference?: string;
  purchaseProduct: string;
  purchaseDate: string;
  supplier: string;
  purchaseStatus: string;
  purchaseTotal: string;
  purchasePaid: string;
  purchaseBalance: string;
  purchasePayStatus: string;
}

export interface PurchaseStateInterface {
  allPurchase: IPurchaseInfo[];
  activePurchase?: IPurchaseInfo;
}

function state(): PurchaseStateInterface {
  return {
    allPurchase: [
      {
        purchaseProduct: 'Chocolate Powder',
        purchaseDate: '9/24/2021',
        supplier: 'Milo Company',
        purchaseStatus: 'Pending',
        purchaseTotal: '200 packs',
        purchasePaid: 'Partial',
        purchaseBalance: '1000',
        purchasePayStatus: 'Ongoing',
      },
    ],
  };
}

export default state;
