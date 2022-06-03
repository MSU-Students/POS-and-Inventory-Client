import { SaleOrder } from 'src/interfaces/saleOrder.interface';

export interface SaleOrderStateInterface {
  allSaleOrder: SaleOrder[];
  newSaleOrder?: SaleOrder;
}

function state(): SaleOrderStateInterface {
  return {
    allSaleOrder: [],
  };
}

export default state;
