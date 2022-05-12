import { SaleOrderDto } from 'src/services/rest-api';
import saleOrderService from 'src/services/sale-orderList.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { SaleOrderStateInterface } from './state';

const actions: ActionTree<SaleOrderStateInterface, StateInterface> = {
  async addSaleOrder(context, payload: any) {
    const result = await saleOrderService.create(payload);
    context.commit('setNewSaleOrder', result);
    await context.dispatch('getAllSaleOrder');
  },

  async editSaleOrder(context, payload: any): Promise<any> {
    const result = await saleOrderService.update(payload.sale_id, payload);
    context.commit('updateSaleOrder', result);
    await context.dispatch('getAllSaleOrder');
  },

  async deleteSaleOrder(context, sale_id: number): Promise<any> {
    const result = await saleOrderService.delete(sale_id);
    context.commit('deleteSaleOrder', result);
    await context.dispatch('getAllSaleOrder');
  },

  async getAllSaleOrder(context): Promise<any> {
    const res = await saleOrderService.getAll();
    context.commit('getAllSaleOrder', res);
  },

  async getOneSaleOrder(context, sale_id: number): Promise<any> {
    const res = await saleOrderService.getOne(sale_id);
    context.commit('getOneSaleOrder', res);
  },
};

export default actions;
