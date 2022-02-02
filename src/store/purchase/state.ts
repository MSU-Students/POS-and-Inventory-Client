export interface IPurchaseInfo {
  purchaseReference?: string;
  purchaseProduct: string;
  purchaseDate: string;
  supplier: string;
  purchaseStatus: string;
  purchaseQuant: number;
  purchaseUnit: string;
  purchaseUnitPrice: number;
  purchaseAmount: number;
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
        purchaseQuant: 200,
        purchaseUnit: 'Kilogram(kg)',
        purchaseUnitPrice: 10,
        purchaseAmount: 1000,
      },
    ],
  };
}

export default state;
