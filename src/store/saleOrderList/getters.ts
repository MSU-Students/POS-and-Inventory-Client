import { date } from 'quasar';
import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { SaleOrderStateInterface } from './state';

const getters: GetterTree<SaleOrderStateInterface, StateInterface> = {
  getTop3BestSeller(state) {
    const product = state.allSaleOrder
      .filter((s) => s.orderQuant > 0)
      .sort((a, b) => b.orderQuant - a.orderQuant)
      .reduce((p, c) => {
        const index = p.findIndex((o) => o.orderName == c.orderName);
        if (index >= 0) {
          p.splice(index, 1, {
            orderName: c.orderName,
            orderQuant: p[index].orderQuant + c.orderQuant,
          });
        } else {
          p.push({
            orderName: c.orderName,
            orderQuant: c.orderQuant,
          });
        }
        return p;
      }, [] as { orderName: string; orderQuant: number }[]);
    return product.slice(0, 3);
  },
  getBestSeller(state) {
    const product = state.allSaleOrder
      .filter((s) => s.orderQuant > 0)
      .sort((a, b) => b.orderQuant - a.orderQuant)
      .reduce((p, c) => {
        const index = p.findIndex((o) => o.orderName == c.orderName);
        if (index >= 0) {
          p.splice(index, 1, {
            orderName: c.orderName,
            orderQuant: p[index].orderQuant + c.orderQuant,
          });
        } else {
          p.push({
            orderName: c.orderName,
            orderQuant: c.orderQuant,
          });
        }
        return p;
      }, [] as { orderName: string; orderQuant: number }[]);
    return product;
  },
  getMonthlyBestSeller(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY-MM');
    const product = state.allSaleOrder
      .filter((s) => s.invoice?.sales_order_created.match(currentMonth))
      .sort((a, b) => b.orderQuant - a.orderQuant)
      .reduce((p, c) => {
        const index = p.findIndex((o) => o.orderName == c.orderName);
        if (index >= 0) {
          p.splice(index, 1, {
            orderName: c.orderName,
            orderQuant: p[index].orderQuant + c.orderQuant,
          });
        } else {
          p.push({
            orderName: c.orderName,
            orderQuant: c.orderQuant,
          });
        }
        return p;
      }, [] as { orderName: string; orderQuant: number }[]);
    return product;
  },

  getDailySeller(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY-MM-DD');
    const product = state.allSaleOrder
      .filter((s) => s.invoice?.sales_order_created.match(currentMonth))
      .sort((a, b) => b.orderQuant - a.orderQuant)
      .reduce((p, c) => {
        const index = p.findIndex((o) => o.orderName == c.orderName);
        if (index >= 0) {
          p.splice(index, 1, {
            orderName: c.orderName,
            orderQuant: p[index].orderQuant + c.orderQuant,
          });
        } else {
          p.push({
            orderName: c.orderName,
            orderQuant: c.orderQuant,
          });
        }
        return p;
      }, [] as { orderName: string; orderQuant: number }[]);
    return product;
  },

  getDrinksBestSeller(state) {
    const product = state.allSaleOrder
      .filter((s) => s.orderQuant > 0 && s.orderCategory === 'Beverage/Drinks')
      .sort((a, b) => b.orderQuant - a.orderQuant)
      .reduce((p, c) => {
        const index = p.findIndex((o) => o.orderName == c.orderName);
        if (index >= 0) {
          p.splice(index, 1, {
            orderName: c.orderName,
            orderQuant: p[index].orderQuant + c.orderQuant,
          });
        } else {
          p.push({
            orderName: c.orderName,
            orderQuant: c.orderQuant,
          });
        }
        return p;
      }, [] as { orderName: string; orderQuant: number }[]);
    return product;
  },

  getDailyDrinksBestSeller(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY-MM-DD');
    const product = state.allSaleOrder
      .filter(
        (s) =>
          s.invoice?.sales_order_created.match(currentMonth) &&
          s.orderCategory === 'Beverage/Drinks'
      )
      .sort((a, b) => b.orderQuant - a.orderQuant)
      .reduce((p, c) => {
        const index = p.findIndex((o) => o.orderName == c.orderName);
        if (index >= 0) {
          p.splice(index, 1, {
            orderName: c.orderName,
            orderQuant: p[index].orderQuant + c.orderQuant,
          });
        } else {
          p.push({
            orderName: c.orderName,
            orderQuant: c.orderQuant,
          });
        }
        return p;
      }, [] as { orderName: string; orderQuant: number }[]);
    return product;
  },

  getMonthlyDrinksBestSeller(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY-MM');
    const product = state.allSaleOrder
      .filter(
        (s) =>
          s.invoice?.sales_order_created.match(currentMonth) &&
          s.orderCategory === 'Beverage/Drinks'
      )
      .sort((a, b) => b.orderQuant - a.orderQuant)
      .reduce((p, c) => {
        const index = p.findIndex((o) => o.orderName == c.orderName);
        if (index >= 0) {
          p.splice(index, 1, {
            orderName: c.orderName,
            orderQuant: p[index].orderQuant + c.orderQuant,
          });
        } else {
          p.push({
            orderName: c.orderName,
            orderQuant: c.orderQuant,
          });
        }
        return p;
      }, [] as { orderName: string; orderQuant: number }[]);
    return product;
  },
  getFoodBestSeller(state) {
    const product = state.allSaleOrder
      .filter((s) => s.orderQuant > 0 && s.orderCategory === 'Food')
      .sort((a, b) => b.orderQuant - a.orderQuant)
      .reduce((p, c) => {
        const index = p.findIndex((o) => o.orderName == c.orderName);
        if (index >= 0) {
          p.splice(index, 1, {
            orderName: c.orderName,
            orderQuant: p[index].orderQuant + c.orderQuant,
          });
        } else {
          p.push({
            orderName: c.orderName,
            orderQuant: c.orderQuant,
          });
        }
        return p;
      }, [] as { orderName: string; orderQuant: number }[]);
    return product;
  },
  getDailyFoodBestSeller(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY-MM-DD');
    const product = state.allSaleOrder
      .filter(
        (s) =>
          s.invoice?.sales_order_created.match(currentMonth) &&
          s.orderCategory === 'Food'
      )
      .sort((a, b) => b.orderQuant - a.orderQuant)
      .reduce((p, c) => {
        const index = p.findIndex((o) => o.orderName == c.orderName);
        if (index >= 0) {
          p.splice(index, 1, {
            orderName: c.orderName,
            orderQuant: p[index].orderQuant + c.orderQuant,
          });
        } else {
          p.push({
            orderName: c.orderName,
            orderQuant: c.orderQuant,
          });
        }
        return p;
      }, [] as { orderName: string; orderQuant: number }[]);
    return product;
  },
  getMonthlyFoodBestSeller(state) {
    const dateNow = new Date();
    const currentMonth = date.formatDate(dateNow, 'YYYY-MM');
    const product = state.allSaleOrder
      .filter(
        (s) =>
          s.invoice?.sales_order_created.match(currentMonth) &&
          s.orderCategory === 'Food'
      )
      .sort((a, b) => b.orderQuant - a.orderQuant)
      .reduce((p, c) => {
        const index = p.findIndex((o) => o.orderName == c.orderName);
        if (index >= 0) {
          p.splice(index, 1, {
            orderName: c.orderName,
            orderQuant: p[index].orderQuant + c.orderQuant,
          });
        } else {
          p.push({
            orderName: c.orderName,
            orderQuant: c.orderQuant,
          });
        }
        return p;
      }, [] as { orderName: string; orderQuant: number }[]);
    return product;
  },
};

export default getters;
