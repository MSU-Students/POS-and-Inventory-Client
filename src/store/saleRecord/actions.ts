import { SaleRecordDto } from 'src/services/rest-api';
import saleRecordService from 'src/services/sale-record.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { SaleRecordStateInterface } from './state';

const actions: ActionTree<SaleRecordStateInterface, StateInterface> = {
  async addSaleRecord(context, payload: any): Promise<any> {
    const result = await saleRecordService.create(payload);
    context.commit('setNewSaleRecord', result);
    await context.dispatch('getAllSaleRecord');

    const listOrders = context.rootState.cart.allCart;
    if (listOrders.length > 0 && result) {
      listOrders.map(
        async (s) =>
          await context.dispatch(
            'saleOrder/addSaleOrder',
            { ...s, invoice: result.invoiceID },
            { root: true }
          )
      );
    }

    return result;
  },

  async editSaleRecord(context, payload: any): Promise<any> {
    const result = await saleRecordService.update(payload.order_ID, payload);
    context.commit('updateSaleRecord', result);
    await context.dispatch('getAllSaleRecord');
  },

  async deleteSaleRecord(context, order_ID: number): Promise<any> {
    const result = await saleRecordService.delete(order_ID);
    context.commit('deleteSaleRecord', result);
    await context.dispatch('getAllSaleRecord');
  },

  async getAllSaleRecord(context): Promise<any> {
    const res = await saleRecordService.getAll();
    context.commit('getAllSaleRecord', res);
    await this.dispatch('saleOrder/getAllSaleOrder');
  },

  async findOneByID(context, order_ID: number): Promise<any> {
    const res = await saleRecordService.getOne(order_ID);
    context.commit('getOneSaleRecord', res);
    return res;
  },
};

export default actions;
