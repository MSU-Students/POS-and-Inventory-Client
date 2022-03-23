import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { MediaStateInterface } from './state';

const getters: GetterTree<MediaStateInterface, StateInterface> = {
  someGetter(/* context */) {
    // your code
  },
};

export default getters;
