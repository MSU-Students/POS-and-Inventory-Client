import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ExpensesStateInterface } from './state';
import { date } from 'quasar';

const getters: GetterTree<ExpensesStateInterface, StateInterface> = {
  getDailyExpenses(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY-MM-DD');
    const result = state.allExpenses
      .filter((s) => s.expensesDate.match(currentMonth))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    return result.toFixed(2);
  },

  getMonthlyExpenses(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY-MM');
    const result = state.allExpenses
      .filter((s) => s.expensesDate.match(currentMonth))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    return result.toFixed(2);
  },

  getYearlyExpenses(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allExpenses
      .filter((s) => s.expensesDate.match(currentMonth))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    return result.toFixed(2);
  },
  getRentExpenses(state) {
    const dateNow = new Date();
    const CurrentMonth = date.formatDate(dateNow, 'YYYY-MM');
    const result = state.allExpenses
      .filter(
        (s) =>
          s.expensesDate.match(CurrentMonth) && s.expensesCategory === 'Rent'
      )
      .reduce<number>((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    return result.toFixed(2);
  },
  getBillExpenses(state) {
    const dateNow = new Date();
    const CurrentMonth = date.formatDate(dateNow, 'YYYY-MM');
    const result = state.allExpenses
      .filter(
        (s) =>
          s.expensesDate.match(CurrentMonth) && s.expensesCategory === 'Bills'
      )
      .reduce<number>((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    return result.toFixed(2);
  },

  getPurchaseExpenses(state) {
    const dateNow = new Date();
    const CurrentMonth = date.formatDate(dateNow, 'YYYY-MM');
    const result = state.allExpenses
      .filter(
        (s) =>
          s.expensesDate.match(CurrentMonth) &&
          s.expensesCategory === 'Purchase Order'
      )
      .reduce<number>((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    return result.toFixed(2);
  },

  getTranspoExpenses(state) {
    const dateNow = new Date();
    const CurrentMonth = date.formatDate(dateNow, 'YYYY-MM');
    const result = state.allExpenses
      .filter(
        (s) =>
          s.expensesDate.match(CurrentMonth) &&
          s.expensesCategory === 'Transportation'
      )
      .reduce<number>((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    return result.toFixed(2);
  },

  getOtherExpenses(state) {
    const dateNow = new Date();
    const CurrentMonth = date.formatDate(dateNow, 'YYYY-MM');
    const result = state.allExpenses
      .filter(
        (s) =>
          s.expensesDate.match(CurrentMonth) &&
          s.expensesCategory === 'Miscellaneous/Other'
      )
      .reduce<number>((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    return result.toFixed(2);
  },
};

export default getters;
