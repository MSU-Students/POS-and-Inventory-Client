import { Purchase } from 'src/interfaces/purchase.interface';

export interface PurchaseStateInterface {
  allPurchase: Purchase[];
  newPurchase?: Purchase;
}

function state(): PurchaseStateInterface {
  return {
    allPurchase: [],
  };
}

export default state;
