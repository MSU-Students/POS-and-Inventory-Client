import { store } from 'quasar/wrappers';
import { InjectionKey } from 'vue';
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from 'vuex';

import account from './account';
import { AccountStateInterface } from './account/state';

import inventory from './inventory';
import { InventoryStateInterface } from './inventory/state';

import category from './category';
import { CategoryStateInterface } from './category/state';

import expenses from './expenses';
import { ExpensesStateInterface } from './expenses/state';

import manageProduct from './manageProduct';
import { ManageProductStateInterface } from './manageProduct/state';

import purchase from './purchase';
import { PurchaseStateInterface } from './purchase/state';

import supplier from './supplier';
import { SupplierStateInterface } from './supplier/state';

import Order from './Order';
import { OrderStateInterface } from './Order/state';

import subCategory from './subCategory';
import { SubCategoryStateInterface } from './subCategory/state';

import expensesCategory from './expensesCategory';
import { expensesCategoryStateInterface } from './expensesCategory/state';

import inventoryCategory from './inventoryCategory';
import { InventoryCatStateInterface } from './inventoryCategory/state';

import product from './product';
import { ProductStateInterface } from './product/state';

import auth from './auth';
import { IAuthState } from './auth/state';

import productCategory from './productCategory';
import { ProductCategoryStateInterface } from './productCategory/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  account: AccountStateInterface;
  inventory: InventoryStateInterface;
  category: CategoryStateInterface;
  expenses: ExpensesStateInterface;
  manageProduct: ManageProductStateInterface;
  purchase: PurchaseStateInterface;
  supply: SupplierStateInterface;
  Order: OrderStateInterface;
  subCategory: SubCategoryStateInterface;
  expensesCategory: expensesCategoryStateInterface;
  inventoryCategory: InventoryCatStateInterface;
  product: ProductStateInterface;
  auth: IAuthState;
  ProductCategory: ProductCategoryStateInterface;
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>;
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> =
  Symbol('vuex-key');

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: {
      // example
      account,
      inventory,
      category,
      expenses,
      manageProduct,
      purchase,
      supplier,
      Order,
      subCategory,
      expensesCategory,
      inventoryCategory,
      product,
      auth,
      productCategory,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING,
  });

  return Store;
});

export function useStore() {
  return vuexUseStore(storeKey);
}
