import { MutationTree } from 'vuex';
import { ManageProductStateInterface } from './state';

const mutation: MutationTree<ManageProductStateInterface> = {
  setNewManageProduct(state, payload) {
    state.newProduct = payload;
  },
  updateManageProduct(state, payload) {
    state.newProduct = payload;
  },
  deleteManageProduct(state, payload) {
    state.allProduct.push(payload);
  },
  getAllProduct(state, payload) {
    state.allProduct = [];
    state.allProduct.push(...payload);
  },

  getOneProduct(state, payload) {
    state.allProduct = payload;
  },
};

export default mutation;
