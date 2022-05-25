<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated class="bg-green">
      <q-toolbar>
        <q-avatar>
          <img src="../assets/BesTea.jpg" />
        </q-avatar>
        <q-toolbar-title>BesTea Restaurant</q-toolbar-title>
        <q-space />
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      bordered
      side="right"
      content-class="bg-grey-3"
      overlay
      elevated
    >
      <div class="q-pa-lg flex flex-center">
        <q-avatar size="10rem" class="q-mb-sm">
          <img src="../assets/BesTea.jpg" />
        </q-avatar>
      </div>

      <div class="q-pb-xl text-capitalize text-h6" align="center">
        {{ currentUser.FName }} {{ currentUser.MName }}
        {{ currentUser.LName }}
      </div>

      <div class="q-pa-md flex flex-center">
        <q-btn
          @click="logout()"
          size="md"
          color="green-5"
          rounded
          label="Change Password"
        ></q-btn>
      </div>
      <div class="q-pa-md flex flex-center">
        <q-btn
          @click="logout()"
          size="md"
          color="green-5"
          rounded
          label="Switch Account"
        ></q-btn>
      </div>
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
  authUser!: () => Promise<void>;
  currentUser!: AUser;
  drawer = true;

  async mounted() {
    await this.authUser();
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
