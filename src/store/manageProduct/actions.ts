import manageProductService from 'src/services/manage-product.service';
import supplierService from 'src/services/media.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ManageProductStateInterface } from './state';

const actions: ActionTree<ManageProductStateInterface, StateInterface> = {
  async addManageProduct(context, payload: any): Promise<any> {
    const result = await manageProductService.create(payload);
    context.commit('setNewManageProduct', result);
    await context.dispatch('getAllManageProduct');
  },

  async editManageProduct(context, payload: any): Promise<any> {
    const result = await manageProductService.update(
      payload.product_ID,
      payload
    );
    context.commit('updateManageProduct', result);
    await context.dispatch('getAllManageProduct');
  },

  async deleteManageProduct(context, product_ID: number): Promise<any> {
    const result = await manageProductService.delete(product_ID);
    context.commit('deleteManageProduct', result);
    await context.dispatch('getAllManageProduct');
  },

  async getAllManageProduct(context): Promise<any> {
    const res = await manageProductService.getAll();
    context.commit('getAllProduct', res);
  },

  async getOneManageProduct(context, product_ID: number): Promise<any> {
    const res = await manageProductService.getOne(product_ID);
    context.commit('getOneProduct', res);
  },
};

export default actions;
