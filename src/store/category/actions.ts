import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { CategoryStateInterface, ICategoryInfo } from './state';

const actions: ActionTree<CategoryStateInterface, StateInterface> = {
  addCategory(context, payload: ICategoryInfo) {
    context.commit('setCategory', payload);
  },

  editCategory(context, payload: ICategoryInfo) {
    context.commit('setNewCategory', payload);
  },

  deleteCategory(context, payload: ICategoryInfo) {
    context.commit('deleteCategory', payload);
  },
};

export default actions;
