<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          class="shadow-20"
          v-bind:style="
            $q.screen.lt.md ? { weight: '20%' } : { height: '100%' }
          "
        >
          <q-card-section>
            <q-avatar size="125px" class="absolute-center shadow-10">
              <img src="../assets/BesTea.jpg" />
            </q-avatar> </q-card-section
          ><br />
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-bold text-h4 ellipsis">BesTea</div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form @submit="loginUser()" class="q-gutter-md">
              <q-input
                autofocus
                v-model="username"
                label="Username"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Input your Username',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="people" />
                </template>
              </q-input>

              <q-input
                v-model="password"
                label="Password"
                :type="isPwd ? 'password' : 'text'"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Input your password',
                ]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>

              <div>
                <q-btn
                  class="full-width"
                  label="Login"
                  color="red-6"
                  size="md"
                  type="submit"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { AUser } from 'src/store/auth/state';
import { mapActions, mapState } from 'vuex';

@Options({
  methods: {
    ...mapActions('auth', ['login', 'authUser']),
  },
  computed: {
    ...mapState('auth', ['currentUser']),
  },
})
export default class Login extends Vue {
  login!: (auth: { userName: string; password: string }) => Promise<AUser>;
  currentUser!: AUser;

  username = '';
  password = '';
  isPwd = true;

  async loginUser() {
    try {
      await this.login({
        userName: this.username,
        password: this.password,
      });
      if (this.currentUser.type == 'Admin') {
        await this.$router.replace('/Dashboard');
        this.$q.notify({
          position: 'center',
          type: 'positive',
          message: 'You are logged in',
        });
      }
      if (this.currentUser.type == 'Cashier') {
        await this.$router.replace('/landingPage');
        this.$q.notify({
          position: 'center',
          type: 'positive',
          message: 'You are logged in',
        });
      }
    } catch (error: any) {
      this.$q.notify({
        type: 'negative',
        message: 'Wrong Username or Password!',
      });
    }
  }
}
</script>

<style>
.bg-image {
  background-image: url('../assets/green.jpg');
  background-size: cover;
}
</style>
