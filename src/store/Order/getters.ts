import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { OrderStateInterface } from './state';

const getters: GetterTree<OrderStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default getters;
