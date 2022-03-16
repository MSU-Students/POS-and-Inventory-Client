import { MutationTree } from 'vuex';
import { CartStartInterface, ICartInfo } from './state';

const mutation: MutationTree<CartStartInterface> = {
  addNewCart(state, payload: ICartInfo) {
    state.allCart.push(payload);
  },

  updateCart(state, payload: ICartInfo) {
    const index = state.allCart.findIndex(
      (s) => s.productName === payload.productName
    );
    if (index >= 0) {
      state.allCart.splice(index, 1, payload);
    }
  },

  deleteCart(state, payload: ICartInfo) {
    const index = state.allCart.findIndex(
      (s) => s.productName === payload.productName
    );
    if (index >= 0) {
      state.allCart.splice(index, 1);
    }
  },
};

export default mutation;
