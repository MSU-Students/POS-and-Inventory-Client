import { MutationTree } from 'vuex';
import { CartStateInterface, ICartInfo } from './state';

const mutation: MutationTree<CartStateInterface> = {
  setNewCart(state, payload: ICartInfo) {
    state.allCart.push(payload);
  },
  updateCart(state, payload: ICartInfo) {
    const index = state.allCart.findIndex((s) => s.cart_ID === payload.cart_ID);
    if (index >= 0) {
      state.allCart.splice(index, 1, payload);
    }
  },
  deleteCart(state, payload: ICartInfo) {
    const index = state.allCart.findIndex((s) => s.cart_ID === payload.cart_ID);
    if (index >= 0) {
      state.allCart.splice(index, 1);
    }
  },
  clear(state) {
    state.allCart = [];
  },
};

export default mutation;
