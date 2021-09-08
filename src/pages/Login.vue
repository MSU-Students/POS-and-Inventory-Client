<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          class="shadow-20"
          v-bind:style="$q.screen.lt.md ? { width: '90%' } : { width: '20%' }"
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
            <q-form class="q-gutter-md">
              <q-input
                v-model="username"
                label="Username"
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
                  @click="loginUser()"
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
@Options({})
export default class Login extends Vue {
  username = '';
  password = '';
  isPwd = true;

  async loginUser() {
    if (
      (this.username == 'Admin' && this.password == 'Admin') ||
      (this.username == 'Zukhri' && this.password == 'Zukhri')
    ) {
      await this.$router.replace('/Dashboard');
      this.$q.notify('You are logged in');
    } else {
      this.username = '';
      this.password = '';
      this.$q.notify('Wrong Username and Password!!');
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
