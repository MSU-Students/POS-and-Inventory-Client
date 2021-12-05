import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',

    component: () => import('pages/Login.vue'),
  },
  {
    path: '/POS',

    component: () => import('pages/POS.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'Dashboard', component: () => import('src/pages/Dashboard.vue') },
      {
        path: 'account',
        component: () => import('src/pages/ManageAccount.vue'),
      },
      {
        path: 'Expenses',
        component: () => import('pages/Expenses.vue'),
      },
      {
        path: 'Category',
        component: () => import('src/pages/Category.vue'),
      },
      {
        path: 'Inventory',
        component: () => import('pages/Inventory.vue'),
      },
      {
        path: 'ManageSale',
        component: () => import('pages/ManageSale.vue'),
      },
      {
        path: 'Product',
        component: () => import('pages/Product.vue'),
      },
      {
        path: 'Purchase',
        component: () => import('pages/Purchase.vue'),
      },
      {
        path: 'SalesReport',
        component: () => import('pages/SalesReport.vue'),
      },
      {
        path: 'Supplier',
        component: () => import('pages/Supplier.vue'),
      },
      {
        path: 'StockReport',
        component: () => import('pages/StockReport.vue'),
      },
      {
        path: 'PurchaseReport',
        component: () => import('pages/PurchaseReport.vue'),
      },
      {
        path: 'ExpenseReport',
        component: () => import('pages/ExpenseReport.vue'),
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
