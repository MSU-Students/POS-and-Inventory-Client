import { MutationTree } from 'vuex';
import { IPurchaseInfo, PurchaseStateInterface } from './state';

const mutation: MutationTree<PurchaseStateInterface> = {
  setPurchase(state, payload: IPurchaseInfo) {
    state.allPurchase.push(payload);
  },
  setNewPurchase(state, payload: IPurchaseInfo) {
    const index = state.allPurchase.findIndex(
      (s) => s.purchaseReference === payload.purchaseReference
    );
    if (index >= 0) {
      state.allPurchase.splice(index, 1, payload);
    }
  },
  deletePurchase(state, payload: IPurchaseInfo) {
    const index = state.allPurchase.findIndex(
      (s) => s.purchaseReference === payload.purchaseReference
    );
    if (index >= 0) {
      state.allPurchase.splice(index, 1);
    }
  },
};

export default mutation;
