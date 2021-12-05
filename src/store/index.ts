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

import managePOS from './managePOS';
import { ManagePOSStateInterface } from './managePOS/state';

import purchase from './purchase';
import { PurchaseStateInterface } from './purchase/state';

import supplier from './supplier';
import { SupplierStateInterface } from './supplier/state';

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
  managePOS: ManagePOSStateInterface;
  purchase: PurchaseStateInterface;
  supply: SupplierStateInterface;
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
      managePOS,
      purchase,
      supplier,
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
