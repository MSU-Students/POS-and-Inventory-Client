import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { AccountStateInterface, AccountInfo } from './state';

const actions: ActionTree<AccountStateInterface, StateInterface> = {
  newAccount(context, newAccount: AccountInfo) {
    // call your server API
    if (
      newAccount.FName != '' &&
      newAccount.MName != '' &&
      newAccount.LName != '' &&
      newAccount.username != '' &&
      newAccount.password != ''
    ) {
      context.commit('addAccount', newAccount);
    }
  },
  editAccount(context, updateAccount: AccountInfo) {
    // call your server API
    context.commit('updateAccount', updateAccount);
  },
  deleteAccount(context, targetAccount: AccountInfo) {
    // call your server API
    context.commit('removeAccount', targetAccount);
  },
};

export default actions;
