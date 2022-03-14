import { ProductSizeDto } from './rest-api';
import { posApiService } from './pos-inventory-api.service';
import { DefaultApi } from './rest-api/api';

class ProductSizeService extends DefaultApi {
  async create(payload: any): Promise<ProductSizeDto> {
    const response = await posApiService.addProductSize(payload);
    return response.data;
  }

  async getAll(): Promise<ProductSizeDto> {
    const response = await posApiService.getProductSizes();
    return response.data;
  }

  async getOne(id: number): Promise<ProductSizeDto> {
    const response = await posApiService.getProductSize(id);
    return response.data;
  }

  async update(id: number, payload: any) {
    const response = await posApiService.updateProductSize(id, payload);
    return response.data;
  }

  async delete(id: number) {
    const response = await posApiService.deleteProductSize(id);
    return response.data;
  }
}

const productSizeService = new ProductSizeService();
export default productSizeService;
