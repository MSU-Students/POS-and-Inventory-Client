import { MutationTree } from 'vuex';
import { AUser, IAuthState } from './state';

const mutation: MutationTree<IAuthState> = {
  setCurrentUser(state, payload: AUser) {
    state.currentUser = payload;
  },
};

export default mutation;
