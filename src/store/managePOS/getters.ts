import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ManagePOSStateInterface } from './state';

const getters: GetterTree<ManagePOSStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default getters;
