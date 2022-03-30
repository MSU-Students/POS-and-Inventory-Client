<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="bg-green">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-avatar>
          <img src="../assets/BesTea.jpg" />
        </q-avatar>
        <q-toolbar-title>BesTea Restaurant</q-toolbar-title>
        <q-btn-dropdown flat dropdown-icon="account_circle">
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md">Menu</div>
              <div class="q-pb-md">
                <q-btn
                  color="green"
                  label="Manage"
                  push
                  to="/Account"
                  v-close-popup
                />
              </div>

              <q-btn color="green" label="Logout" push to="/" v-close-popup />
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column q-py-md items-center">
              <q-avatar size="72px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs">Basam C. Serad</div>
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
              <q-icon name="dashboard" color="green-2" />
            </q-item-section>
            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <q-expansion-item>
            <template v-slot:header>
              <q-item-section avatar>
                <q-icon name="shopping_cart" color="green-2" />
              </q-item-section>
              <q-item-section> Sale </q-item-section>
            </template>
            <q-card>
              <q-card-section>
                <q-item clickable v-ripple to="/POS">
                  <q-item-section> POS </q-item-section>
                </q-item>
                <q-item clickable v-ripple to="/ManageSale">
                  <q-item-section> Manage Product </q-item-section>
                </q-item>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-item clickable v-ripple to="/Inventory">
            <q-item-section avatar>
              <q-icon name="inventory_2" color="green-2" />
            </q-item-section>

            <q-item-section> Inventory </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/Supplier">
            <q-item-section avatar>
              <q-icon name="local_shipping" color="green-2" />
            </q-item-section>

            <q-item-section> Supplier </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/Purchase">
            <q-item-section avatar>
              <q-icon name="checklist" color="green-2" />
            </q-item-section>

            <q-item-section> Purchase </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/Expenses">
            <q-item-section avatar>
              <q-icon name="payments" color="green-2" />
            </q-item-section>

            <q-item-section> Expenses </q-item-section>
          </q-item>

          <q-expansion-item>
            <template v-slot:header>
              <q-item-section avatar>
                <q-icon name="analytics" color="green-2" />
              </q-item-section>
              <q-item-section> Reports </q-item-section>
            </template>
            <q-card>
              <q-card-section>
                <q-item clickable v-ripple to="/SalesReport">
                  <q-item-section> Sales Report </q-item-section>
                </q-item>
                <q-item clickable v-ripple to="/StockReport">
                  <q-item-section> Stock Report </q-item-section>
                </q-item>
                <q-item clickable v-ripple to="/PurchaseReport">
                  <q-item-section> Purchase Report </q-item-section>
                </q-item>
                <q-item clickable v-ripple to="/ExpenseReport">
                  <q-item-section> Expense Report </q-item-section>
                </q-item>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator />

          <q-item clickable v-ripple @click="logout()">
            <q-item-section avatar>
              <q-icon name="logout" color="red" />
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
</template>
<script lang="ts">
import { posApiService } from 'src/services/pos-inventory-api.service';
import { Vue } from 'vue-class-component';
export default class MainLayout extends Vue {
  drawer = false;
  miniState = true;

  async logout() {
    const res = await posApiService.logoutUser();
    if (res.status == 201) {
      await this.$router.replace('/');
    }
  }
}
</script>
<style></style>
