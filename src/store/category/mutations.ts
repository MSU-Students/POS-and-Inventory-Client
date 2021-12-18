import { MutationTree } from 'vuex';
import { ICategoryInfo, CategoryStateInterface } from './state';

const mutation: MutationTree<CategoryStateInterface> = {
  setCategory(state, payload: ICategoryInfo) {
    state.allCategory.push(payload);
  },
  setNewCategory(state, payload: ICategoryInfo) {
    const index = state.allCategory.findIndex(
      (s) => s.categoryID === payload.categoryID
    );
    if (index >= 0) {
      state.allCategory.splice(index, 1, payload);
    }
  },
  deleteCategory(state, payload: ICategoryInfo) {
    const index = state.allCategory.findIndex(
      (s) => s.categoryID === payload.categoryID
    );
    if (index >= 0) {
      state.allCategory.splice(index, 1);
    }
  },
};

export default mutation;
