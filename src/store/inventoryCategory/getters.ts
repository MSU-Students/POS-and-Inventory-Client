import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { InventoryCatStateInterface } from './state';

const getters: GetterTree<InventoryCatStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default getters;
