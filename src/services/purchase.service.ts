import { PurchaseDto } from './rest-api';
import { posApiService } from './pos-inventory-api.service';
import { DefaultApi } from './rest-api/api';

class PurchaseService extends DefaultApi {
  async create(payload: any): Promise<PurchaseDto> {
    const response = await posApiService.addPurchase(payload);
    return response.data;
  }

  async getAll(): Promise<PurchaseDto> {
    const response = await posApiService.getPurchases();
    return response.data;
  }

  async getOne(id: number): Promise<PurchaseDto> {
    const response = await posApiService.getPurchase(id);
    return response.data;
  }

  async update(id: number, payload: any) {
    const response = await posApiService.updatePurchase(id, payload);
    return response.data;
  }

  async delete(id: number) {
    const response = await posApiService.deletePurchase(id);
    return response.data;
  }
}

const purchaseService = new PurchaseService();
export default purchaseService;
