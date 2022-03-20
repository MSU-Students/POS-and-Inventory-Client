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

  async getOne(purchaseID: number): Promise<PurchaseDto> {
    const response = await posApiService.getPurchase(purchaseID);
    return response.data;
  }

  async update(purchaseID: number, payload: any) {
    const response = await posApiService.updatePurchase(purchaseID, payload);
    return response.data;
  }

  async delete(purchaseID: number) {
    const response = await posApiService.deletePurchase(purchaseID);
    return response.data;
  }
}

const purchaseService = new PurchaseService();
export default purchaseService;
