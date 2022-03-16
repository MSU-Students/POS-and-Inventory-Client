import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { AccountStateInterface } from './state';
import userService from 'src/services/user.service';
import { UserDto } from 'src/services/rest-api';

const actions: ActionTree<AccountStateInterface, StateInterface> = {
  async addAccount(context, payload: UserDto): Promise<void> {
    const result = await userService.create(payload);
    context.commit('setNewAccount', result);
  },

  async editAccount(context, payload: any): Promise<any> {
    await userService.update(payload.id, payload);
    await context.dispatch('updateAccount');
  },

  async deleteAccount(context, id: number): Promise<any> {
    const result = await userService.delete(id);
    context.commit('deleteAccount', result);
  },

  async getAllUser(context): Promise<any> {
    const res = await userService.getAll();
    context.commit('getAllUser', res);
  },

  async getOneUser(context, id: number): Promise<any> {
    const res = await userService.getOne(id);
    context.commit('getOneUser', res);
  },

  async getProfile(context): Promise<any> {
    const res = await userService.getUserProfile();
    context.commit('getProfile', res);
    return res;
  },
};

export default actions;
