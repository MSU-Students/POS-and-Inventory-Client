import { InventoryDto } from './rest-api';
import { posApiService } from './pos-inventory-api.service';
import { DefaultApi } from './rest-api/api';

class InventoryService extends DefaultApi {
  async create(payload: any): Promise<InventoryDto> {
    const response = await posApiService.addInventory(payload);
    return response.data;
  }

  async getAll(): Promise<InventoryDto> {
    const response = await posApiService.getInventorys();
    return response.data;
  }

  async getOne(id: string): Promise<InventoryDto> {
    const response = await posApiService.getInventory(id);
    return response.data;
  }

  async update(id: string, payload: any) {
    const response = await posApiService.updateInventory(id, payload);
    return response.data;
  }

  async delete(id: string) {
    const response = await posApiService.deleteInventory(id);
    return response.data;
  }
}

const inventoryService = new InventoryService();
export default inventoryService;
