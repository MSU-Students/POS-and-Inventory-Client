import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { SaleOrderStateInterface } from './state';

const getters: GetterTree<SaleOrderStateInterface, StateInterface> = {
  getBestSeller(state) {
    const product = state.allSaleOrder
      .filter((s) => s.orderCategory === 'Food')
      .sort((a, b) => a.orderQuant - b.orderQuant);
    return product.concat();
  },
  getMilkteaTotal(state) {
    const result = state.allSaleOrder
      .filter((s) => s.orderName === 'Red Velvet')
      .reduce<number>((accumulator, current) => {
        return accumulator + current.orderQuant;
      }, 0);
    return result;
  },

  getFruiteaTotal(state) {
    const result = state.allSaleOrder
      .filter((s) => s.orderSubCategory === 'Fruit Teas')
      .reduce<number>((accumulator, current) => {
        return accumulator + current.orderQuant;
      }, 0);
    return result;
  },
  getYogurtTotal(state) {
    const result = state.allSaleOrder
      .filter((s) => s.orderSubCategory === 'Yogurt Teas')
      .reduce<number>((accumulator, current) => {
        return accumulator + current.orderQuant;
      }, 0);
    return result;
  },
  getIceBlendedTotal(state) {
    const result = state.allSaleOrder
      .filter((s) => s.orderSubCategory === 'Ice Blended Drinks')
      .reduce<number>((accumulator, current) => {
        return accumulator + current.orderQuant;
      }, 0);
    return result;
  },
  getSaltCreamTotal(state) {
    const result = state.allSaleOrder
      .filter((s) => s.orderSubCategory === 'Salted Cream Series')
      .reduce<number>((accumulator, current) => {
        return accumulator + current.orderQuant;
      }, 0);
    return result;
  },
  getIcedCoffeeTotal(state) {
    const result = state.allSaleOrder
      .filter((s) => s.orderSubCategory === 'Iced Coffees')
      .reduce<number>((accumulator, current) => {
        return accumulator + current.orderQuant;
      }, 0);
    return result;
  },
  getCreamcheeseTotal(state) {
    const result = state.allSaleOrder
      .filter((s) => s.orderSubCategory === 'Creamcheese Series')
      .reduce<number>((accumulator, current) => {
        return accumulator + current.orderQuant;
      }, 0);
    return result;
  },

  getIceBlendedCoffeeTotal(state) {
    const result = state.allSaleOrder
      .filter((s) => s.orderSubCategory === 'Ice Blended Coffees')
      .reduce<number>((accumulator, current) => {
        return accumulator + current.orderQuant;
      }, 0);
    return result;
  },
  getOthersTotal(state) {
    const result = state.allSaleOrder
      .filter((s) => s.orderSubCategory === 'Other Drinks')
      .reduce<number>((accumulator, current) => {
        return accumulator + current.orderQuant;
      }, 0);
    return result;
  },
  getMealsTotal(state) {
    const result = state.allSaleOrder
      .filter((s) => s.orderName === 'Meals')
      .reduce<number>((accumulator, current) => {
        return accumulator + current.orderQuant;
      }, 0);
    return result;
  },
  getRiceToppingsTotal(state) {
    const result = state.allSaleOrder
      .filter((s) => s.orderName === 'Rice Toppings')
      .reduce<number>((accumulator, current) => {
        return accumulator + current.orderQuant;
      }, 0);
    return result;
  },
  getChickenWingsTotal(state) {
    const result = state.allSaleOrder
      .filter((s) => s.orderName === 'Chicken Wings')
      .reduce<number>((accumulator, current) => {
        return accumulator + current.orderQuant;
      }, 0);
    return result;
  },
  getSandwichesBurgerTotal(state) {
    const result = state.allSaleOrder
      .filter((s) => s.orderName === 'Sandwiches and Burgers')
      .reduce<number>((accumulator, current) => {
        return accumulator + current.orderQuant;
      }, 0);
    return result;
  },
  getAllTimeFavoriteTotal(state) {
    const result = state.allSaleOrder
      .filter((s) => s.orderName === 'All-Time Favorites')
      .reduce<number>((accumulator, current) => {
        return accumulator + current.orderQuant;
      }, 0);
    return result;
  },
};

export default getters;
