import { ProdCategoryDto } from './rest-api';
import { posApiService } from './pos-inventory-api.service';
import { DefaultApi } from './rest-api/api';

class ProductCategoryService extends DefaultApi {
  async create(payload: ProdCategoryDto): Promise<ProdCategoryDto> {
    const response = await posApiService.addProductCategory(payload);
    return response.data;
  }

  async getAll(): Promise<ProdCategoryDto> {
    const response = await posApiService.getProductCategorys();
    return response.data;
  }

  async getOne(productID: number): Promise<ProdCategoryDto> {
    const response = await posApiService.getProductCategory(productID);
    return response.data;
  }

  async update(productID: number, payload: any) {
    const response = await posApiService.deleteInventoryCategory(
      productID,
      payload
    );
    return response.data;
  }

  async delete(productID: number) {
    const response = await posApiService.deleteInventoryCategory(productID);
    return response.data;
  }

  async getProductCategoryProfile() {
    const response = await posApiService.getProfile();
    return response.data;
  }
}

const productCategoryService = new ProductCategoryService();
export default productCategoryService;
