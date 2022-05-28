import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { CartStateInterface, ICartInfo } from './state';
import { uid } from 'quasar';

const actions: ActionTree<CartStateInterface, StateInterface> = {
  addCart(context, payload: ICartInfo) {
    const id = uid();
    context.commit('setNewCart', { ...payload, cart_ID: id });
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
