import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { SaleOrderStateInterface } from './state';

const getters: GetterTree<SaleOrderStateInterface, StateInterface> = {
  getBestSeller(state) {
    const product = state.allSaleOrder
      .filter((s) => s.orderCategory === 'Beverage/Drinks')
      .sort((a, b) => a.orderQuant - b.orderQuant);
    return product;
  },

  getAllTimeFavoriteTotal(state) {
    const result = state.allSaleOrder
      .filter((s) => s.orderName === 'All-Time Favorites')
      .reduce<number>((accumulator, current) => {
        return accumulator + current.orderQuant;
      }, 0);
    return result;
  },
};

export default getters;
