import { MutationTree } from 'vuex';
import { ISubProdCategoryInfo, SubprodCategoryStateInterface } from './state';

const mutation: MutationTree<SubprodCategoryStateInterface> = {
  setCategory(state, payload: ISubProdCategoryInfo) {
    state.allSubCategory.push(payload);
  },
  setNewCategory(state, payload: ISubProdCategoryInfo) {
    const index = state.allSubCategory.findIndex(
      (s) => s.subCategoryID === payload.subCategoryID
    );
    if (index >= 0) {
      state.allSubCategory.splice(index, 1, payload);
    }
  },
  deleteCategory(state, payload: ISubProdCategoryInfo) {
    const index = state.allSubCategory.findIndex(
      (s) => s.subCategoryID === payload.subCategoryID
    );
    if (index >= 0) {
      state.allSubCategory.splice(index, 1);
    }
  },
};

export default mutation;
