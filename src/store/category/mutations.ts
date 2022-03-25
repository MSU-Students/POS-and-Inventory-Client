import { MutationTree } from 'vuex';
import { Category, CategoryStateInterface } from './state';

const mutation: MutationTree<CategoryStateInterface> = {
  setCategory(state, payload: Category) {
    state.allCategory.push(payload);
  },
  setNewCategory(state, payload: Category) {
    const index = state.allCategory.findIndex(
      (s) => s.categoryID === payload.categoryID
    );
    if (index >= 0) {
      state.allCategory.splice(index, 1, payload);
    }
  },
  deleteCategory(state, payload: Category) {
    const index = state.allCategory.findIndex(
      (s) => s.categoryID === payload.categoryID
    );
    if (index >= 0) {
      state.allCategory.splice(index, 1);
    }
  },
};

export default mutation;
