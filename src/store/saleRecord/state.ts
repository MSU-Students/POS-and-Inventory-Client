import { SaleRecord } from 'src/interfaces/saleRecord.interface';

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
