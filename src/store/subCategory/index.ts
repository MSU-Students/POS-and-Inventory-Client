import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { SubCategoryStateInterface } from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const exampleModule: Module<SubCategoryStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default exampleModule;
