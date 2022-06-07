import { date } from 'quasar';
import { Inventory } from 'src/interfaces/inventory.interface';
import { InventoryDto } from 'src/services/rest-api';
import { MutationTree } from 'vuex';
import { InventoryStateInterface } from './state';

const mutation: MutationTree<InventoryStateInterface> = {
  setNewInventory(state, payload: Inventory) {
    state.newInventory = payload;
  },
  updateInventory(state, payload: Inventory) {
    state.newInventory = payload;
  },
  deleteInventory(state, payload: any) {
    state.allInventory.push(payload);
  },

  getAllInventory(state, payload: InventoryDto[]) {
    state.allInventory = [];
    state.allInventory.push(...payload);
  },

  editInventoryStatus(state, payload) {
    state.allInventory = [];
    state.allInventory.push(...payload);
  },

  getByItemName(state, payload) {
    state.allInventory = [];
    state.allInventory = payload;
  },

  getOneInventory(state, payload) {
    state.allInventory = payload;
  },
};

export default mutation;
