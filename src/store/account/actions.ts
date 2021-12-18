import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { AccountStateInterface, IAccountInfo } from './state';

const actions: ActionTree<AccountStateInterface, StateInterface> = {
  addAccount(context, payload: IAccountInfo) {
    context.commit('setAccount', payload);
  },

  editAccount(context, payload: IAccountInfo) {
    context.commit('setNewAccount', payload);
  },

  deleteAccount(context, payload: IAccountInfo) {
    context.commit('deleteAccount', payload);
  },
};

export default actions;
