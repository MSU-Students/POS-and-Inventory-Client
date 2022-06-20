<template>
  <q-page class="q-pa-lg bg-grey-1">
    <div class="text-h4 text-teal-4 q-pb-lg q-pt-md text-bold flex flex-center">
      <q-icon
        class="bi bi-graph-down q-pr-sm"
        color="teal-4"
        style="font-size: 3rem"
      />
      Sales Report
    </div>
    <div class="row q-col-gutter-lg q-pt-xl">
      <div class="col">
        <q-card>
          <q-card-section
            :class="$q.dark.isActive ? 'teal-4_dark' : 'bg-teal-4'"
            class="text-white"
          >
            <div class="row">
              <div class="col-10">
                <div class="text-h6">Today's Sale</div>
                <div class="text-h5 text-bold">₱ {{ getDailySale }}</div>
              </div>
              <div class="col-2">
                <q-icon size="50px" class="bi bi-cash-stack" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card>
          <q-card-section
            :class="$q.dark.isActive ? 'red_dark' : 'bg-teal-4'"
            class="text-white"
          >
            <div class="row">
              <div class="col-10">
                <div class="text-h6">Monthly Sale</div>
                <div class="text-h5 text-bold">₱ {{ getMonthlySale }}</div>
              </div>
              <div class="col-2">
                <q-icon size="50px" class="bi bi-cash-stack" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card>
          <q-card-section
            :class="$q.dark.isActive ? 'red_dark' : 'bg-teal-4'"
            class="text-white"
          >
            <div class="row">
              <div class="col-10">
                <div class="text-h6">Yearly Sale</div>
                <div class="text-h5 text-bold">₱ {{ getYearlySale }}</div>
              </div>
              <div class="col-2" align="right">
                <q-icon size="50px" class="bi bi-cash-stack" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="q-py-lg">
      <q-table
        title="Sales Record"
        :rows="allSaleRecord"
        :columns="column"
        row-key="subCategoryID"
        :filter="saleFilter"
      >
        <template v-slot:top-right>
          <div class="q-pa-md" style="max-width: 300px">
            <q-input clearable dense borderless v-model="saleFilter">
              <template v-slot:append>
                <q-icon name="event" color="secondary" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      color="teal-4"
                      v-model="saleFilter"
                      mask="YYYY-MM-DD"
                    >
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="red-5" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <q-btn
            color="teal-4"
            icon-right="archive"
            label="Export to csv"
            @click="exportTable()"
          />
        </template>

        <template v-slot:body-cell-viewOrderList="props">
          <q-td :props="props">
            <div>
              <q-btn
                round
                color="teal-4"
                icon="open_in_new"
                size="sm"
                flat
                dense
                @click="openViewOrderList(props.row)"
              />
            </div>
            <q-dialog v-model="showOrderList">
              <q-card style="width: 800px; max-width: 100vw" flat bordered>
                <div class="text-h5 text-teal-4 q-pt-lg row">
                  <div class="col-11 flex flex-center">
                    <q-icon
                      class="bi bi-cart-check-fill q-pr-sm"
                      color="teal-4"
                      style="font-size: 2rem"
                    />
                    Order List
                  </div>

                  <div class="col q-pr-md" align="right">
                    <q-btn
                      color="red-5"
                      flat
                      round
                      dense
                      icon="close"
                      v-close-popup
                    />
                  </div>
                </div>
                <q-card-section class="row">
                  <div class="col">
                    <div>
                      Invoice Reference:
                      <strong> {{ inputSaleRecord.invoiceID }}</strong>
                    </div>
                    <div>
                      Customer Name:
                      <strong>
                        {{ inputSaleRecord.customer?.customerName }}
                      </strong>
                    </div>
                    <div>
                      Cashier:
                      <strong>
                        {{
                          inputSaleRecord.user?.FName +
                          ' ' +
                          inputSaleRecord.user?.LName
                        }}
                      </strong>
                    </div>
                    <div>
                      Total Amount:
                      <strong>
                        {{ inputSaleRecord.totalAmount }}
                      </strong>
                    </div>
                  </div>
                  <div class="col" align="right">
                    <q-avatar size="100px">
                      <q-img src="../../assets/BesTea.jpg" />
                    </q-avatar>
                  </div>
                </q-card-section>
                <q-separator />
                <q-card-section>
                  <q-table
                    :rows="mapSalesOrder(inputSaleRecord)"
                    :columns="orderColumn"
                    row-key="subCategoryID"
                  />
                </q-card-section>
              </q-card>
            </q-dialog>
          </q-td>
        </template>
      </q-table>
    </div>

    <div class="q-pb-lg row q-gutter-md">
      <div class="col">
        <q-card
          class="bg-teal-4 flex flex-center text-h5 text-white text-weight-medium"
          style="height: 40px"
        >
          Sale Record
        </q-card>
        <q-card class>
          <q-tabs
            v-model="CategoryTab"
            dense
            class="text-teal-4"
            active-color="blue"
            indicator-color="blue"
            align="justify"
            narrow-indicator
          >
            <q-tab
              icon="dinner_dining"
              name="AllProducts"
              label="All Products"
            />
            <q-tab
              icon="local_drink"
              name="Drink/Beverages"
              label="Drink/Beverages"
            />
            <q-tab icon="dinner_dining" name="Food" label="Food" />
          </q-tabs>
          <q-separator />

          <q-tab-panels v-model="CategoryTab" animated>
            <q-tab-panel name="AllProducts">
              <q-tabs
                v-model="AllProductsTab"
                dense
                class="text-grey"
                active-color="blue"
                indicator-color="blue"
                align="justify"
                narrow-indicator
              >
                <q-tab name="allTheTime" label="All The Time" />
                <q-tab name="daily" label="Daily" />
                <q-tab name="monthly" label="Monthly" />
              </q-tabs>

              <q-separator />

              <q-tab-panels v-model="AllProductsTab" animated>
                <q-tab-panel name="daily">
                  <q-table
                    title="Daily Sell Record"
                    :rows="getDailyBestSeller"
                    :columns="allProducts"
                    row-key="name"
                  />
                </q-tab-panel>

                <q-tab-panel name="monthly">
                  <q-table
                    title="Daily Sell Record"
                    :rows="getMonthlyBestSeller"
                    :columns="allProducts"
                    row-key="name"
                  />
                </q-tab-panel>

                <q-tab-panel name="allTheTime">
                  <q-table
                    title="Daily Sell Record"
                    :rows="getBestSeller"
                    :columns="allProducts"
                    row-key="name"
                  />
                </q-tab-panel>
              </q-tab-panels>
            </q-tab-panel>
            <q-tab-panel name="Food">
              <q-tabs
                v-model="FoodTab"
                dense
                class="text-grey"
                active-color="blue"
                indicator-color="blue"
                align="justify"
                narrow-indicator
              >
                <q-tab name="allTheTime" label="All The Time" />
                <q-tab name="daily" label="Daily" />
                <q-tab name="monthly" label="Monthly" />
              </q-tabs>

              <q-separator />

              <q-tab-panels v-model="FoodTab" animated>
                <q-tab-panel name="daily">
                  <q-table
                    title="Daily Sell Record"
                    :rows="getDailyFoodBestSeller"
                    :columns="allProducts"
                    row-key="name"
                  />
                </q-tab-panel>

                <q-tab-panel name="monthly">
                  <q-table
                    title="Daily Sell Record"
                    :rows="getMonthlyFoodBestSeller"
                    :columns="allProducts"
                    row-key="name"
                  />
                </q-tab-panel>

                <q-tab-panel name="allTheTime">
                  <q-table
                    title="Daily Sell Record"
                    :rows="getFoodBestSeller"
                    :columns="allProducts"
                    row-key="name"
                  />
                </q-tab-panel>
              </q-tab-panels>
            </q-tab-panel>

            <q-tab-panel name="Drink/Beverages">
              <q-tabs
                v-model="DrinksTab"
                dense
                class="text-grey"
                active-color="blue"
                indicator-color="blue"
                align="justify"
                narrow-indicator
              >
                <q-tab name="allTheTime" label="All The Time" />
                <q-tab name="daily" label="Daily" />
                <q-tab name="monthly" label="Monthly" />
              </q-tabs>

              <q-separator />

              <q-tab-panels v-model="DrinksTab" animated>
                <q-tab-panel name="daily">
                  <q-table
                    title="Daily Sell Record"
                    :rows="getDailyDrinksBestSeller"
                    :columns="allProducts"
                    row-key="name"
                  />
                </q-tab-panel>

                <q-tab-panel name="monthly">
                  <q-table
                    title="Daily Sell Record"
                    :rows="getMonthlyDrinksBestSeller"
                    :columns="allProducts"
                    row-key="name"
                  />
                </q-tab-panel>

                <q-tab-panel name="allTheTime">
                  <q-table
                    title="Daily Sell Record"
                    :rows="getDrinksBestSeller"
                    :columns="allProducts"
                    row-key="name"
                  />
                </q-tab-panel>
              </q-tab-panels>
            </q-tab-panel>
          </q-tab-panels>
          <div class="q-pa-lg"></div>
        </q-card>
      </div>
      <div class="col-3">
        <q-card
          class="bg-teal-4 flex flex-center text-h5 text-white text-weight-medium"
          style="height: 40px"
        >
          Best Seller
        </q-card>
        <q-card class="flex flex-center q-pa-md">
          <div>
            <div
              class="q-pa-md"
              v-for="data in getTop3BestSeller"
              v-bind:key="data.orderName"
            >
              <q-card class="bg-teal-4 text-white q-pa-lg">
                <div class="text-h5 text-weight-bold flex flex-center">
                  {{ data.orderName }}
                </div>
                <div class="flex flex-center text-overline">
                  Total Sale: {{ data.orderQuant }}
                </div>
              </q-card>
            </div>
          </div>
        </q-card>
      </div>
    </div>

    <q-card class="q-pa-sm">
      <div class="row q-gutter-md">
        <div class="col-7">
          <q-card-section class="text-h6 q-pb-none">
            <q-item>
              <q-item-section avatar>
                <q-icon color="teal-4" name="fas fa-chart-line" size="44px" />
              </q-item-section>

              <q-item-section>
                <div class="text-h6 text-teal-4">Monthly Sales</div>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-section>
            <MonthlySales />
          </q-card-section>
        </div>

        <div class="col">
          <q-item>
            <q-card-section class="text-h6 q-pb-none">
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
            </q-card-section>
          </q-item>
          <div>
            <MonthCashFlowChart />
          </div>
        </div>
      </div>
    </q-card>

    <q-card class="q-my-lg">
      <q-card-section>
        <q-item>
          <q-item-section avatar>
            <q-icon color="teal-4" name="fas fa-chart-line" size="44px" />
          </q-item-section>

          <q-item-section>
            <div class="text-h6 text-teal-4">Yearly Sales</div>
          </q-item-section>
        </q-item>
      </q-card-section>
      <div class="q-pa-lg">
        <YearlySaleReport />
      </div>
    </q-card>
  </q-page>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import MonthlySales from 'components/Charts/monthlyProductSales.vue';
import MonthCashFlowChart from 'components/Charts/DashMonthlyCashFlow.vue';
import YearlySaleReport from 'components/Charts/YearlySaleReport.vue';
import { mapActions, mapGetters, mapState } from 'vuex';
import {
  CustomerDto,
  SaleOrderDto,
  SaleRecordDto,
  UserDto,
} from 'src/services/rest-api';
import { exportFile } from 'quasar';
@Options({
  components: {
    MonthlySales,
    MonthCashFlowChart,
    YearlySaleReport,
  },
  computed: {
    ...mapState('saleRecord', ['allSaleRecord']),
    ...mapState('customer', ['allCustomer']),
    ...mapState('saleOrder', ['allSaleOrder']),
    ...mapState('account', ['allAccount']),
    ...mapGetters('saleRecord', [
      'getDailySale',
      'getMonthlySale',
      'getYearlySale',
    ]),
    ...mapGetters('saleOrder', [
      'getBestSeller',
      'getMonthlyBestSeller',
      'getDaillyBestSeller',
      'getDrinksBestSeller',
      'getDailyDrinksBestSeller',
      'getMonthlyDrinksBestSeller',
      'getFoodBestSeller',
      'getDailyFoodBestSeller',
      'getMonthlyFoodBestSeller',
      'getTop3BestSeller',
    ]),
  },
  methods: {
    ...mapActions('saleRecord', ['getAllSaleRecord']),
    ...mapActions('saleOrder', ['getAllSaleOrder']),
  },
})
export default class SaleRecord extends Vue {
  allSaleRecord!: SaleRecordDto[];
  allAccount!: UserDto[];
  allCustomer!: CustomerDto[];
  allSaleOrder!: SaleOrderDto[];
  getDailySale!: number;
  getMonthlySale!: number;
  getYearlySale!: number;
  getBestSeller!: SaleOrderDto[];
  getMonthlyBestSeller!: SaleOrderDto[];
  getDailyBestSeller!: SaleOrderDto[];
  getMonthlyFoodBestSeller!: SaleOrderDto[];
  getDailyFoodBestSeller!: SaleOrderDto[];
  getFoodBestSeller!: SaleOrderDto[];
  getMonthlyDrinksBestSeller!: SaleOrderDto[];
  getDailyDrinksBestSeller!: SaleOrderDto[];
  getDrinksBestSeller!: SaleOrderDto[];
  getTop3BestSeller!: SaleOrderDto[];
  getAllSaleRecord!: () => Promise<void>;
  getAllSaleOrder!: () => Promise<void>;
  mapSalesOrder(invoice: SaleRecordDto) {
    return this.allSaleOrder.filter(
      (r) => r.invoice?.invoiceID == invoice.invoiceID
    );
  }
  async mounted() {
    await this.getAllSaleRecord();
    await this.getAllSaleOrder();
    console.log(this.getTop3BestSeller);
  }
  CategoryTab = 'AllProducts';
  AllProductsTab = 'allTheTime';
  DrinksTab = 'allTheTime';
  FoodTab = 'allTheTime';
  saleFilter = '';
  showOrderList = false;

  column = [
    {
      name: 'inovoiceID',
      required: true,
      label: 'Reference',
      align: 'left',
      field: (row: SaleRecordDto) => row.invoiceID,
    },
    {
      name: 'orderDate',
      align: 'center',
      label: 'Customer Name',
      field: (row: SaleRecordDto) => row.customer?.customerName || 'None',
    },
    {
      name: 'cashier',
      align: 'center',
      label: 'Cashier',
      field: (row: SaleRecordDto) => row.user?.FName + ' ' + row.user?.LName,
    },
    {
      name: 'total',
      align: 'center',
      label: 'Total Amount',
      field: (row: SaleRecordDto) => '₱ ' + this.formatPrice(row.totalAmount),
    },
    {
      name: 'payment',
      align: 'center',
      label: 'Payment Amount',
      field: (row: SaleRecordDto) => '₱ ' + this.formatPrice(row.payment),
    },

    {
      name: 'date',
      align: 'center',
      label: 'Date Created',
      field: 'sales_order_created',
      sortable: true,
    },

    {
      name: 'viewOrderList',
      align: 'center',
      label: 'View Order',
    },
  ];

  orderColumn = [
    {
      name: 'order',
      label: 'Order',
      align: 'left',
      field: (row: SaleOrderDto) => row.orderName,
      sortable: true,
    },

    {
      name: 'quantity',
      align: 'center',
      label: 'Order Quantity',
      field: (row: SaleOrderDto) => row.orderQuant,
      sortable: true,
    },
    {
      name: 'price',
      align: 'center',
      label: 'Price',
      field: (row: SaleOrderDto) => '₱ ' + this.formatPrice(row.orderPrice),
      sortable: true,
    },
    {
      name: 'size',
      align: 'center',
      label: 'Order Size',
      field: (row: SaleOrderDto) => row.orderSize,
      sortable: true,
    },
    {
      name: 'category',
      align: 'center',
      label: 'Category',
      field: (row: SaleOrderDto) => row.orderCategory,
      sortable: true,
    },
    {
      name: 'subCategory',
      align: 'center',
      label: 'Sub-Categories',
      field: (row: SaleOrderDto) => row.orderSubCategory,
      sortable: true,
    },
  ];

  allProducts = [
    {
      name: 'name',
      required: true,
      label: 'Product Name',
      align: 'center',
      field: (row: SaleOrderDto) => row.orderName,
      sortable: true,
    },

    {
      name: 'quantity',
      label: 'Quantity',
      align: 'center',
      field: (row: SaleOrderDto) => row.orderQuant,
      sortable: true,
    },
  ];

  inputSaleRecord: SaleRecordDto = {
    sales_order_created: '',
    totalAmount: 0,
    payment: 0,
  };

  inputSaleOrder: SaleOrderDto = {
    orderName: '',
    orderQuant: 0,
    orderPrice: 0,
    orderSize: '',
    orderSubTotal: 0,
  };

  openViewOrderList(val: SaleRecordDto) {
    this.showOrderList = true;
    this.inputSaleRecord = { ...val };
  }
  wrapCsvValue(
    val: string,
    formatFn?: (v: string, r: any) => string,
    row?: any
  ) {
    let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

    formatted =
      formatted === void 0 || formatted === null ? '' : String(formatted);

    formatted = formatted.split('"').join('""');
    /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
    // .split('\n').join('\\n')
    // .split('\r').join('\\r')

    return `"${formatted}"`;
  }
  formatPrice(value: number) {
    let val = (value / 1).toFixed(2).replace(',', '.');
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  exportTable() {
    // naive encoding to csv format
    const header = [
      this.wrapCsvValue('Reference'),
      this.wrapCsvValue('Customer Name'),
      this.wrapCsvValue('Cashier'),
      this.wrapCsvValue('Total Amount'),
      this.wrapCsvValue('Payment Amount'),
      this.wrapCsvValue('Date Created'),
    ];
    const rows = [header.join(',')].concat(
      this.allSaleRecord.map((c) =>
        [
          this.wrapCsvValue(String(c.invoiceID)),
          this.wrapCsvValue(String(c.customer?.customerName)),
          this.wrapCsvValue(String(c.user?.FName)) +
            this.wrapCsvValue(String(c.user?.LName)),
          this.wrapCsvValue(String(c.totalAmount)),
          this.wrapCsvValue(String(c.payment)),
          this.wrapCsvValue(String(c.sales_order_created)),
        ].join(',')
      )
    );

    const status = exportFile(
      'category-export.csv',
      rows.join('\r\n'),
      'text/csv'
    );

    if (status !== true) {
      this.$q.notify({
        message: 'Browser denied file download...',
        color: 'negative',
        icon: 'warning',
      });
    }
  }
}
</script>
<style lang="sass" scoped>
.my-card
  position: relative
  margin: auto
  height: 80vh
  width: 80vw
</style>
