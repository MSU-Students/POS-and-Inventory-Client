import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ProductStateInterface, IProductInfo } from './state';

const actions: ActionTree<ProductStateInterface, StateInterface> = {
  addOrder(context, payload: IProductInfo) {
    context.commit('setProduct', payload);
  },

  editOrder(context, payload: IProductInfo) {
    context.commit('setNewProduct', payload);
  },

  deleteOrder(context, payload: IProductInfo) {
    context.commit('deleteProduct', payload);
  },
};

export default actions;
