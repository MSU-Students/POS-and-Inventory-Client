import { SupplierDto } from './rest-api';
import { posApiService } from './pos-inventory-api.service';
import { DefaultApi } from './rest-api/api';

class SupplierService extends DefaultApi {
  async create(payload: any): Promise<SupplierDto> {
    const response = await posApiService.addSupplier(payload);
    return response.data;
  }

  async getAll(): Promise<SupplierDto> {
    const response = await posApiService.getSuppliers();
    return response.data;
  }

  async getOne(supplierID: number): Promise<SupplierDto> {
    const response = await posApiService.getSupplier(supplierID);
    return response.data;
  }

  async update(supplierID: number, payload: any) {
    const response = await posApiService.updateSupplier(supplierID, payload);
    return response.data;
  }

  async delete(supplierID: number) {
    const response = await posApiService.deleteSupplier(supplierID);
    return response.data;
  }
}

const supplierService = new SupplierService();
export default supplierService;
