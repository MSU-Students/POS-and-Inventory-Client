import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { CartStateInterface } from './state';

const getters: GetterTree<CartStateInterface, StateInterface> = {
  getTotal(state) {
    const result = state.allCart.reduce<number>((accumulator, current) => {
      return accumulator + current.orderSubTotal;
    }, 0);
    return result.toFixed(2);
  },
};

export default getters;
