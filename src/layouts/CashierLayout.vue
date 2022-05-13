<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="bg-green">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-avatar>
          <img src="../assets/BesTea.jpg" />
        </q-avatar>
        <q-toolbar-title>BesTea Restaurant</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above bordered content-class="bg-grey-3">
      <div class="absolute-top">
        <q-avatar size="56px" class="q-mb-sm">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
        <div class="text-weight-bold">Razvan Stoenescu</div>
        <div>@rstoenescu</div>
      </div>
      <q-scroll-area class="fit">
        <q-list padding>
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
