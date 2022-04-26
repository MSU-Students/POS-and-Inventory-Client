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

  async getOne(id: number): Promise<SaleRecordDto> {
    const response = await posApiService.getSaleRecord(id);
    return response.data;
  }

  async update(id: number, payload: any) {
    const response = await posApiService.updateSaleRecord(id, payload);
    return response.data;
  }

  async delete(id: number) {
    const response = await posApiService.deleteSaleRecord(id);
    return response.data;
  }
}

const saleRecordService = new SaleRecordService();
export default saleRecordService;
