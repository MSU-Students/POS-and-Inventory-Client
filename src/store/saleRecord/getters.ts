import { date } from 'quasar';
import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { SaleRecordStateInterface } from './state';

const getters: GetterTree<SaleRecordStateInterface, StateInterface> = {
  getJanSale(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allSaleRecord
      .filter((s) => s.sales_order_created.match(currentMonth + '-01'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  },
  getFebSale(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allSaleRecord
      .filter((s) => s.sales_order_created.match(currentMonth + '-02'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  },
  getMarchSale(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allSaleRecord
      .filter((s) => s.sales_order_created.match(currentMonth + '-03'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  },
  getAprilSale(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allSaleRecord
      .filter((s) => s.sales_order_created.match(currentMonth + '-04'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  },
  getMaySale(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allSaleRecord
      .filter((s) => s.sales_order_created.match(currentMonth + '-05'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  },
  getJuneSale(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allSaleRecord
      .filter((s) => s.sales_order_created.match(currentMonth + '-06'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  },
  getJulySale(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allSaleRecord
      .filter((s) => s.sales_order_created.match(currentMonth + '-07'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  },
  getAugSale(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allSaleRecord
      .filter((s) => s.sales_order_created.match(currentMonth + '-08'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  },
  getSeptSale(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allSaleRecord
      .filter((s) => s.sales_order_created.match(currentMonth + '-09'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  },
  getOctSale(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allSaleRecord
      .filter((s) => s.sales_order_created.match(currentMonth + '-10'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  },
  getNovSale(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allSaleRecord
      .filter((s) => s.sales_order_created.match(currentMonth + '-11'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  },
  getDecSale(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allSaleRecord
      .filter((s) => s.sales_order_created.match(currentMonth + '-12'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  },
  getDailySale(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY-MM-DD');
    const result = state.allSaleRecord
      .filter((s) => s.sales_order_created.match(currentMonth))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  },
  getMonthlySale(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allSaleRecord
      .filter((s) => s.sales_order_created.match(currentMonth))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  },

  getYearlySale(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allSaleRecord
      .filter((s) => s.sales_order_created.match(currentMonth))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  },

  get2022Sale(state) {
    const result = state.allSaleRecord
      .filter((s) => s.sales_order_created.match('2022'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  },
  get2023Sale(state) {
    const result = state.allSaleRecord
      .filter((s) => s.sales_order_created.match('2023'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  },
  get2024Sale(state) {
    const result = state.allSaleRecord
      .filter((s) => s.sales_order_created.match('2024'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  },
  get2025Sale(state) {
    const result = state.allSaleRecord
      .filter((s) => s.sales_order_created.match('2025'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  },
  get2026Sale(state) {
    const result = state.allSaleRecord
      .filter((s) => s.sales_order_created.match('2026'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  },
  get2027Sale(state) {
    const result = state.allSaleRecord
      .filter((s) => s.sales_order_created.match('2027'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  },
  get2028Sale(state) {
    const result = state.allSaleRecord
      .filter((s) => s.sales_order_created.match('2028'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  },
  get2029Sale(state) {
    const result = state.allSaleRecord
      .filter((s) => s.sales_order_created.match('2029'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  },
  get2030Sale(state) {
    const result = state.allSaleRecord
      .filter((s) => s.sales_order_created.match('2030'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  },
};

export default getters;
