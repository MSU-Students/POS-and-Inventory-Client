import { Supplier } from 'src/interfaces/supplier.interface';
import { MutationTree } from 'vuex';
import { SupplierStateInterface } from './state';

const mutation: MutationTree<SupplierStateInterface> = {
  setNewSupplier(state, payload: Supplier) {
    state.newSupplier = payload;
  },
  updateSupplier(state, payload: any) {
    state.newSupplier = payload;
  },
  deleteSupplier(state, payload: any) {
    state.allSupplier.push(payload);
  },

  getAllSupplier(state, payload) {
    state.allSupplier = [];
    state.allSupplier.push(...payload);
  },

  getOneSupplier(state, payload) {
    state.allSupplier = payload;
  },
};
export default mutation;
