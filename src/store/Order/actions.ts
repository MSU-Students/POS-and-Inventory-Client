import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { OrderStateInterface, IOrderInfo } from './state';

const actions: ActionTree<OrderStateInterface, StateInterface> = {
  addCategory(context, payload: IOrderInfo) {
    context.commit('setOrder', payload);
  },

  editCategory(context, payload: IOrderInfo) {
    context.commit('setOrder', payload);
  },

  deleteCategory(context, payload: IOrderInfo) {
    context.commit('deleteOrder', payload);
  },
};

export default actions;
