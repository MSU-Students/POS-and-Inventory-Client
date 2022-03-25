import productCategoryService from 'src/services/productCategory.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ProductCategoryStateInterface } from '../productCategory/state';

const actions: ActionTree<ProductCategoryStateInterface, StateInterface> = {
  async addProductCat(context, payload: any): Promise<any> {
    const result = await productCategoryService.create(payload);
    context.commit('setNewProductCategory', result);
    await context.dispatch('getAllProductCategory');
  },

  async editProductCat(context, payload: any): Promise<any> {
    const result = await productCategoryService.create(payload);
    context.commit('updateProductCategory', result);
    await context.dispatch('getAllProductCategory');
  },

  async deleteProductCat(context, productID: number): Promise<any> {
    const result = await productCategoryService.delete(productID);
    context.commit('deleteProductCategory', result);
  },

  async getAllProductCategory(context): Promise<any> {
    const res = await productCategoryService.getAll();
    context.commit('getAllProductCategory', res);
  },

  async getOneProductCategory(context, productID: number): Promise<any> {
    const res = await productCategoryService.getOne(productID);
    context.commit('getOneUser', res);
  },
};

export default actions;
