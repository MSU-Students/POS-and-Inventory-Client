import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { CustomertateInterface } from './state';

const getters: GetterTree<CustomertateInterface, StateInterface> = {
  someGetter(/* context */) {
    // your code
  },
};

export default getters;
