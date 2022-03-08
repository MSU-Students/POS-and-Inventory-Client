import { MutationTree } from 'vuex';
import { IProductInfo, ProductStateInterface } from './state';

const mutation: MutationTree<ProductStateInterface> = {
  setOrder(state, payload: IProductInfo) {
    state.allProduct.push(payload);
  },
  setNewOrder(state, payload: IProductInfo) {
    const index = state.allProduct.findIndex(
      (s) => s.productID === payload.productID
    );
    if (index >= 0) {
      state.allProduct.splice(index, 1, payload);
    }
  },
  deleteOrder(state, payload: IProductInfo) {
    const index = state.allProduct.findIndex(
      (s) => s.productID === payload.productID
    );
    if (index >= 0) {
      state.allProduct.splice(index, 1);
    }
  },
};

export default mutation;
