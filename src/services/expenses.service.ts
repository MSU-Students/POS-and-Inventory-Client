import { ExpensesDto } from './rest-api';
import { posApiService } from './pos-inventory-api.service';
import { DefaultApi } from './rest-api/api';

class ExpensesService extends DefaultApi {
  async create(payload: any): Promise<ExpensesDto> {
    const response = await posApiService.addExpenses(payload);
    return response.data;
  }

  async getAll(): Promise<ExpensesDto[]> {
    const response = await posApiService.getExpenses();
    return response.data;
  }

  async getOne(id: number): Promise<ExpensesDto> {
    const response = await posApiService.getExpense(id);
    return response.data;
  }

  async update(id: number, payload: any) {
    const response = await posApiService.updateExpense(id, payload);
    return response.data;
  }

  async delete(id: number) {
    const response = await posApiService.deleteExpense(id);
    return response.data;
  }
}

const expensesService = new ExpensesService();
export default expensesService;
