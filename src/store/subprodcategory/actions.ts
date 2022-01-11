import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { SubprodCategoryStateInterface, ISubProdCategoryInfo } from './state';

const actions: ActionTree<SubprodCategoryStateInterface, StateInterface> = {
  addSubCategory(context, payload: ISubProdCategoryInfo) {
    context.commit('setSubCategory', payload);
  },

  editSubCategory(context, payload: ISubProdCategoryInfo) {
    context.commit('setNewSubCategory', payload);
  },

  deleteSubCategory(context, payload: ISubProdCategoryInfo) {
    context.commit('deleteSubCategory', payload);
  },
};

export default actions;
