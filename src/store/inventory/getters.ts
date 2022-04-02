import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { InventoryStateInterface } from './state';

const getters: GetterTree<InventoryStateInterface, StateInterface> = {
  availableInventory(state) {
    return state.allInventory.filter((i) =>
      /^available$/i.test(i.itemStatus || '')
    );
  },
  usedInventory(state) {
    return state.allInventory.filter(
      (i) => !/^available$/i.test(i.itemStatus || '')
    );
  },
};

export default getters;
