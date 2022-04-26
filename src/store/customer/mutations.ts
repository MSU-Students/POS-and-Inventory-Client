import { MutationTree } from 'vuex';
import { CustomertateInterface } from './state';

const mutation: MutationTree<CustomertateInterface> = {
  setNewCustomer(state, payload) {
    state.newCustomer = payload;
  },
  updateCustomer(state, payload) {
    state.newCustomer = payload;
  },
  deleteCustomer(state, payload) {
    state.allCustomer.push(payload);
  },

  getAllCustomer(state, payload) {
    state.allCustomer = [];
    state.allCustomer.push(...payload);
  },

  getOneCustomer(state, payload) {
    state.allCustomer = payload;
  },
};

export default mutation;
