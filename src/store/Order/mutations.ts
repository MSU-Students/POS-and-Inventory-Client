import { MutationTree } from 'vuex';
import { IOrderInfo, OrderStateInterface } from './state';

const mutation: MutationTree<OrderStateInterface> = {
  setOrder(state, payload: IOrderInfo) {
    state.allOrder.push(payload);
  },
  setNewOrder(state, payload: IOrderInfo) {
    const index = state.allOrder.findIndex(
      (s) => s.orderID === payload.orderID
    );
    if (index >= 0) {
      state.allOrder.splice(index, 1, payload);
    }
  },
  deleteOrder(state, payload: IOrderInfo) {
    const index = state.allOrder.findIndex(
      (s) => s.orderID === payload.orderID
    );
    if (index >= 0) {
      state.allOrder.splice(index, 1);
    }
  },
};

export default mutation;
