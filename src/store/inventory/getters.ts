import { date } from 'quasar';
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
    return state.allInventory.filter((i) => /^used$/i.test(i.itemStatus || ''));
  },

  expiredInventory(state) {
    return state.allInventory.filter((i) =>
      /^expired$/i.test(i.itemStatus || '')
    );
  },
  getNearExpire(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY-MM');

    const result = state.allInventory.filter(
      (i) =>
        i.itemStatus === 'Available' && i.itemExpiryDate?.match(currentMonth)
    );

    return result;
  },
  getLowStock(state) {
    const result = state.allInventory.filter(
      (i) => i.itemStatus === 'Available' && i.itemQuantStatus < 10
    );
    return result;
  },
};

export default getters;
