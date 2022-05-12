import { CustomerDto } from './rest-api';
import { posApiService } from './pos-inventory-api.service';
import { DefaultApi } from './rest-api/api';

class CustomerService extends DefaultApi {
  async create(payload: any) {
    const response = await posApiService.addCustomer(payload);
    if (response.status === 201) {
      return response.data;
    } else {
      [];
    }
  }

  async getAll(): Promise<CustomerDto[]> {
    const response = await posApiService.getCustomers();
    return response.data;
  }

  async getOne(id: number): Promise<CustomerDto> {
    const response = await posApiService.getCustomer(id);
    return response.data;
  }

  async update(id: number, payload: any) {
    const response = await posApiService.updateCustomer(id, payload);
    return response.data;
  }

  async delete(id: number) {
    const response = await posApiService.deleteCustomer(id);
    return response.data;
  }
}

const customerService = new CustomerService();
export default customerService;
