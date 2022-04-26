import { SellOrder } from 'src/interfaces/sale-order.interface';

export interface SaleOrderStateInterface {
  allSaleOrder: SellOrder[];
  newSaleOrder?: SellOrder;
}

function state(): SaleOrderStateInterface {
  return {
    allSaleOrder: [],
  };
}

export default state;
