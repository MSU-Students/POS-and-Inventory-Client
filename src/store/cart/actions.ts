import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { CartStateInterface, ICartInfo } from './state';

const actions: ActionTree<CartStateInterface, StateInterface> = {
  addCart(context, payload: ICartInfo) {
    context.commit('setNewCart', payload);
  },

  editCart(context, payload: ICartInfo) {
    context.commit('updateCart', payload);
  },

  deleteCart(context, payload: ICartInfo) {
    context.commit('deleteCart', payload);
  },
  clear(context) {
    context.commit('clear');
  },
};

export default actions;
