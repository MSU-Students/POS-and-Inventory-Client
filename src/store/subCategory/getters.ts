import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { SubCategoryStateInterface } from './state';

const getters: GetterTree<SubCategoryStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default getters;
