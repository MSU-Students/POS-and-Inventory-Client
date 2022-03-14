import { ManageProductDto } from './rest-api';
import { posApiService } from './pos-inventory-api.service';
import { DefaultApi } from './rest-api/api';

class ProductService extends DefaultApi {
  async create(payload: any): Promise<ManageProductDto> {
    const response = await posApiService.addProduct(payload);
    return response.data;
  }

  async getAll(): Promise<ManageProductDto> {
    const response = await posApiService.getProducts();
    return response.data;
  }

  async getOne(id: string): Promise<ManageProductDto> {
    const response = await posApiService.getProducts(id);
    return response.data;
  }

  async update(id: string, payload: any) {
    const response = await posApiService.updateProduct(id, payload);
    return response.data;
  }

  async delete(id: string) {
    const response = await posApiService.deleteProduct(id);
    return response.data;
  }
}

const productService = new ProductService();
export default productService;
