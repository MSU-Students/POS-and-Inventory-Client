import { Inventory } from 'src/interfaces/inventory.interface';
import { MutationTree } from 'vuex';
import { InventoryStateInterface } from './state';

const mutation: MutationTree<InventoryStateInterface> = {
  setNewInventory(state, payload: Inventory) {
    state.newInventory = payload;
  },
  updateInventory(state, payload: any) {
    state.allInventory.push(payload);
  },
  deleteInventory(state, payload: any) {
    state.allInventory.push(payload);
  },

  getAllInventory(state, payload) {
    state.allInventory = [];
    state.allInventory.push(...payload);
  },

  getOneInventory(state, payload) {
    state.allInventory = payload;
  },
};

export default mutation;
