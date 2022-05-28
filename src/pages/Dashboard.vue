<template>
  <q-page class="q-pa-xl">
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
                <q-item-label>
                  <span> ₱ </span>
                  {{ getSumSaleToday() - getSumExpenses() }}
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
                <q-item-label>
                  <span> ₱ </span>
                  {{ getSumSaleToday() }}
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
                <q-item-label>
                  <span> ₱ </span>
                  {{ getSumPurchase() }}
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
                <q-item-label>
                  <span> ₱ </span>
                  {{ getSumExpenses() }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="q-pt-md row q-gutter-xl">
      <div class="col">
        <div class="q-pt-lg row">
          <q-card class="text-secondary" style="width: 750px; max-width: 80vw">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-h6">
                    Invetory Details
                  </q-item-label>
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
        <div class="q-pt-xl row">
          <q-card class="text-secondary" style="width: 750px; max-width: 80vw">
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
                      {{ getSumPurchase() }}
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
        </div>
      </div>
      <div class="col q-pt-lg">
        <q-table
          style="max-height: 435px"
          class="text-secondary"
          title="Recent Transanction"
          :rows="getTodaySale()"
          :columns="orderColumn"
          row-key="customer"
          :rows-per-page-options="[0]"
          hide-no-data
          hide-bottom
        />
      </div>
    </div>
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
  UserDto,
} from 'src/services/rest-api';
import { date } from 'quasar';
const dateNow = new Date();
const TodayDate = date.formatDate(dateNow, 'YYYY-MM-DD');

@Options({
  components: {},
  computed: {
    ...mapGetters('inventory', ['usedInventory', 'availableInventory']),
    ...mapState('inventory', ['allInventory']),
    ...mapGetters('purchase', [
      'completePurchase',
      'cancelPurchase',
      'pendingPurchase',
    ]),
    ...mapState('purchase', ['allPurchase']),
    ...mapState('saleRecord', ['allSaleRecord']),
    ...mapState('expenses', ['allExpenses']),
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

  getSumPurchase() {
    const result = this.completePurchase
      .filter((s) => s.purchaseDate.match(TodayDate))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.purchaseAmount;
      }, 0);
    return result;
  }
  getSumExpenses() {
    const result = this.allExpenses
      .filter((s) => s.expensesDate.match(TodayDate))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    return result;
  }
  getSumSaleToday() {
    const result = this.allSaleRecord
      .filter((s) => s.sales_order_created.match(TodayDate))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
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
