import { date } from 'quasar';
import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { PurchaseStateInterface } from './state';

const getters: GetterTree<PurchaseStateInterface, StateInterface> = {
  pendingPurchase(state) {
    return state.allPurchase.filter((i) =>
      /^pending$/i.test(i.purchaseStatus || '')
    );
  },

  completePurchase(state) {
    return state.allPurchase.filter((i) =>
      /^completed$/i.test(i.purchaseStatus || '')
    );
  },

  cancelPurchase(state) {
    return state.allPurchase.filter((i) =>
      /^canceled$/i.test(i.purchaseStatus || '')
    );
  },

  getDailyPurchase(state) {
    const dateNow = new Date();
    const year = date.formatDate(dateNow, 'YYYY-MM-DD');
    const result = state.allPurchase
      .filter(
        (s) =>
          /^completed$/i.test(s.purchaseStatus || '') &&
          s.purchaseDate.match(year)
      )
      .reduce<number>((accumulator, current) => {
        return accumulator + current.purchaseAmount;
      }, 0);
    return result.toFixed(2);
  },

  getMonthlyPurchase(state) {
    const dateNow = new Date();
    const year = date.formatDate(dateNow, 'YYYY-MM');
    const result = state.allPurchase
      .filter(
        (s) =>
          /^completed$/i.test(s.purchaseStatus || '') &&
          s.purchaseDate.match(year)
      )
      .reduce<number>((accumulator, current) => {
        return accumulator + current.purchaseAmount;
      }, 0);
    return result.toFixed(2);
  },

  getCostPurchaseJan(state) {
    const dateNow = new Date();
    const year = date.formatDate(dateNow, 'YYYY');
    const result = state.allPurchase
      .filter(
        (s) =>
          /^completed$/i.test(s.purchaseStatus || '') &&
          s.purchaseDate.match(year + '-01')
      )
      .reduce<number>((accumulator, current) => {
        return accumulator + current.purchaseAmount;
      }, 0);
    return result.toFixed(2);
  },
  getCostPurchaseFeb(state) {
    const dateNow = new Date();
    const year = date.formatDate(dateNow, 'YYYY');
    const result = state.allPurchase
      .filter(
        (s) =>
          /^completed$/i.test(s.purchaseStatus || '') &&
          s.purchaseDate.match(year + '-02')
      )
      .reduce<number>((accumulator, current) => {
        return accumulator + current.purchaseAmount;
      }, 0);
    return result.toFixed(2);
  },
  getCostPurchaseMarch(state) {
    const dateNow = new Date();
    const year = date.formatDate(dateNow, 'YYYY');
    const result = state.allPurchase
      .filter(
        (s) =>
          /^completed$/i.test(s.purchaseStatus || '') &&
          s.purchaseDate.match(year + '-03')
      )
      .reduce<number>((accumulator, current) => {
        return accumulator + current.purchaseAmount;
      }, 0);
    return result.toFixed(2);
  },
  getCostPurchaseApril(state) {
    const dateNow = new Date();
    const year = date.formatDate(dateNow, 'YYYY');
    const result = state.allPurchase
      .filter(
        (s) =>
          /^completed$/i.test(s.purchaseStatus || '') &&
          s.purchaseDate.match(year + '-04')
      )
      .reduce<number>((accumulator, current) => {
        return accumulator + current.purchaseAmount;
      }, 0);
    return result.toFixed(2);
  },
  getCostPurchaseMay(state) {
    const dateNow = new Date();
    const year = date.formatDate(dateNow, 'YYYY');
    const result = state.allPurchase
      .filter(
        (s) =>
          /^completed$/i.test(s.purchaseStatus || '') &&
          s.purchaseDate.match(year + '-05')
      )
      .reduce<number>((accumulator, current) => {
        return accumulator + current.purchaseAmount;
      }, 0);
    return result.toFixed(2);
  },
  getCostPurchaseJune(state) {
    const dateNow = new Date();
    const year = date.formatDate(dateNow, 'YYYY');
    const result = state.allPurchase
      .filter(
        (s) =>
          /^completed$/i.test(s.purchaseStatus || '') &&
          s.purchaseDate.match(year + '-06')
      )
      .reduce<number>((accumulator, current) => {
        return accumulator + current.purchaseAmount;
      }, 0);
    return result.toFixed(2);
  },
  getCostPurchaseJuly(state) {
    const dateNow = new Date();
    const year = date.formatDate(dateNow, 'YYYY');
    const result = state.allPurchase
      .filter(
        (s) =>
          /^completed$/i.test(s.purchaseStatus || '') &&
          s.purchaseDate.match(year + '-07')
      )
      .reduce<number>((accumulator, current) => {
        return accumulator + current.purchaseAmount;
      }, 0);
    return result.toFixed(2);
  },
  getCostPurchaseAug(state) {
    const dateNow = new Date();
    const year = date.formatDate(dateNow, 'YYYY');
    const result = state.allPurchase
      .filter(
        (s) =>
          /^completed$/i.test(s.purchaseStatus || '') &&
          s.purchaseDate.match(year + '-08')
      )
      .reduce<number>((accumulator, current) => {
        return accumulator + current.purchaseAmount;
      }, 0);
    return result.toFixed(2);
  },
  getCostPurchaseSept(state) {
    const dateNow = new Date();
    const year = date.formatDate(dateNow, 'YYYY');
    const result = state.allPurchase
      .filter(
        (s) =>
          /^completed$/i.test(s.purchaseStatus || '') &&
          s.purchaseDate.match(year + '-09')
      )
      .reduce<number>((accumulator, current) => {
        return accumulator + current.purchaseAmount;
      }, 0);
    return result.toFixed(2);
  },
  getCostPurchaseOct(state) {
    const dateNow = new Date();
    const year = date.formatDate(dateNow, 'YYYY');
    const result = state.allPurchase
      .filter(
        (s) =>
          /^completed$/i.test(s.purchaseStatus || '') &&
          s.purchaseDate.match(year + '-10')
      )
      .reduce<number>((accumulator, current) => {
        return accumulator + current.purchaseAmount;
      }, 0);
    return result.toFixed(2);
  },
  getCostPurchaseNov(state) {
    const dateNow = new Date();
    const year = date.formatDate(dateNow, 'YYYY');
    const result = state.allPurchase
      .filter(
        (s) =>
          /^completed$/i.test(s.purchaseStatus || '') &&
          s.purchaseDate.match(year + '-11')
      )
      .reduce<number>((accumulator, current) => {
        return accumulator + current.purchaseAmount;
      }, 0);
    return result.toFixed(2);
  },
  getCostPurchaseDec(state) {
    const dateNow = new Date();
    const year = date.formatDate(dateNow, 'YYYY');
    const result = state.allPurchase
      .filter(
        (s) =>
          /^completed$/i.test(s.purchaseStatus || '') &&
          s.purchaseDate.match(year + '-12')
      )
      .reduce<number>((accumulator, current) => {
        return accumulator + current.purchaseAmount;
      }, 0);
    return result.toFixed(2);
  },
};

export default getters;
