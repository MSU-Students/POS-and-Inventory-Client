import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { AccountStateInterface } from './state';

const getters: GetterTree<AccountStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default getters;
