import { SubprodCategory } from 'src/interfaces/sub-productCategory';
import { MutationTree } from 'vuex';
import { SubCategoryStateInterface } from './state';

const mutation: MutationTree<SubCategoryStateInterface> = {
  setNewSubProductCat(state, payload: SubprodCategory) {
    state.newSubCategory = payload;
  },
  updateSubProductCat(state, payload: SubprodCategory) {
    state.newSubCategory = payload;
  },
  deleteSubProductCat(state, payload: any) {
    state.allSubProdCat.push(payload);
  },

  getAllSubProductCat(state, payload) {
    state.allSubProdCat = [];
    state.allSubProdCat.push(...payload);
  },

  getOneSubProductCat(state, payload) {
    state.allSubProdCat = payload;
  },
};

export default mutation;
