import { SellOrder } from 'src/interfaces/sale-order.interface';
import { MutationTree } from 'vuex';
import { SaleOrderStateInterface } from './state';

const mutation: MutationTree<SaleOrderStateInterface> = {
  setNewSaleOrder(state, payload: SellOrder) {
    state.newSaleOrder = payload;
  },
  updateSaleOrder(state, payload: SellOrder) {
    state.newSaleOrder = payload;
  },
  deleteSaleOrder(state, payload: any) {
    state.allSaleOrder.push(payload);
  },

  getAllSaleOrder(state, payload) {
    state.allSaleOrder = [];
    state.allSaleOrder.push(...payload);
  },

  getByItemName(state, payload) {
    state.allSaleOrder = [];
    state.allSaleOrder = payload;
  },

  getOneSaleOrder(state, payload) {
    state.allSaleOrder = payload;
  },
};

export default mutation;
