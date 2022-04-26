<template>
  <q-page class="flex bg-image flex-center">
    <div class="absolute-center column">
      <div class="col">
        <q-avatar size="300px" class="shadow-10">
          <img src="../assets/BesTea.jpg" />
        </q-avatar>
        <div class="col flex flex-center q-pa-lg">
          <q-btn label="Start" size="lg" color="green-5" rounded to="/Login" />
        </div>
      </div>
    </div>
  </q-page>
</template>
<script lang="ts">
import { Vue } from 'vue-class-component';
export default class landingPage extends Vue {}
</script>
<style>
.bg-image {
  background-image: url('../assets/landingPage.jpg');
  background-size: cover;
}
</style>
