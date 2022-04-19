import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { CartStateInterface } from './state';

const getters: GetterTree<CartStateInterface, StateInterface> = {
  someGetter(/* context */) {
    // your code
  },
};

export default getters;
