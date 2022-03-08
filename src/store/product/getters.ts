import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ProductStateInterface } from './state';

const getters: GetterTree<ProductStateInterface, StateInterface> = {
  allProduct(IProductInfo) {
    return IProductInfo.allProduct;
  },
};

export default getters;
