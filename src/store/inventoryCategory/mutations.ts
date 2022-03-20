import { MutationTree } from 'vuex';
import { InventoryCatStateInterface } from './state';

const mutation: MutationTree<InventoryCatStateInterface> = {
  setNewInventoryCat(state, payload) {
    state.newInventoryCat = payload;
  },
  updateInventoryCat(state, payload) {
    state.newInventoryCat = payload;
  },
  deleteInventoryCat(state, payload) {
    state.allInventoryCat.push(payload);
  },

  getAllInventoryCategory(state, payload) {
    state.allInventoryCat = [];
    state.allInventoryCat.push(...payload);
  },

  getOneInventoryCategory(state, payload) {
    state.allInventoryCat = payload;
  },
};

export default mutation;
