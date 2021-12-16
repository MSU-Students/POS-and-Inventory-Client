import { MutationTree } from 'vuex';
import { ISupplierInfo, SupplierStateInterface } from './state';

const mutation: MutationTree<SupplierStateInterface> = {
  setSupplier(state, payload: ISupplierInfo) {
    state.allSupplier.push(payload);
  },
  setNewSupplier(state, payload: ISupplierInfo) {
    const index = state.allSupplier.findIndex(
      (s) => s.supplierId === payload.supplierId
    );
    if (index >= 0) {
      state.allSupplier.splice(index, 1, payload);
    }
  },
  deleteSupplier(state, payload: ISupplierInfo) {
    const index = state.allSupplier.findIndex(
      (s) => s.supplierId === payload.supplierId
    );
    if (index >= 0) {
      state.allSupplier.splice(index, 1);
    }
  },
};

export default mutation;
