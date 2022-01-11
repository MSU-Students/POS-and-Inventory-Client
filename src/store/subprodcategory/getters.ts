import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import {  SubprodCategoryStateInterface } from './state';

const getters: GetterTree< SubprodCategoryStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default getters;
