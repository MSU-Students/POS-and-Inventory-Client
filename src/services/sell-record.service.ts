import { SellRecordDto } from './rest-api';
import { posApiService } from './pos-inventory-api.service';
import { DefaultApi } from './rest-api/api';

class SellRecordService extends DefaultApi {
  async create(payload: any): Promise<SellRecordDto> {
    const response = await posApiService.addSellRecord(payload);
    return response.data;
  }

  async getAll(): Promise<SellRecordDto> {
    const response = await posApiService.getSellRecords();
    return response.data;
  }

  async getOne(id: number): Promise<SellRecordDto> {
    const response = await posApiService.getSellRecord(id);
    return response.data;
  }

  async update(id: number, payload: any) {
    const response = await posApiService.updateSellRecord(id, payload);
    return response.data;
  }

  async delete(id: number) {
    const response = await posApiService.deleteSellRecord(id);
    return response.data;
  }
}

const sellRecordService = new SellRecordService();
export default sellRecordService;
