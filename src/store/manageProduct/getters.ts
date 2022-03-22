import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ManageProductStateInterface } from './state';

const getters: GetterTree<ManageProductStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default getters;
