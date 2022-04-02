<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 text-bold row">Sales Report</div>
    <div class="q-py-lg">
      <q-table
        title="Sales Record"
        :rows="allOrder"
        :columns="column"
        row-key="subCategoryID"
        :rows-per-page-options="[0]"
        :filter="saleFilter"
      >
        <template v-slot:top-right>
          <div class="q-pa-md" style="max-width: 300px">
            <q-input
              outlined
              v-model="saleFilter"
              mask="date"
              :rules="['date']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="saleFilter">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </template>
      </q-table>
    </div>
    <q-card class="q-py-md">
      <q-card-section>
        <q-item-section>
          <div class="text-center text-h6">Best Seller</div>
        </q-item-section>
      </q-card-section>
      <q-tabs
        v-model="tab"
        dense
        class="text-teal"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab icon="dinner_dining" name="Food" label="Food" />
        <q-tab
          icon="local_drink"
          name="Drink/Beverages"
          label="Drink/Beverages"
        />
        <q-tab icon="add_box" name="Add-ons" label="Add-ons" />
      </q-tabs>
      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="Food">
          <div class="text-h6">Best Seller in food</div>
          <BestSellerFood />
        </q-tab-panel>

        <q-tab-panel name="Drink/Beverages">
          <div class="text-h6">Best Seller in Drinks/Beverages</div>
          <BestSellerChartDrinks />
        </q-tab-panel>

        <q-tab-panel name="Add-ons">
          <div class="text-h6">Best Seller in Add-ons</div>
          <BestSellerChartAddons />
        </q-tab-panel>
      </q-tab-panels>
      <div class="q-pa-lg"></div>
    </q-card>
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
            <MonthCashFlowChart />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="q-my-lg">
      <q-card-section>
        <q-item-section>
          <div class="text-h6">Yearly Sales</div>
        </q-item-section>
      </q-card-section>
      <div class="q-pa-lg">
        <YearlySaleReport />
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
import BestSellerFood from 'src/components/Charts/BestSellerChartFood.vue';
import BestSellerChartDrinks from 'src/components/Charts/BestSellerChartDrinks.vue';
import BestSellerChartAddons from 'src/components/Charts/BestSellerChartAddons.vue';
import { mapState } from 'vuex';
import { IOrderInfo } from '../../store/Order/state';
@Options({
  components: {
    monthlyProductSales,
    CashFlowChart,
    MonthCashFlowChart,
    YearlySaleReport,
    BestSellerFood,
    BestSellerChartDrinks,
    BestSellerChartAddons,
  },
  computed: {
    ...mapState('Order', ['allOrder']),
  },
})
export default class ChartComponent extends Vue {
  allOrder!: IOrderInfo[];
  tab = 'Food';
  saleFilter = '';

  column = [
    {
      name: 'prodName',
      required: true,
      label: 'Product',
      align: 'left',
      field: (row: IOrderInfo) => row.prodName,
      format: (val: string) => `${val}`,
    },
    {
      name: 'orderDate',
      align: 'center',
      label: 'Date Order',
      field: 'orderDate',
      sortable: true,
    },
    {
      name: 'prodQuant',
      align: 'center',
      label: 'Product Quantity',
      field: 'prodQuant',
    },
    {
      name: 'price',
      align: 'center',
      label: 'Price',
      field: 'price',
    },
    {
      name: 'subTotal',
      align: 'center',
      label: 'Total',
      field: 'subTotal',
    },
  ];
}
</script>
<style lang="sass" scoped>
.my-card
  position: relative
  margin: auto
  height: 80vh
  width: 80vw
</style>
