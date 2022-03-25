import { SubprodCategoryDto } from './rest-api';
import { posApiService } from './pos-inventory-api.service';
import { DefaultApi } from './rest-api/api';

class SubProductCatService extends DefaultApi {
  async create(payload: any): Promise<SubprodCategoryDto> {
    const response = await posApiService.addSubCategoryProduct(payload);
    return response.data;
  }

  async getAll(): Promise<SubprodCategoryDto> {
    const response = await posApiService.getSubCategoryProducts();
    return response.data;
  }

  async getOne(subProdCategoryID: number): Promise<SubprodCategoryDto> {
    const response = await posApiService.getSubCategoryProduct(
      subProdCategoryID
    );
    return response.data;
  }

  async update(subProdCategoryID: number, payload: any) {
    const response = await posApiService.updateSubCategoryProduct(
      subProdCategoryID,
      payload
    );
    return response.data;
  }

  async delete(subProdCategoryID: number) {
    const response = await posApiService.deleteSubCategory(subProdCategoryID);
    return response.data;
  }
}

const subProductCatService = new SubProductCatService();
export default subProductCatService;
