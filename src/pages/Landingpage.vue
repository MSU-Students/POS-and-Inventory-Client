<template>
  <q-page class="flex bg-image flex-center">
    <div class="absolute-center column">
      <div class="row flex flex-center q-pa-lg">
        <div class="col">
          <q-btn
            size="lg"
            color="green-5"
            rounded
            to="/cashierpos"
            padding="5.5rem"
            class="q-mx-xl"
            stack
          >
            <q-icon name="point_of_sale" size="5rem"></q-icon>
            <span> POS </span>
          </q-btn>
        </div>
        <div class="col">
          <q-btn
            size="lg"
            color="red-5"
            rounded
            @click="logout()"
            padding="5rem"
            class="q-mx-xl"
            stack
          >
            <q-icon name="logout" size="6rem"></q-icon>
            <span> Log-out </span>
          </q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script lang="ts">
import { posApiService } from 'src/services/pos-inventory-api.service';
import { Vue } from 'vue-class-component';
export default class landingPage extends Vue {
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
.bg-image {
  background-image: url('../assets/green.jpg');
  background-size: cover;
}
</style>
