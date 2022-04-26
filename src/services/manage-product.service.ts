import { ManageProductDto } from './rest-api';
import { posApiService } from './pos-inventory-api.service';
import { DefaultApi } from './rest-api/api';

class ProductService extends DefaultApi {
  async create(payload: any): Promise<ManageProductDto> {
    const response = await posApiService.addProduct(payload);
    return response.data;
  }

  async getAll(): Promise<ManageProductDto[]> {
    const response = await posApiService.getProducts();
    return response.data as unknown as ManageProductDto[];
  }

  async getOne(product_ID: string): Promise<ManageProductDto> {
    const response = await posApiService.getProduct(product_ID);
    return response.data;
  }

  async update(product_ID: string, payload: any) {
    const response = await posApiService.updateProduct(product_ID, payload);
    return response.data;
  }

  async delete(product_ID: string) {
    const response = await posApiService.deleteProduct(product_ID);
    return response.data;
  }
}

const productService = new ProductService();
export default productService;
