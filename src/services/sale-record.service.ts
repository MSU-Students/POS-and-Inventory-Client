import { SaleRecordDto } from './rest-api';
import { posApiService } from './pos-inventory-api.service';
import { DefaultApi } from './rest-api/api';

class SaleRecordService extends DefaultApi {
  async create(payload: any): Promise<SaleRecordDto> {
    const response = await posApiService.addSaleRecord(payload);
    return response.data;
  }

  async getAll(): Promise<SaleRecordDto> {
    const response = await posApiService.getSaleRecords();
    return response.data;
  }

  async getOne(invoiceID: number): Promise<SaleRecordDto> {
    const response = await posApiService.getSaleRecord(invoiceID);
    return response.data;
  }

  async update(invoiceID: number, payload: any) {
    const response = await posApiService.updateSaleRecord(invoiceID, payload);
    return response.data;
  }

  async delete(invoiceID: number) {
    const response = await posApiService.deleteSaleRecord(invoiceID);
    return response.data;
  }
}

const saleRecordService = new SaleRecordService();
export default saleRecordService;
