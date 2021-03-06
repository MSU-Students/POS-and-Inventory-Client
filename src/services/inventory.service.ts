import { InventoryDto } from './rest-api';
import { posApiService } from './pos-inventory-api.service';
import { DefaultApi } from './rest-api/api';

class InventoryService extends DefaultApi {
  async create(payload: any) {
    const response = await posApiService.addInventory(payload);
    if (response.status === 201) {
      return response.data;
    } else {
      [];
    }
  }

  async getAll(): Promise<InventoryDto> {
    const response = await posApiService.getInventorys();
    return response.data;
  }

  async getOne(itemCode: string): Promise<InventoryDto> {
    const response = await posApiService.getInventory(itemCode);
    return response.data;
  }

  async SearchByName(keyword: string): Promise<InventoryDto> {
    const response = await posApiService.filterInventoryItem(keyword);
    return response.data;
  }

  async update(itemCode: string, payload: any) {
    const response = await posApiService.updateInventory(itemCode, payload);
    return response.data;
  }

  async delete(itemCode: string) {
    const response = await posApiService.deleteInventory(itemCode);
    return response.data;
  }
}

const inventoryService = new InventoryService();
export default inventoryService;
