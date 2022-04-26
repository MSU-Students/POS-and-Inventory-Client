import { SaleRecordDto } from 'src/services/rest-api';
import saleRecordService from 'src/services/sale-record.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { SaleRecordStateInterface } from './state';

const actions: ActionTree<SaleRecordStateInterface, StateInterface> = {
  async addSaleRecord(context, payload: SaleRecordDto): Promise<void> {
    const result = await saleRecordService.create(payload);
    context.commit('setNewSaleRecord', result);
    await context.dispatch('getAllSaleRecord');
  },

  async editSaleRecord(context, payload: any): Promise<any> {
    const result = await saleRecordService.update(payload.invoiceID, payload);
    context.commit('updateSaleRecord', result);
    await context.dispatch('getAllSaleRecord');
  },

  async deleteSaleRecord(context, invoiceID: number): Promise<any> {
    const result = await saleRecordService.delete(invoiceID);
    context.commit('deleteSaleRecord', result);
    await context.dispatch('getAllSaleRecord');
  },

  async getAllSaleRecord(context): Promise<any> {
    const res = await saleRecordService.getAll();
    context.commit('getAllSaleRecord', res);
  },

  async getOneSaleRecord(context, id: number): Promise<any> {
    const res = await saleRecordService.getOne(id);
    context.commit('getOneSaleRecord', res);
  },
};

export default actions;
