import { MutationTree } from 'vuex';
import { iInventoryInfo, InventoryStateInterface } from './state';

const mutation: MutationTree<InventoryStateInterface> = {
  setInventory(state, payload: iInventoryInfo) {
    state.allInventory.push(payload);
  },
  setNewInventory(state, payload: iInventoryInfo) {
    const index = state.allInventory.findIndex(
      (s) => s.itemCode === payload.itemCode
    );
    if (index >= 0) {
      state.allInventory.splice(index, 1, payload);
    }
  },
  deleteInventory(state, payload: iInventoryInfo) {
    const index = state.allInventory.findIndex(
      (s) => s.itemCode === payload.itemCode
    );
    if (index >= 0) {
      state.allInventory.splice(index, 1);
    }
  },
};

export default mutation;
