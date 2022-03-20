import { MutationTree } from 'vuex';
import { PurchaseStateInterface } from './state';

const mutation: MutationTree<PurchaseStateInterface> = {
  setNewPurchase(state, payload) {
    state.newPurchase = payload;
  },
  updatePurchase(state, payload) {
    state.newPurchase = payload;
  },
  deletePurchase(state, payload) {
    state.allPurchase.push(payload);
  },

  getAllPurchase(state, payload) {
    state.allPurchase = [];
    state.allPurchase.push(...payload);
  },

  getOnePurchase(state, payload) {
    state.allPurchase = payload;
  },
};

export default mutation;
