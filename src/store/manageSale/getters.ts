import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ManageSaleStateInterface } from './state';

const getters: GetterTree<ManageSaleStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default getters;
