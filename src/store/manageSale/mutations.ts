import { MutationTree } from 'vuex';
import { ManageSaleStateInterface, IManageSaleInfo } from './state';

const mutation: MutationTree<ManageSaleStateInterface> = {
  setManageSale(state, payload: IManageSaleInfo) {
    state.allManageSale.push(payload);
  },
  setNewManageSale(state, payload: IManageSaleInfo) {
    const index = state.allManageSale.findIndex(
      (s) => s.product_ID === payload.product_ID
    );
    if (index >= 0) {
      state.allManageSale.splice(index, 1, payload);
    }
  },
  deleteManageSale(state, payload: IManageSaleInfo) {
    const index = state.allManageSale.findIndex(
      (s) => s.product_ID === payload.product_ID
    );
    if (index >= 0) {
      state.allManageSale.splice(index, 1);
    }
  },
};

export default mutation;
