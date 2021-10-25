<template>
  <div class="q-pa-md">
    <div class="row q-gutter-lg">
      <div class="col">
        <q-card align="center">
          <q-card-section>
            <q-icon
              name="signal_cellular_alt"
              color="deep-purple"
              style="font-size: 3rem"
            >
            </q-icon>
            <div class="text-h5 text-deep-purple q-pb-md">Revenue</div>
            <div class="text-h5">10000.000</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card align="center">
          <q-card-section>
            <q-icon name="shopping_cart" color="amber" style="font-size: 3rem">
            </q-icon>
            <div class="text-h5 text-amber q-pb-md">Purchase</div>
            <div class="text-h5">10000.000</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card align="center">
          <q-card-section>
            <q-icon name="shopping_bag" color="teal" style="font-size: 3rem">
            </q-icon>
            <div class="text-h5 text-teal q-pb-md">Expenses</div>
            <div class="text-h5">10000.000</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card align="center">
          <q-card-section>
            <q-icon name="paid" color="cyan" style="font-size: 3rem"> </q-icon>
            <div class="text-h5 text-cyan q-pb-md">Profit</div>
            <div class="text-h5">10000.000</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';
@Options({})
export default class Dashboard extends Vue {}
</script>
