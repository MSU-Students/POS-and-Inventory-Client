import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { SaleOrderStateInterface } from './state';

const getters: GetterTree<SaleOrderStateInterface, StateInterface> = {
  someGetter(/* context */) {
    // your code
  },
};

export default getters;
