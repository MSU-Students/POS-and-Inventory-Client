import { MutationTree } from 'vuex';
import { IInventoryCatInfo, InventoryCatStateInterface } from './state';

const mutation: MutationTree<InventoryCatStateInterface> = {
  setInventoryCat(state, payload: IInventoryCatInfo) {
    state.allInventoryCat.push(payload);
  },
  setNewInventoryCat(state, payload: IInventoryCatInfo) {
    const index = state.allInventoryCat.findIndex(
      (s) => s.categoryID === payload.categoryID
    );
    if (index >= 0) {
      state.allInventoryCat.splice(index, 1, payload);
    }
  },
  deleteInventoryCat(state, payload: IInventoryCatInfo) {
    const index = state.allInventoryCat.findIndex(
      (s) => s.categoryID === payload.categoryID
    );
    if (index >= 0) {
      state.allInventoryCat.splice(index, 1);
    }
  },
};

export default mutation;
