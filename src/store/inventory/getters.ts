import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { InventoryStateInterface } from './state';

const getters: GetterTree<InventoryStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default getters;
