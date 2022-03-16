import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { CartStartInterface } from './state';

const getters: GetterTree<CartStartInterface, StateInterface> = {
  someGetter(/* context */) {
    // your code
  },
};

export default getters;
