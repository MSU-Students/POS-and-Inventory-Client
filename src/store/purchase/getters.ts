import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { PurchaseStateInterface } from './state';

const getters: GetterTree<PurchaseStateInterface, StateInterface> = {
  pendingPurchase(state) {
    return state.allPurchase.filter((i) =>
      /^pending$/i.test(i.purchaseStatus || '')
    );
  },

  completePurchase(state) {
    return state.allPurchase.filter((i) =>
      /^completed$/i.test(i.purchaseStatus || '')
    );
  },

  cancelPurchase(state) {
    return state.allPurchase.filter((i) =>
      /^canceled$/i.test(i.purchaseStatus || '')
    );
  },
};

export default getters;
