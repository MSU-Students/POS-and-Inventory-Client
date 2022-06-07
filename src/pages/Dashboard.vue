<template>
  <q-page class="q-pa-xl bg-grey-1">
    <div class="row q-gutter-xl">
      <div class="col">
        <q-card class="profit_bg text-white" align="center">
          <q-card-section>
            <q-item>
              <q-item-section avatar top>
                <q-icon name="paid" color="white" size="60px" />
              </q-item-section>
              <q-item-section top>
                <q-item-label>
                  <span class="text-h6">Today Profit </span>
                </q-item-label>
                <q-item-label class="text-weight-bolder">
                  <span> ₱ </span>
                  {{ getTodayProfit() }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card class="revenue_bg text-white" align="center">
          <q-card-section>
            <q-item>
              <q-item-section avatar top>
                <q-icon name="signal_cellular_alt" color="white" size="60px" />
              </q-item-section>
              <q-item-section top>
                <q-item-label>
                  <span class="text-h6">Today Revenue </span>
                </q-item-label>
                <q-item-label class="text-weight-bolder">
                  <span> ₱ </span>
                  {{ getDailySale }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card class="purhcase_bg text-white" align="center">
          <q-card-section>
            <q-item>
              <q-item-section avatar top>
                <q-icon name="shopping_cart" color="white" size="60px" />
              </q-item-section>
              <q-item-section top>
                <q-item-label>
                  <span class="text-h6">Today Purchase </span>
                </q-item-label>
                <q-item-label class="text-weight-bolder">
                  <span> ₱ </span>
                  {{ getDailyPurchase }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card class="expense_bg text-white" align="center">
          <q-card-section>
            <q-item>
              <q-item-section avatar top>
                <q-icon name="shopping_bag" color="white" size="60px" />
              </q-item-section>
              <q-item-section top>
                <q-item-label>
                  <span class="text-h6">Today Expenses </span>
                </q-item-label>
                <q-item-label class="text-weight-bolder">
                  <span> ₱ </span>
                  {{ getDailyExpenses }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="q-pt-md row q-gutter-xl q-pb-lg">
      <div class="q-pt-lg col">
        <q-card style="width: 750px; max-width: 80vw">
          <q-list>
            <q-item clickable to="/StockReport">
              <q-item-section>
                <q-item-label class="text-h6 text-teal-4">
                  Invetory Details
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <div class="row">
              <div class="col">
                <q-item>
                  <q-item-section>Total Stock Item</q-item-section>
                  <q-item-section class="text-h6 text-bold text-dark" side>
                    {{ allInventory.length }}
                  </q-item-section>
                </q-item>
                <q-separator inset />
                <q-item>
                  <q-item-section>Total Available Stock</q-item-section>
                  <q-item-section class="text-h6 text-bold text-dark" side>
                    {{ availableInventory.length }}
                  </q-item-section>
                </q-item>
                <q-separator inset />
                <q-item>
                  <q-item-section>Total Used Stock</q-item-section>
                  <q-item-section class="text-h6 text-bold text-dark" side>
                    {{ usedInventory.length }}
                  </q-item-section>
                </q-item>
              </div>
              <div class="col">
                <q-item>
                  <q-item-section>Total Expired Item</q-item-section>
                  <q-item-section class="text-h6 text-bold text-dark" side>
                    {{ expiredInventory.length }}
                  </q-item-section>
                </q-item>
                <q-separator inset />
                <q-item>
                  <q-item-section>Expiring Item</q-item-section>
                  <q-item-section class="text-h6 text-bold text-dark" side>
                    {{ cancelPurchase.length }}
                  </q-item-section>
                </q-item>
                <q-separator inset />
                <q-item>
                  <q-item-section>Low Stock Item</q-item-section>
                  <q-item-section class="text-h6 text-bold text-dark" side>
                    {{ cancelPurchase.length }}
                  </q-item-section>
                </q-item>
              </div>
            </div>
          </q-list>
        </q-card>
      </div>
      <div class="q-pt-lg col">
        <q-card style="width: 750px; max-width: 80vw">
          <q-list>
            <q-item clickable to="/PurchaseReport">
              <q-item-section>
                <q-item-label class="text-h6 text-teal-4">
                  Purchase Details
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <div class="row">
              <div class="col">
                <q-item>
                  <q-item-section>No. of Purchase</q-item-section>
                  <q-item-section class="text-h6 text-bold text-dark" side>
                    {{ allPurchase.length }}
                  </q-item-section>
                </q-item>
                <q-separator inset />
                <q-item>
                  <q-item-section>Monthly Cost</q-item-section>
                  <q-item-section class="text-h6 text-bold text-dark" side>
                    {{ getMonthlyPurchase }}
                  </q-item-section>
                </q-item>
                <q-separator inset />
                <q-item>
                  <q-item-section>Completed/Recieved</q-item-section>
                  <q-item-section class="text-h6 text-bold text-dark" side>
                    {{ completePurchase.length }}
                  </q-item-section>
                </q-item>
              </div>
              <div class="col">
                <q-item>
                  <q-item-section>Pending</q-item-section>
                  <q-item-section class="text-h6 text-bold text-dark" side>
                    {{ pendingPurchase.length }}
                  </q-item-section>
                </q-item>
                <q-separator inset />
                <q-item>
                  <q-item-section>Cancel</q-item-section>
                  <q-item-section class="text-h6 text-bold text-dark" side>
                    {{ cancelPurchase.length }}
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </div>
          </q-list>
        </q-card>
      </div>
    </div>
    <div class="row q-gutter-md q-pt-md q-pb-xl">
      <div class="col">
        <q-table
          style="max-height: 545px"
          title="Recent Transanction"
          title-class="text-teal-4"
          :rows="getTodaySale()"
          :columns="orderColumn"
          row-key="customer"
          :rows-per-page-options="[0]"
          hide-no-data
          hide-bottom
        />
      </div>
      <div class="col">
        <q-card>
          <q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon
                  color="teal-4"
                  class="bi bi-calendar-check"
                  size="35px"
                />
              </q-item-section>

              <q-item-section>
                <div class="text-h6 text-teal-4">Today's Profit</div>
              </q-item-section>
            </q-item>
          </q-item>
          <div class="q-pb-lg">
            <MonthCashFlowChart />
          </div>
        </q-card>
      </div>
    </div>
    <q-card>
      <q-card-section class="text-h6 q-pb-none">
        <q-item>
          <q-item-section avatar>
            <q-icon color="teal" name="fas fa-chart-line" size="44px" />
          </q-item-section>

          <q-item-section>
            <div class="text-h6 text-teal">Monthly Sales</div>
          </q-item-section>
        </q-item>
      </q-card-section>
      <div class="q-pa-lg max-height: 500px">
        <monthlyProductSales />
      </div>
    </q-card>
  </q-page>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapActions, mapGetters, mapState } from 'vuex';
import {
  ExpensesDto,
  InventoryDto,
  PurchaseDto,
  SaleRecordDto,
} from 'src/services/rest-api';
import monthlyProductSales from 'components/Charts/monthlyProductSales.vue';
import { date } from 'quasar';
const dateNow = new Date();
const TodayDate = date.formatDate(dateNow, 'YYYY-MM-DD');
import MonthCashFlowChart from 'components/Charts/DashMonthlyCashFlow.vue';

@Options({
  components: { monthlyProductSales, MonthCashFlowChart },
  computed: {
    ...mapGetters('inventory', [
      'usedInventory',
      'availableInventory',
      'getNearExpire',
      'getLowStock',
      'expiredInventory',
    ]),
    ...mapState('inventory', ['allInventory']),
    ...mapGetters('purchase', [
      'completePurchase',
      'cancelPurchase',
      'pendingPurchase',
      'getDailyPurchase',
      'getMonthlyPurchase',
    ]),
    ...mapState('purchase', ['allPurchase']),
    ...mapState('saleRecord', ['allSaleRecord']),
    ...mapState('expenses', ['allExpenses']),
    ...mapGetters('saleRecord', ['getDailySale']),
    ...mapGetters('expenses', ['getDailyExpenses']),
  },
  methods: {
    ...mapActions('purchase', ['getAllPurchase']),
    ...mapActions('saleRecord', ['getAllSaleRecord']),
    ...mapActions('expenses', ['getAllExpenses']),
    ...mapActions('inventory', ['getAllInventory']),
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
  allSaleRecord!: SaleRecordDto[];
  allExpenses!: ExpensesDto[];
  getDailySale!: number;
  getDailyExpenses!: number;
  getDailyPurchase!: number;
  getMonthlyPurchase!: number;
  getNearExpire!: InventoryDto[];
  getLowStock!: InventoryDto[];
  expiredInventory!: InventoryDto[];
  getAllPurchase!: () => Promise<void>;
  getAllSaleRecord!: () => Promise<void>;
  getAllExpenses!: () => Promise<void>;
  getAllInventory!: () => Promise<void>;

  getProfile!: () => Promise<void>;
  async mounted() {
    await this.getAllPurchase();
    await this.getAllSaleRecord();
    await this.getAllExpenses();
    await this.getAllInventory();
  }

  orderColumn = [
    {
      name: 'customer',
      label: 'Customer Name',
      align: 'left',
      field: (row: any) => row.customer?.customerName,
    },

    {
      name: 'cashier',
      align: 'center',
      label: 'Cashier',
      field: (row: any) => row.user?.FName + ' ' + row.user?.LName || 'None',
    },
    {
      name: 'total',
      align: 'center',
      label: 'Total Amount',
      field: (row: any) => row.totalAmount,
    },
  ];
  getTodaySale() {
    const result = this.allSaleRecord.filter((s) =>
      s.sales_order_created.match(TodayDate)
    );
    return result;
  }
  getTodayProfit() {
    const result = this.getDailySale - this.getDailyExpenses;
    return result.toFixed(2);
  }
}
</script>
<style>
.profit_bg {
  background-image: linear-gradient(to right, #1f2c36, #1b2b36);
}

.revenue_bg {
  background-image: linear-gradient(to right, #0c5874, #0c5874);
}

.purhcase_bg {
  background-image: linear-gradient(to right, #f25278, #f25278);
}

.expense_bg {
  background-image: linear-gradient(to right, #ffc657, #ffc657);
}
</style>
