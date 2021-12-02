import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ExpensesStateInterface } from './state';

const getters: GetterTree<ExpensesStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default getters;
