<template>
  <q-page class="q-pa-xl">
    <div class="row q-gutter-xl">
      <div class="col">
        <q-card align="center">
          <q-card-section>
            <q-icon
              name="signal_cellular_alt"
              color="deep-purple"
              style="font-size: 2rem"
            >
            </q-icon>
            <div class="text-h6 text-deep-purple q-pb-md">Revenue</div>
            <div class="text-h6">10000.000</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card align="center">
          <q-card-section>
            <q-icon name="shopping_cart" color="amber" style="font-size: 2rem">
            </q-icon>
            <div class="text-h6 text-amber q-pb-md">Purchase</div>
            <div class="text-h6">10000.000</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card align="center">
          <q-card-section>
            <q-icon name="shopping_bag" color="teal" style="font-size: 2rem">
            </q-icon>
            <div class="text-h6 text-teal q-pb-md">Expenses</div>
            <div class="text-h6">10000.000</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card align="center">
          <q-card-section>
            <q-icon name="paid" color="cyan" style="font-size: 2rem"> </q-icon>
            <div class="text-h6 text-cyan q-pb-md">Profit</div>
            <div class="text-h6">10000.000</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-gutter-lg">
      <div class="q-pt-lg col" style="max-width: 415px">
        <q-card>
          <q-item>
            <q-item-section>
              <q-item-label class="text-h6"> Users </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-list>
            <div class="row q-gutter-md q-pa-md flex flex-center">
              <q-card>
                <q-item class="col">
                  <q-item-section avatar>
                    <q-icon
                      color="primary"
                      name="groups"
                      style="font-size: 5rem"
                    />
                    <q-item-label>Daily Customer</q-item-label>
                  </q-item-section>
                  <q-item-section class="text-h6 text-bold" side-left>
                    240
                  </q-item-section>
                </q-item>
              </q-card>
              <q-card>
                <div class="col">
                  <q-item class="col">
                    <q-item-section avatar>
                      <q-icon
                        color="primary"
                        name="groups"
                        style="font-size: 5rem"
                      />
                      <q-item-label>Total Supplier</q-item-label>
                    </q-item-section>
                    <q-item-section class="text-h6 text-bold" side-left>
                      240
                    </q-item-section>
                  </q-item>
                </div></q-card
              >
            </div>
          </q-list>
        </q-card>
      </div>
      <div class="q-pt-lg col">
        <q-card>
          <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-h6"> Invetory Details </q-item-label>
                </q-item-section>
              </q-item>
            <q-separator />
            <q-item>
              <q-item-section>Total Stock Item</q-item-section>
              <q-item-section class="text-h6 text-bold" side>
                245
              </q-item-section>
            </q-item>
            <q-separator inset />
            <q-item>
              <q-item-section>Low Stock Item</q-item-section>
              <q-item-section class="text-h6 text-bold" side>10</q-item-section>
            </q-item>
            <q-separator inset />
            <q-item>
              <q-item-section>Stock category</q-item-section>
              <q-item-section class="text-h6 text-bold" side>10</q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
      <div class="q-pt-lg col">
        <q-card>
          <q-card>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-h6">
                    Purchase Details
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <div class="row">
                <div class="col">
                  <q-item>
                    <q-item-section>No. of Purchase</q-item-section>
                    <q-item-section class="text-h6 text-bold" side>
                      245
                    </q-item-section>
                  </q-item>
                  <q-separator inset />
                  <q-item>
                    <q-item-section>Cost</q-item-section>
                    <q-item-section class="text-h6 text-bold" side>
                      10
                    </q-item-section>
                  </q-item>
                  <q-separator inset />
                  <q-item>
                    <q-item-section>Recieved</q-item-section>
                    <q-item-section class="text-h6 text-bold" side>
                      10
                    </q-item-section>
                  </q-item>
                </div>
                <div class="col">
                  <q-item>
                    <q-item-section>Pending</q-item-section>
                    <q-item-section class="text-h6 text-bold" side>
                      2
                    </q-item-section>
                  </q-item>
                  <q-separator inset />
                  <q-item>
                    <q-item-section>Cancel</q-item-section>
                    <q-item-section class="text-h6 text-bold" side>
                      10
                    </q-item-section>
                  </q-item>
                  <q-separator inset />
                  <q-item>
                    <q-item-section>Return</q-item-section>
                    <q-item-section class="text-h6 text-bold" side>
                      10
                    </q-item-section>
                  </q-item>
                </div>
              </div>
            </q-list>
          </q-card>
        </q-card>
      </div>
    </div>
    <div class="row q-gutter-md q-py-lg">
      <div class="col">
        <q-card class="q-pa-lg">
          <div class="text-h5">Cash Flow</div>
          <div><CashFlowChart /></div>
        </q-card>
      </div>
      <div class="col">
        <q-card class="q-pa-lg">
          <div class="text-h5">November 2021</div>
          <div><MonthCashFlowChart /></div>
        </q-card>
      </div>
    </div>

    <div class="q-py-lg">
      <q-card>
        <q-card-section class="q-pa-lg">
          <div class="text-h5">Yearly Report</div>
          <div><YearlyChart /></div
        ></q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import YearlyChart from 'components/Charts/DashYearly.vue';
import CashFlowChart from 'components/Charts/DashSalePurchase.vue';
import MonthCashFlowChart from 'components/Charts/DashMonthlyCashFlow.vue';

@Options({
  components: { YearlyChart, CashFlowChart, MonthCashFlowChart },
})
export default class Dashboard extends Vue {}
</script>
>
