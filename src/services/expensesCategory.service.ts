import { ExpensesCategoryDto } from './rest-api';
import { posApiService } from './pos-inventory-api.service';
import { DefaultApi } from './rest-api/api';

class ExpenseCategoryService extends DefaultApi {
  async create(payload: ExpensesCategoryDto): Promise<ExpensesCategoryDto> {
    const response = await posApiService.addExpensesCategory(payload);
    return response.data;
  }

  async getAll(): Promise<ExpensesCategoryDto> {
    const response = await posApiService.getExpensesCategorys();
    return response.data;
  }

  async getOne(expenseID: number): Promise<ExpensesCategoryDto> {
    const response = await posApiService.getExpensesCategory(expenseID);
    return response.data;
  }

  async update(expenseID: number, payload: any) {
    const response = await posApiService.updateExpensesCategory(
      expenseID,
      payload
    );
    return response.data;
  }

  async delete(expenseID: number) {
    const response = await posApiService.deleteExpensesCategory(expenseID);
    return response.data;
  }

  async getExpensesCategoryProfile() {
    const response = await posApiService.getProfile();
    return response.data;
  }
}

const expenseCategoryService = new ExpenseCategoryService();
export default expenseCategoryService;
