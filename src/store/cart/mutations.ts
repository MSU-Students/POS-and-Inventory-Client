import { Http2ServerRequest } from 'http2';
import { MutationTree } from 'vuex';
import { CartStateInterface, ICartInfo } from './state';

const mutation: MutationTree<CartStateInterface> = {
  setNewCart(state, payload: ICartInfo) {
    const exist = state.allCart.find(
      (order) =>
        order.orderName === payload.orderName &&
        order.orderSize === payload.orderSize
    );
    if (!exist) {
      const res = state.allCart.push({
        ...payload,
        orderQuant: 0,
        orderSubTotal: payload.orderQuant * payload.orderPrice,
      });
    }
    if (exist) {
      const ex = exist.orderQuant++;
      const x = (exist.orderSubTotal = exist.orderQuant * exist.orderPrice);
      console.log(ex, x);
    }
  },
  updateCart(state, payload: ICartInfo) {
    const index = state.allCart.findIndex((s) => s.cart_ID === payload.cart_ID);
    if (index >= 0) {
      state.allCart.splice(index, 1, {
        ...payload,
        orderSubTotal: payload.orderQuant * payload.orderPrice,
      });
    }
  },
  deleteCart(state, payload: ICartInfo) {
    const index = state.allCart.findIndex((s) => s.cart_ID === payload.cart_ID);
    if (index >= 0) {
      state.allCart.splice(index, 1);
    }
  },
  clear(state) {
    state.allCart = [];
  },
};

export default mutation;
