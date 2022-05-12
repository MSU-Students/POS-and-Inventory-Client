import { Users } from 'src/interfaces/users.interface';
import { MutationTree } from 'vuex';
import { AccountStateInterface } from './state';

const mutation: MutationTree<AccountStateInterface> = {
  setNewAccount(state, payload) {
    state.newUser = payload;
  },
  updateAccount(state, payload) {
    state.newUser = payload;
  },
  deleteAccount(state, payload) {
    state.allAccount.push(payload);
  },

  getAllUser(state, payload) {
    state.allAccount = [];
    state.allAccount.push(...payload);
  },

  getUsername(state, payload) {
    state.allAccount = payload;
  },

  getOneUser(state, payload) {
    state.allAccount = payload;
  },

  getProfile(state, payload) {
    state.allAccount = payload;
  },
};
export default mutation;
