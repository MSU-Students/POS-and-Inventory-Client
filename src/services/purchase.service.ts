import { PurchaseDto } from './rest-api';
import { posApiService } from './pos-inventory-api.service';
import { DefaultApi } from './rest-api/api';

class PurchaseService extends DefaultApi {
  async create(payload: any) {
    const response = await posApiService.addPurchase(payload);
    if (response.status === 201) {
      return response.data;
    } else {
      [];
    }
  }

  async getAll() {
    const response = await posApiService.getPurchases();
    if (response.status === 200) {
      return response.data;
    } else {
      [];
    }
  }

  async getOne(purchaseID: number) {
    const response = await posApiService.getPurchase(purchaseID);
    if (response.status === 200) {
      return response.data;
    } else {
      [];
    }
  }

  async update(purchaseID: number, payload: any) {
    const response = await posApiService.updatePurchase(purchaseID, payload);
    if (response.status === 200) {
      return response.data;
    } else {
      [];
    }
  }

  async delete(purchaseID: number) {
    const response = await posApiService.deletePurchase(purchaseID);
    if (response.status === 200) {
      return response.data;
    } else {
      [];
    }
  }
}

const purchaseService = new PurchaseService();
export default purchaseService;
