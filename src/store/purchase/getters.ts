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
    return result;
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
    return result;
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
    return result;
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
    return result;
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
    return result;
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
    return result;
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
    return result;
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
    return result;
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
    return result;
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
    return result;
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
    return result;
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
    return result;
  },
};

export default getters;
