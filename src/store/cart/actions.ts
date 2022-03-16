import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { CartStartInterface, ICartInfo } from './state';

const actions: ActionTree<CartStartInterface, StateInterface> = {
  addCart(context, payload: ICartInfo) {
    context.commit('addNewCart', payload);
  },

  editCart(context, payload: ICartInfo) {
    context.commit('updateCart', payload);
  },

  deleteCart(context, payload: ICartInfo) {
    context.commit('deleteCart', payload);
  },
};

export default actions;
