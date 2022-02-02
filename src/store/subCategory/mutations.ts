import { MutationTree } from 'vuex';
import { ISubProdCategoryInfo, SubCategoryStateInterface } from './state';

const mutation: MutationTree<SubCategoryStateInterface> = {
  setSubCategory(state, payload: ISubProdCategoryInfo) {
    state.allSubProdCat.push(payload);
  },
  setNewSubCategory(state, payload: ISubProdCategoryInfo) {
    const index = state.allSubProdCat.findIndex(
      (s) => s.subProdCatId === payload.subProdCatId
    );
    if (index >= 0) {
      state.allSubProdCat.splice(index, 1, payload);
    }
  },
  deleteSubCategory(state, payload: ISubProdCategoryInfo) {
    const index = state.allSubProdCat.findIndex(
      (s) => s.subProdCatId === payload.subProdCatId
    );
    if (index >= 0) {
      state.allSubProdCat.splice(index, 1);
    }
  },
};

export default mutation;
