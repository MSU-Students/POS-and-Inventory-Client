import { MutationTree } from 'vuex';
import { ProductCategoryStateInterface } from './state';

const mutation: MutationTree<ProductCategoryStateInterface> = {
  setNewProductCategory(state, payload) {
    state.newProductCategory = payload;
  },
  updateProductCategory(state, payload) {
    state.newProductCategory = payload;
  },
  deleteProductCat(state, payload) {
    state.allProdCategory.push(payload);
  },

  getAllProductCategory(state, payload) {
    state.allProdCategory = [];
    state.allProdCategory.push(...payload);
  },

  getOneUser(state, payload) {
    state.allProdCategory = payload;
  },
};

export default mutation;
