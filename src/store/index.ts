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

import expenses from './expenses';
import { ExpensesStateInterface } from './expenses/state';

import manageProduct from './manageProduct';
import { ManageProductStateInterface } from './manageProduct/state';

import purchase from './purchase';
import { PurchaseStateInterface } from './purchase/state';

import supplier from './supplier';
import { SupplierStateInterface } from './supplier/state';

import cart from './cart';
import { CartStateInterface } from './cart/state';

import auth from './auth';
import { IAuthState } from './auth/state';

import media from './media-module';
import { MediaStateInterface } from './media-module/state';

import customer from './customer';
import { CustomertateInterface } from './customer/state';

import saleOrder from './saleOrderList';
import { SaleOrderStateInterface } from './saleOrderList/state';

import saleRecord from './saleRecord';
import { SaleRecordStateInterface } from './saleRecord/state';

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
  expenses: ExpensesStateInterface;
  manageProduct: ManageProductStateInterface;
  purchase: PurchaseStateInterface;
  supply: SupplierStateInterface;
  auth: IAuthState;
  cart: CartStateInterface;
  media: MediaStateInterface;
  customer: CustomertateInterface;
  saleOrder: SaleOrderStateInterface;
  saleRecord: SaleRecordStateInterface;
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
      expenses,
      manageProduct,
      purchase,
      supplier,
      auth,
      cart,
      media,
      customer,
      saleOrder,
      saleRecord,
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
