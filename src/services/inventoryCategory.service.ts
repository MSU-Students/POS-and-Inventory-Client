import { InventoryCategoryDto } from './rest-api';
import { posApiService } from './pos-inventory-api.service';
import { DefaultApi } from './rest-api/api';

class InventoryCategoryService extends DefaultApi {
  async create(payload: InventoryCategoryDto): Promise<InventoryCategoryDto> {
    const response = await posApiService.addInventoryCategory(payload);
    return response.data;
  }

  async getAll(): Promise<InventoryCategoryDto> {
    const response = await posApiService.getInventoryCategorys();
    return response.data;
  }

  async getOne(categoryID: number): Promise<InventoryCategoryDto> {
    const response = await posApiService.getInventoryCategory(categoryID);
    return response.data;
  }

  async update(categoryID: number, payload: any) {
    const response = await posApiService.updateInventoryCategory(
      categoryID,
      payload
    );
    return response.data;
  }

  async delete(categoryID: number) {
    const response = await posApiService.deleteInventoryCategory(categoryID);
    return response.data;
  }

  async getInventoryCategoryProfile() {
    const response = await posApiService.getProfile();
    return response.data;
  }
}

const inventoryCategoryService = new InventoryCategoryService();
export default inventoryCategoryService;
