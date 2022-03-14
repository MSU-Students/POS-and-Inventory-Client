import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { IAuthState } from './state';
import { posApiService } from '../../services/pos-inventory-api.service';

const actions: ActionTree<IAuthState, StateInterface> = {
  async login(context, payload: { userName: string; password: string }) {
    const user = await posApiService.loginUser(
      payload.userName,
      payload.password
    );
    context.commit('setCurrentUser', user);
  },
  async authUser(context) {
    try {
      const user = await posApiService.getProfile();
      context.commit('setCurrentUser', user.data);
      return user;
    } catch (error) {
      // work around
      localStorage.removeItem('access-token');
      localStorage.removeItem('refresh-token');
      return error;
    }
  },
};

export default actions;
