import { MutationTree } from 'vuex';
import { AccountInfo, AccountStateInterface } from './state';

const mutation: MutationTree<AccountStateInterface> = {
  addAccount(state, newAccount: AccountInfo) {
    state.account.push(newAccount);
  },
  updateAccount(state, updateAccount: AccountInfo) {
    const index = state.account.findIndex((s) => {
      return s.username == updateAccount.username;
    });
    if (index >= 0) {
      state.account.splice(index, 1, updateAccount);
    }
  },
  removeAccount(state, targetAccount: AccountInfo) {
    const index = state.account.findIndex((s) => {
      return s.username == targetAccount.username;
    });
    if (index >= 0) {
      state.account.splice(index, 1);
    }
  },
};

export default mutation;
