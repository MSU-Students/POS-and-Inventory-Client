<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="bg-teal-4">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-avatar>
          <img src="../assets/BesTea.jpg" />
        </q-avatar>
        <q-toolbar-title>BesTea Restaurant</q-toolbar-title>
        <q-btn-dropdown
          elevated
          flat
          dropdown-icon="account_circle"
          :label="currentUser.FName + ' ' + currentUser.LName"
          size="18px"
        >
          <div class="bg-teal-1 row no-wrap q-px-xl q-py-lg">
            <div class="column items-center">
              <q-avatar size="80px">
                <q-img src="../assets/pngwing.com.png" />
              </q-avatar>

              <div
                class="text-weight-bold text-h6 q-pb-md"
                style="text-align: center"
              >
                {{ currentUser.FName }}
                {{ currentUser.LName }}
              </div>

              <q-list>
                <q-item clickable v-ripple to="/manageaccount">
                  <q-item-section avatar>
                    <q-avatar
                      icon="settings"
                      color="positive"
                      text-color="white"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Manage Account</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable to="/changepassword">
                  <q-item-section avatar>
                    <q-avatar
                      icon="manage_accounts"
                      color="warning"
                      text-color="white"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Change Password</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable @click="logout()">
                  <q-item-section avatar>
                    <q-avatar
                      icon="logout"
                      color="negative"
                      text-color="white"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Logout</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
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
      class="bg-grey-1"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item clickable active-class="text-teal" v-ripple to="/Dashboard">
            <q-item-section avatar>
              <q-icon name="dashboard" color="teal-3" />
            </q-item-section>
            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <q-expansion-item>
            <template v-slot:header>
              <q-item-section avatar>
                <q-icon name="shopping_cart" color="teal-3" />
              </q-item-section>
              <q-item-section> Sale </q-item-section>
            </template>
            <q-card>
              <q-card-section>
                <q-item clickable active-class="text-teal" v-ripple to="/POS">
                  <q-item-section> POS </q-item-section>
                </q-item>
                <q-item
                  active-class="text-teal"
                  clickable
                  v-ripple
                  to="/ManageSale"
                >
                  <q-item-section> Manage Product </q-item-section>
                </q-item>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-item clickable active-class="text-teal" v-ripple to="/Inventory">
            <q-item-section avatar>
              <q-icon name="inventory_2" color="teal-3" />
            </q-item-section>

            <q-item-section> Inventory </q-item-section>
          </q-item>

          <q-item clickable active-class="text-teal" v-ripple to="/Supplier">
            <q-item-section avatar>
              <q-icon name="local_shipping" color="teal-3" />
            </q-item-section>

            <q-item-section> Supplier </q-item-section>
          </q-item>

          <q-item clickable active-class="text-teal" v-ripple to="/Purchase">
            <q-item-section avatar>
              <q-icon name="checklist" color="teal-3" />
            </q-item-section>

            <q-item-section> Purchase </q-item-section>
          </q-item>
          <q-item clickable active-class="text-teal" v-ripple to="/Expenses">
            <q-item-section avatar>
              <q-icon name="payments" color="teal-3" />
            </q-item-section>

            <q-item-section> Expenses </q-item-section>
          </q-item>

          <q-expansion-item>
            <template v-slot:header>
              <q-item-section avatar>
                <q-icon name="analytics" color="teal-3" />
              </q-item-section>
              <q-item-section> Reports </q-item-section>
            </template>
            <q-card>
              <q-card-section>
                <q-item
                  clickable
                  active-class="text-teal"
                  v-ripple
                  to="/SalesReport"
                >
                  <q-item-section> Sales Report </q-item-section>
                </q-item>
                <q-item
                  clickable
                  active-class="text-teal"
                  v-ripple
                  to="/StockReport"
                >
                  <q-item-section> Stock Report </q-item-section>
                </q-item>
                <q-item
                  clickable
                  active-class="text-teal"
                  v-ripple
                  to="/PurchaseReport"
                >
                  <q-item-section> Purchase Report </q-item-section>
                </q-item>
                <q-item
                  clickable
                  active-class="text-teal"
                  v-ripple
                  to="/ExpenseReport"
                >
                  <q-item-section> Expense Report </q-item-section>
                </q-item>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-item
            clickable
            active-class="text-teal"
            v-ripple
            to="/manageaccount"
          >
            <q-item-section avatar>
              <q-icon name="settings" color="teal-3" />
            </q-item-section>

            <q-item-section> Manage Account </q-item-section>
          </q-item>

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
import { AUser } from 'src/store/auth/state';
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapState } from 'vuex';

@Options({
  methods: {
    ...mapActions('auth', ['authUser']),
  },
  computed: {
    ...mapState('auth', ['currentUser']),
  },
})
export default class MainLayout extends Vue {
  getProfile!: () => Promise<void>;
  authUser!: () => Promise<void>;
  currentUser!: AUser;
  drawer = false;
  miniState = true;

  async mounted() {
    await this.authUser();
    window.postMessage('posprint', '*');
  }

  async logout() {
    try {
      const result = await posApiService.logoutUser();
      if (result.status == 201) {
        await this.$router.replace('/');
      }
      this.$q.notify({
        type: 'warning',
        message: 'You have been logged out!',
      });
    } catch (error) {
      this.$q.notify({
        type: 'negative',
        message: 'Something went wrong',
      });
    }
  }
}
</script>
<style>
.header_bg {
  background-image: linear-gradient(
    to right,
    rgb(21, 164, 21),
    rgb(22, 194, 22)
  );
}
</style>
