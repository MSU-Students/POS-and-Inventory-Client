import purchaseService from 'src/services/purchase.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { PurchaseStateInterface } from './state';

const actions: ActionTree<PurchaseStateInterface, StateInterface> = {
  async addPurchase(context, payload: any): Promise<any> {
    const result = await purchaseService.create(payload);
    context.commit('setNewPurchase', result);
    await context.dispatch('getAllPurchase');
  },

  async editPurchase(context, payload: any): Promise<any> {
    const result = await purchaseService.update(payload.purchaseID, payload);
    context.commit('updatePurchase', result);
    await context.dispatch('getAllPurchase');
  },

  async deletePurchase(context, purchaseID: number): Promise<any> {
    const result = await purchaseService.delete(purchaseID);
    context.commit('deletePurchase', result);
  },

  async getAllPurchase(context): Promise<any> {
    const res = await purchaseService.getAll();
    context.commit('getAllPurchase', res);
  },

  async getOnePurchase(context, purchaseID: number): Promise<any> {
    const res = await purchaseService.getOne(purchaseID);
    context.commit('getOnePurchase', res);
  },
};

export default actions;
