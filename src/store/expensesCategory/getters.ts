import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { expensesCategoryStateInterface } from './state';

const getters: GetterTree<expensesCategoryStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default getters;
