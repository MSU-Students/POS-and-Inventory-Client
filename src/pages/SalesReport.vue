<template>
  <q-page>
    <q-card class="q-mt-sm">
      <q-card-section class="text-h6 q-pb-none">
        <q-item>
          <q-item-section avatar class="">
            <q-icon color="blue" name="fas fa-chart-line" size="44px"/>
          </q-item-section>

          <q-item-section>
            <div class="text-h6">Product Sales Stats</div>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class="row">
        <div class="col-lg-7 col-sm-12 col-xs-12 col-md-7">
          <div class="row">
            <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar color="blue" text-color="white" icon="bluetooth"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-blue text-bold">4321</q-item-label>
                  <q-item-label caption>Fashions</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar color="grey-8" text-color="white" icon="bluetooth"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-grey-8 text-bold">9876</q-item-label>
                  <q-item-label caption>Electronics</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar color="green-6" text-color="white" icon="bluetooth"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-green-6 text-bold">345</q-item-label>
                  <q-item-label caption>Toys</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar color="orange-8" text-color="white" icon="bluetooth"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-orange-8 text-bold">1021</q-item-label>
                  <q-item-label caption>Vouchers</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </div>
          <div>
           <YearlyChart/>
          </div>
        </div>
        <div class="col-lg-5 col-sm-12 col-xs-12 col-md-5">
          <q-item>
            <q-item-section avatar class="">
              <q-icon color="blue" name="fas fa-gift" class="q-pl-md" size="24px"/>
            </q-item-section>

            <q-item-section>
              <div class="text-h6">TODAY SALES</div>
            </q-item-section>
          </q-item>
          <div>
             <MonthCashFlowChart />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import Chart from 'components/chart.component.vue';
import YearlyChart from 'components/Charts/DashYearly.vue';
import CashFlowChart from 'components/Charts/DashSalePurchase.vue';
import MonthCashFlowChart from 'components/Charts/DashMonthlyCashFlow.vue';
@Options({
  components: { YearlyChart, CashFlowChart, MonthCashFlowChart },
})
export default class ChartComponent extends Vue {}
</script>
<style lang="sass" scoped>
.my-card
  position: relative
  margin: auto
  height: 80vh
  width: 80vw
</style>
