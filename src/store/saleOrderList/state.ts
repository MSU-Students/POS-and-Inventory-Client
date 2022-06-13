import { SaleOrder } from 'src/interfaces/saleOrder.interface';
import { SaleOrderDto } from 'src/services/rest-api';

export interface SaleOrderStateInterface {
  allSaleOrder: SaleOrderDto[];
  newSaleOrder?: SaleOrder;
}

function state(): SaleOrderStateInterface {
  return {
    allSaleOrder: [],
  };
}

export default state;
