<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '90%' } : { width: '20%' }"
        >
          <q-card-section>
            <q-avatar size="125px" class="absolute-center shadow-10">
              <img src="../assets/BesTea.jpg" />
            </q-avatar> </q-card-section
          ><br />
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-bold text-h5 ellipsis">BesTea</div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input v-model="username" label="Username">
                <template v-slot:prepend>
                  <q-icon name="people" />
                </template>
              </q-input>

              <q-input type="password" v-model="password" label="Password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>

              <div>
                <q-btn
                  class="full-width"
                  label="Login"
                  color="red-6"
                  size="lg"
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
import { Vue } from 'vue-class-component';

export default class Login extends Vue {
  username = '';
  password = '';

  async loginUser() {
    if (this.username == 'Admin' && this.password == 'Admin') {
      await this.$router.replace('/Dashboard');
    } else {
      this.username = '';
      this.password = '';
      alert('Wrong Username and Password!!');
    }
  }
}
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #5de974 0%, #fdee62 100%);
}
</style>
