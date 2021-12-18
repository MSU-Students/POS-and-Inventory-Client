import { MutationTree } from 'vuex';
import { IAccountInfo, AccountStateInterface } from './state';

const mutation: MutationTree<AccountStateInterface> = {
  setAccount(state, payload: IAccountInfo) {
    state.allAccount.push(payload);
  },
  setNewAccount(state, payload: IAccountInfo) {
    const index = state.allAccount.findIndex(
      (s) => s.accountID === payload.accountID
    );
    if (index >= 0) {
      state.allAccount.splice(index, 1, payload);
    }
  },
  deleteAccount(state, payload: IAccountInfo) {
    const index = state.allAccount.findIndex(
      (s) => s.accountID === payload.accountID
    );
    if (index >= 0) {
      state.allAccount.splice(index, 1);
    }
  },
};

export default mutation;
