<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 text-teal q-pb-lg q-pt-md text-bold flex flex-center">
      <q-icon
        class="bi bi-graph-down q-pr-sm"
        color="teal"
        style="font-size: 3rem"
      />
      Sales Report
    </div>
    <div class="q-py-lg">
      <div class="row q-gutter-lg">
        <div class="col-9">
          <q-table
            style="max-height: 600px"
            title="Sales Record"
            :rows="allSaleRecord"
            :columns="column"
            row-key="subCategoryID"
            :rows-per-page-options="[0]"
            :filter="saleFilter"
          >
            <template v-slot:top-right>
              <div class="q-pa-md" style="max-width: 300px">
                <q-input clearable dense borderless v-model="saleFilter">
                  <template v-slot:append>
                    <q-icon
                      name="event"
                      color="secondary"
                      class="cursor-pointer"
                    >
                      <q-popup-proxy
                        ref="qDateProxy"
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="saleFilter" mask="YYYY-MM-DD">
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
              <q-btn
                color="teal"
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
                    color="teal"
                    icon="preview"
                    size="sm"
                    flat
                    dense
                    @click="openViewOrderList(props.row)"
                  />
                </div>
                <q-dialog v-model="showOrderList">
                  <q-card style="width: 800px; max-width: 100vw" flat bordered>
                    <q-card-section class="flex flex-center text-h6">
                      <q-item-label> Order List </q-item-label>
                    </q-card-section>
                    <q-card-section>
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
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                      <q-table
                        :rows="mapSalesOrder(inputSaleRecord)"
                        :columns="orderColumn"
                        row-key="subCategoryID"
                        :rows-per-page-options="[0]"
                      />
                    </q-card-section>
                  </q-card>
                </q-dialog>
              </q-td>
            </template>
          </q-table>
        </div>
        <div class="col">
          <q-card>
            <q-list bordered class="rounded-borders" style="max-width: 800px">
              <q-item-label header> Expenses Overview </q-item-label>

              <q-item>
                <q-item-section avatar top>
                  <q-icon name="payment" color="teal" size="35px" />
                </q-item-section>

                <q-item-section top>
                  <q-item-label class="q-mt-sm"> Today's Sale </q-item-label>
                </q-item-section>

                <q-item-section top side>
                  <q-item-label class="q-mt-sm">
                    {{ getDailySale }}</q-item-label
                  >
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar top>
                  <q-icon name="payment" color="teal" size="35px" />
                </q-item-section>

                <q-item-section top>
                  <q-item-label class="q-mt-sm"> Monthly Sale </q-item-label>
                </q-item-section>

                <q-item-section top side>
                  <q-item-label class="q-mt-sm">
                    {{ getMonthlySale }}</q-item-label
                  >
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar top>
                  <q-icon name="payment" color="teal" size="35px" />
                </q-item-section>

                <q-item-section top>
                  <q-item-label class="q-mt-sm"> Yearly Sales </q-item-label>
                </q-item-section>

                <q-item-section top side>
                  <q-item-label class="q-mt-sm">
                    {{ getYearlySale }}</q-item-label
                  >
                </q-item-section>
              </q-item>

              <q-separator spaced />
            </q-list>
          </q-card>
        </div>
      </div>
    </div>
    <!-- <q-card class="q-py-md">
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
    </q-card> -->

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
              <div class="text-h6">TODAY'S PROFIT</div>
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
    monthlyProductSales,
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
    ...mapGetters('saleOrder', ['getBestSeller']),
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
  getMilkteaTotal!: SaleOrderDto[];
  getBestSeller!: SaleOrderDto[];
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
    console.log(this.getBestSeller);
  }
  tab = 'Food';
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
      align: 'right',
      label: 'Total Amount',
      field: 'totalAmount',
    },
    {
      name: 'payment',
      align: 'right',
      label: 'Payment Amount',
      field: 'payment',
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
      field: (row: any) => row.orderName,
      sortable: true,
    },

    {
      name: 'quantity',
      align: 'center',
      label: 'Order Quantity',
      field: (row: any) => row.orderQuant,
      sortable: true,
    },
    {
      name: 'price',
      align: 'right',
      label: 'Price',
      field: (row: any) => row.orderPrice,
      sortable: true,
    },
    {
      name: 'size',
      align: 'center',
      label: 'Order Size',
      field: (row: any) => row.orderSize,
      sortable: true,
    },
    {
      name: 'category',
      align: 'center',
      label: 'Category',
      field: (row: any) => row.orderCategory,
      sortable: true,
    },
    {
      name: 'subCategory',
      align: 'center',
      label: 'Sub-Categories',
      field: (row: any) => row.orderSubCategory,
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
