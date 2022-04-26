import { SaleOrderDto } from './rest-api';
import { posApiService } from './pos-inventory-api.service';
import { DefaultApi } from './rest-api/api';

class SaleOrderService extends DefaultApi {
  async create(payload: any): Promise<SaleOrderDto> {
    const response = await posApiService.addSaleOrder(payload);
    return response.data;
  }

  async getAll(): Promise<SaleOrderDto[]> {
    const response = await posApiService.getSaleOrders();
    return response.data;
  }

  async getOne(sale_id: number): Promise<SaleOrderDto> {
    const response = await posApiService.getSaleOrder(sale_id);
    return response.data;
  }

  async update(sale_id: number, payload: any) {
    const response = await posApiService.updateSaleOrder(sale_id, payload);
    return response.data;
  }

  async delete(sale_id: number) {
    const response = await posApiService.deleteSaleOrder(sale_id);
    return response.data;
  }
}

const saleOrderService = new SaleOrderService();
export default saleOrderService;
