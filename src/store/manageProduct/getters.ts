import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ManageProductStateInterface } from './state';

const getters: GetterTree<ManageProductStateInterface, StateInterface> = {
  availableProduct(state) {
    return state.allProduct.filter((i) =>
      /^yes$/i.test(i.productAvailability || '')
    );
  },
};

export default getters;
