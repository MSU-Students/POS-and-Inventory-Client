import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { OrderStateInterface, IOrderInfo } from './state';

const actions: ActionTree<OrderStateInterface, StateInterface> = {
  addOrder(context, payload: IOrderInfo) {
    context.commit('setOrder', payload);
  },

  editOrder(context, payload: IOrderInfo) {
    context.commit('setNewOrder', payload);
  },

  deleteOrder(context, payload: IOrderInfo) {
    context.commit('deleteOrder', payload);
  },
};

export default actions;
