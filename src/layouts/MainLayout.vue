<template>
  <div class="q-pa-md">
    <q-layout view="hHh lpR lFf">
      <q-header elevated class="bg-primary">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>BesTea Restaurant</q-toolbar-title>
          <q-btn-dropdown flat dropdown-icon="account_circle">
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-avatar size="90px" icon="person"> </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">Basam Serad</div>

                <q-btn
                  class="q-ma-xs"
                  color="primary"
                  label="Manage"
                  push
                  size="md"
                  to="/Account"
                  v-close-popup
                />

                <q-btn
                  color="primary"
                  label="Logout"
                  push
                  size="md"
                  to=""
                  v-close-popup
                />
              </div>
            </div>
          </q-btn-dropdown>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        :width="200"
        :breakpoint="500"
        bordered
        content-class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list padding>
            <q-item clickable v-ripple to="/Dashboard">
              <q-item-section avatar>
                <q-icon name="dashboard" />
              </q-item-section>

              <q-item-section> Dashboard </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/POS">
              <q-item-section avatar>
                <q-icon name="point_of_sale" />
              </q-item-section>

              <q-item-section> POS </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/SalesReport">
              <q-item-section avatar>
                <q-icon name="analytics" />
              </q-item-section>

              <q-item-section> Sales Report </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Inventory">
              <q-item-section avatar>
                <q-icon name="inventory_2" />
              </q-item-section>

              <q-item-section> Inventory </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Supplier">
              <q-item-section avatar>
                <q-icon name="local_shipping" />
              </q-item-section>

              <q-item-section> Supplier </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Purchase">
              <q-item-section avatar>
                <q-icon name="checklist" />
              </q-item-section>

              <q-item-section> Purchase </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Expenses">
              <q-item-section avatar>
                <q-icon name="payments" />
              </q-item-section>

              <q-item-section> Expenses </q-item-section>
            </q-item>

            <q-separator />

            <q-item clickable v-ripple to="/">
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>

              <q-item-section> Logout </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <router-view></router-view>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';
@Options({})
export default class MainLayout extends Vue {
  drawer = false;
  miniState = true;
}
</script>
