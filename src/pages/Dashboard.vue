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
                {{ allInventory.length }}
              </q-item-section>
            </q-item>
            <q-separator inset />
            <q-item>
              <q-item-section>Total Available Stock</q-item-section>
              <q-item-section class="text-h6 text-bold" side>
                {{ availableInventory.length }}
              </q-item-section>
            </q-item>
            <q-separator inset />
            <q-item>
              <q-item-section>Total Used Stock</q-item-section>
              <q-item-section class="text-h6 text-bold" side>
                {{ usedInventory.length }}
              </q-item-section>
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
                      {{ allPurchase.length }}
                    </q-item-section>
                  </q-item>
                  <q-separator inset />
                  <q-item>
                    <q-item-section>Total Cost</q-item-section>
                    <q-item-section class="text-h6 text-bold" side>
                      10
                    </q-item-section>
                  </q-item>
                  <q-separator inset />
                  <q-item>
                    <q-item-section>Completed/Recieved</q-item-section>
                    <q-item-section class="text-h6 text-bold" side>
                      {{ completePurchase.length }}
                    </q-item-section>
                  </q-item>
                </div>
                <div class="col">
                  <q-item>
                    <q-item-section>Pending</q-item-section>
                    <q-item-section class="text-h6 text-bold" side>
                      {{ pendingPurchase.length }}
                    </q-item-section>
                  </q-item>
                  <q-separator inset />
                  <q-item>
                    <q-item-section>Cancel</q-item-section>
                    <q-item-section class="text-h6 text-bold" side>
                      {{ cancelPurchase.length }}
                    </q-item-section>
                  </q-item>
                  <q-separator inset />
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
import { mapGetters, mapState } from 'vuex';
import { InventoryDto, PurchaseDto } from 'src/services/rest-api';

@Options({
  components: { YearlyChart, CashFlowChart, MonthCashFlowChart },
  computed: {
    ...mapGetters('inventory', ['usedInventory', 'availableInventory']),
    ...mapState('inventory', ['allInventory']),
    ...mapGetters('purchase', [
      'completePurchase',
      'cancelPurchase',
      'pendingPurchase',
    ]),
    ...mapState('purchase', ['allPurchase']),
  },
})
export default class Dashboard extends Vue {
  usedInventory!: InventoryDto[];
  allInventory!: InventoryDto[];
  availableInventory!: InventoryDto[];
  allPurchase!: PurchaseDto[];
  completePurchase!: PurchaseDto[];
  cancelPurchase!: PurchaseDto[];
  pendingPurchase!: PurchaseDto[];
}
</script>
