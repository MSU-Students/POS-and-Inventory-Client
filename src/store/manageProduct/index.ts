import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { ManageProductStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const manageProductModule: Module<ManageProductStateInterface, StateInterface> =
  {
    namespaced: true,
    actions,
    getters,
    mutations,
    state,
  };

export default manageProductModule;
