import subProductCatService from 'src/services/subProductCat.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { SubCategoryStateInterface } from './state';

const actions: ActionTree<SubCategoryStateInterface, StateInterface> = {
  async addSubProductCat(context, payload: any): Promise<any> {
    const result = await subProductCatService.create(payload);
    context.commit('setNewSubProductCat', result);
    await context.dispatch('getAllSubProductCat');
  },

  async editSubProductCat(context, payload: any): Promise<any> {
    const result = await subProductCatService.update(
      payload.SubProductCatID,
      payload
    );
    context.commit('updateSubProductCat', result);
    await context.dispatch('getAllSubProductCat');
  },

  async deleteSubProductCat(context, SubProductCatID: number): Promise<any> {
    const result = await subProductCatService.delete(SubProductCatID);
    context.commit('deleteSubProductCat', result);
  },

  async getAllSubProductCat(context): Promise<any> {
    const res = await subProductCatService.getAll();
    context.commit('getAllSubProductCat', res);
    await this.dispatch('productCategory/getAllProductCategory');
  },

  async getOneSubProductCat(context, SubProductCatID: number): Promise<any> {
    const res = await subProductCatService.getOne(SubProductCatID);
    context.commit('getOneSubProductCat', res);
  },
};

export default actions;
