import { ExpensesDto } from './rest-api';
import { posApiService } from './pos-inventory-api.service';
import { DefaultApi } from './rest-api/api';

class ExpensesService extends DefaultApi {
  async create(payload: any) {
    const response = await posApiService.addExpenses(payload);
    if (response.status === 201) {
      return response.data;
    } else {
      [];
    }
  }

  async getAll(): Promise<ExpensesDto[]> {
    const response = await posApiService.getExpenses();
    return response.data;
  }

  async getOne(expensesID: number): Promise<ExpensesDto> {
    const response = await posApiService.getExpense(expensesID);
    return response.data;
  }

  async update(expensesID: number, payload: any) {
    const response = await posApiService.updateExpense(expensesID, payload);
    return response.data;
  }

  async delete(expensesID: number) {
    const response = await posApiService.deleteExpense(expensesID);
    return response.data;
  }
}

const expensesService = new ExpensesService();
export default expensesService;
