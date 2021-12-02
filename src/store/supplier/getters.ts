import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { SupplierStateInterface } from './state';

const getters: GetterTree<SupplierStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default getters;
