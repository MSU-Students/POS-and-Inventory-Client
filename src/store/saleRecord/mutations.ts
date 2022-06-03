import { SaleRecord } from 'src/interfaces/saleRecord.interface';
import { MutationTree } from 'vuex';
import { SaleRecordStateInterface } from './state';

const mutation: MutationTree<SaleRecordStateInterface> = {
  setNewSaleRecord(state, payload: SaleRecord) {
    state.newSaleRecord = payload;
  },
  updateSaleRecord(state, payload: SaleRecord) {
    state.newSaleRecord = payload;
  },
  deleteSaleRecord(state, payload: any) {
    state.allSaleRecord.push(payload);
  },

  getAllSaleRecord(state, payload) {
    state.allSaleRecord = [];
    state.allSaleRecord.push(...payload);
  },

  getOneSaleRecord(state, payload) {
    state.allSaleRecord = payload;
  },
};

export default mutation;
