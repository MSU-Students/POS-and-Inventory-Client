import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { PurchaseStateInterface } from './state';

const getters: GetterTree<PurchaseStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default getters;
