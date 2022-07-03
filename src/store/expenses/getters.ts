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

  getJanExp(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allExpenses
      .filter((s) => s.expensesDate.match(currentMonth + '-01'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    return result.toFixed(2);
  },
  getFebExp(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allExpenses
      .filter((s) => s.expensesDate.match(currentMonth + '-02'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    return result.toFixed(2);
  },
  getMarchExp(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allExpenses
      .filter((s) => s.expensesDate.match(currentMonth + '-03'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    return result.toFixed(2);
  },
  getAprilExp(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allExpenses
      .filter((s) => s.expensesDate.match(currentMonth + '-04'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    return result.toFixed(2);
  },
  getMayExp(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allExpenses
      .filter((s) => s.expensesDate.match(currentMonth + '-05'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    return result.toFixed(2);
  },
  getJuneExp(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allExpenses
      .filter((s) => s.expensesDate.match(currentMonth + '-06'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    return result.toFixed(2);
  },
  getJulyExp(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allExpenses
      .filter((s) => s.expensesDate.match(currentMonth + '-07'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    return result.toFixed(2);
  },
  getAugExp(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allExpenses
      .filter((s) => s.expensesDate.match(currentMonth + '-08'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    return result.toFixed(2);
  },
  getSeptExp(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allExpenses
      .filter((s) => s.expensesDate.match(currentMonth + '-09'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    return result.toFixed(2);
  },
  getOctExp(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allExpenses
      .filter((s) => s.expensesDate.match(currentMonth + '-10'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    return result.toFixed(2);
  },
  getNovExp(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allExpenses
      .filter((s) => s.expensesDate.match(currentMonth + '-11'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    return result.toFixed(2);
  },
  getDecExp(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allExpenses
      .filter((s) => s.expensesDate.match(currentMonth + '-12'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    return result.toFixed(2);
  },
  getJanExpFilter(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allExpenses.filter((s) =>
      s.expensesDate.match(currentMonth + '-01')
    );
    return result;
  },
  getFebExpFilter(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allExpenses.filter((s) =>
      s.expensesDate.match(currentMonth + '-02')
    );
    return result;
  },
  getMarchExpFilter(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allExpenses.filter((s) =>
      s.expensesDate.match(currentMonth + '-03')
    );
    return result;
  },
  getAprilExpFilter(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allExpenses.filter((s) =>
      s.expensesDate.match(currentMonth + '-04')
    );
    return result;
  },
  getMayExpFilter(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allExpenses.filter((s) =>
      s.expensesDate.match(currentMonth + '-05')
    );
    return result;
  },
  getJuneExpFilter(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allExpenses.filter((s) =>
      s.expensesDate.match(currentMonth + '-06')
    );
    return result;
  },
  getJulyExpFilter(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allExpenses.filter((s) =>
      s.expensesDate.match(currentMonth + '-07')
    );
    return result;
  },
  getAugExpFilter(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allExpenses.filter((s) =>
      s.expensesDate.match(currentMonth + '-08')
    );
    return result;
  },
  getSeptExpFilter(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allExpenses.filter((s) =>
      s.expensesDate.match(currentMonth + '-09')
    );
    return result;
  },
  getOctExpFilter(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allExpenses.filter((s) =>
      s.expensesDate.match(currentMonth + '-10')
    );
    return result;
  },
  getNovExpFilter(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allExpenses.filter((s) =>
      s.expensesDate.match(currentMonth + '-11')
    );
    return result;
  },
  getDecExpFilter(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY');
    const result = state.allExpenses.filter((s) =>
      s.expensesDate.match(currentMonth + '-12')
    );
    return result;
  },
};

export default getters;
