<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 text-bold row">
      <q-icon name="stacked_bar_chart" color="orange" style="font-size: 4rem" />
      Sales Report
    </div>
    <q-card class="q-my-lg">
      <q-card-section class="text-h6 q-pb-none">
        <q-item>
          <q-item-section avatar class="">
            <q-icon color="blue" name="fas fa-chart-line" size="44px" />
          </q-item-section>

          <q-item-section>
            <div class="text-h6">Monthly Sales</div>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class="row">
        <div class="col-lg-7 col-sm-12 col-xs-12 col-md-7">
          <div class="row">
            <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar
                    color="grey-8"
                    text-color="white"
                    icon="lunch_dining"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-grey-8 text-bold"
                    >9876</q-item-label
                  >
                  <q-item-label caption>Foods</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar
                    color="green-6"
                    text-color="white"
                    icon="local_drink"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-green-6 text-bold"
                    >345</q-item-label
                  >
                  <q-item-label caption>Beverage/Drinks</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-lg-3 col-md-3 col-xs-6 col-sm-6">
              <q-item>
                <q-item-section top avatar>
                  <q-avatar
                    color="orange-8"
                    text-color="white"
                    icon=" exposure_plus_1"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-orange-8 text-bold"
                    >1021</q-item-label
                  >
                  <q-item-label caption>Add-ons</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </div>
          <div>
            <monthlyProductSales />
          </div>
        </div>
        <div class="col-lg-5 col-sm-12 col-xs-12 col-md-5">
          <q-item>
            <q-item-section avatar class="">
              <q-icon
                color="blue"
                name="fas fa-gift"
                class="q-pl-md"
                size="24px"
              />
            </q-item-section>

            <q-item-section>
              <div class="text-h6">TODAY SALES</div>
            </q-item-section>
          </q-item>
          <div>
            <MonthCashFlowChart/>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="q-py-lg">
      <q-card-section>
        <q-item-section>
          <div class="text-h6">Yearly Sales</div>
        </q-item-section>
      </q-card-section>
      <div>
        <YearlySaleReport/>
      </div>
    </q-card>
     <q-card class="q-py-md">
        <q-card-section>
          <q-item-section>
            <div class="text-h6">Best Seller</div>
          </q-item-section>
        </q-card-section>
        <div>
          <BestSeller/>
        </div>
    </q-card>
  </q-page>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import monthlyProductSales from 'components/Charts/monthlyProductSales.vue';
import CashFlowChart from 'components/Charts/DashSalePurchase.vue';
import MonthCashFlowChart from 'components/Charts/DashMonthlyCashFlow.vue';
import YearlySaleReport from 'components/Charts/YearlySaleReport.vue';
import BestSeller from 'components/Charts/BestSellerChart.vue';
@Options({
  components: {
    monthlyProductSales,
    CashFlowChart,
    MonthCashFlowChart,
    YearlySaleReport,
    BestSeller,
  },
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
