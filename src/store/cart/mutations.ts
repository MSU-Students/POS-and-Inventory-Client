import { MutationTree } from 'vuex';
import { CartStateInterface, ICartInfo } from './state';

const mutation: MutationTree<CartStateInterface> = {
  setNewCart(state, payload: ICartInfo) {
    state.allCart.push(payload);
  },
  updateCart(state, payload: ICartInfo) {
    const index = state.allCart.findIndex((s) => s.orderID === payload.orderID);
    if (index >= 0) {
      state.allCart.splice(index, 1, payload);
    }
  },
  deleteCart(state, payload: ICartInfo) {
    const index = state.allCart.findIndex((s) => s.orderID === payload.orderID);
    if (index >= 0) {
      state.allCart.splice(index, 1);
    }
  },
};

export default mutation;
