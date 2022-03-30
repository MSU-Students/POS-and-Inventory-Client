import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    meta: { requiresGuest: true },
    component: () => import('pages/Login.vue'),
    // meta: {
    //   dapatWalangUser: true,
    // },
  },
  {
    path: '/POS',
    meta: { requiresAdmin: true },
    component: () => import('../pages/POS/POS.vue'),
  },
  {
    path: '/',
    name: 'admin',
    meta: { requiresAdmin: true },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'Dashboard',
        component: () => import('../pages/Dashboard.vue'),
      },
      {
        path: 'account',
        component: () => import('../pages/ManageAccount.vue'),
      },
      {
        path: 'Expenses',
        component: () => import('pages/Expenses.vue'),
      },
      {
        path: 'Category',
        component: () => import('../pages/Category.vue'),
      },
      {
        path: 'Inventory',
        component: () => import('../pages/Inventory/Inventory.vue'),
      },
      {
        path: 'ManageSale',
        component: () => import('../pages/POS/ManageSale.vue'),
      },
      {
        path: 'Purchase',
        component: () => import('src/pages/Inventory/Purchase.vue'),
      },
      {
        path: 'SalesReport',
        component: () => import('../pages/Reports/SalesReport.vue'),
      },
      {
        path: 'Supplier',
        component: () => import('../pages/Inventory/Supplier.vue'),
      },
      {
        path: 'StockReport',
        component: () => import('../pages/Reports/StockReport.vue'),
      },
      {
        path: 'PurchaseReport',
        component: () => import('../pages/Reports/PurchaseReport.vue'),
      },
      {
        path: 'ExpenseReport',
        component: () => import('../pages/Reports/ExpensesReport.vue'),
      },
    ],
  },
  {
    path: '/cashier',
    name: 'cashier',
    component: () => import('layouts/CashierLayout.vue'),
    children: [
      {
        path: '/cashierpos',
        component: () => import('../pages/Cashier/POS.vue'),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
