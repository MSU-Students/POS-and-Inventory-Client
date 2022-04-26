import { SaleRecord } from 'src/interfaces/sale-record.interface';

export interface SaleRecordStateInterface {
  allSaleRecord: SaleRecord[];
  newSaleRecord?: SaleRecord;
}

function state(): SaleRecordStateInterface {
  return {
    allSaleRecord: [],
  };
}

export default state;
