<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 text-bold row">Sales Report</div>
    <div class="q-py-lg">
      <q-table
        title="Sales Record"
        :rows="allSaleRecord"
        :columns="column"
        row-key="subCategoryID"
        :rows-per-page-options="[0]"
        :filter="saleFilter"
      >
        <template v-slot:top-right>
          <div class="q-pa-md" style="max-width: 300px">
            <q-input dense borderless v-model="saleFilter">
              <template v-slot:append>
                <q-icon name="event" color="secondary" class="cursor-pointer">
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
        </template>

        <template v-slot:body-cell-viewOrderList="props">
          <q-td :props="props">
            <div>
              <q-btn
                round
                color="blue"
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
                  <q-list>
                    <q-item
                      style="border: 1px solid black"
                      v-for="invoice in mapSalesOrder(inputSaleRecord)"
                      :key="invoice.order_ID"
                    >
                      <q-item-section>
                        {{ invoice.orderName }}
                      </q-item-section>
                      <q-item-section>
                        {{ invoice.orderQuant }}
                      </q-item-section>
                      <q-item-section>
                        {{ invoice.orderPrice }}
                      </q-item-section>
                      <q-item-section>
                        {{ invoice.orderSize }}
                      </q-item-section>
                      <q-item-section>
                        {{ invoice.orderCategory }}
                      </q-item-section>
                      <q-item-section>
                        {{ invoice.orderSubCategory }}
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </q-dialog>
          </q-td>
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
import { mapActions, mapState } from 'vuex';
import { ICartInfo } from 'src/store/cart/state';
import {
  CustomerDto,
  SaleOrderDto,
  SaleRecordDto,
  UserDto,
} from 'src/services/rest-api';
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
    ...mapState('saleRecord', ['allSaleRecord']),
    ...mapState('customer', ['allCustomer']),
    ...mapState('saleOrder', ['allSaleOrder']),
    ...mapState('account', ['allAccount']),
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
  getAllSaleRecord!: () => Promise<void>;
  getAllSaleOrder!: () => Promise<void>;
  mapSalesOrder(invoice: SaleRecordDto) {
    return this.allSaleOrder.filter(
      (r) => r.invoice?.invoiceID == invoice.invoiceID
    );
  }
  async mounted() {
    await this.getAllSaleRecord();
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
      field: (row: any) => row.customer?.customerName || 'None',
    },
    {
      name: 'cashier',
      align: 'center',
      label: 'Cashier',
      field: (row: any) => row.user?.FName + ' ' + row.user?.LName,
    },
    {
      name: 'total',
      align: 'center',
      label: 'Total Amount',
      field: 'totalAmount',
    },
    {
      name: 'payment',
      align: 'center',
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
      field: (row: SaleRecordDto) => row.saleOrder?.orderName,
      sortable: true,
    },

    {
      name: 'quantity',
      align: 'center',
      label: 'Order Quantity',
      field: (row: SaleRecordDto) => row.saleOrder?.orderQuant,
      sortable: true,
    },
    {
      name: 'price',
      align: 'center',
      label: 'Price',
      field: (row: SaleRecordDto) => row.saleOrder?.orderPrice,
      sortable: true,
    },
    {
      name: 'size',
      align: 'center',
      label: 'Order Size',
      field: (row: SaleRecordDto) => row.saleOrder?.orderSize,
      sortable: true,
    },
    {
      name: 'category',
      align: 'center',
      label: 'Category',
      field: (row: SaleRecordDto) => row.saleOrder?.orderCategory,
      sortable: true,
    },
    {
      name: 'subCategory',
      align: 'center',
      label: 'Sub-Categories',
      field: (row: SaleRecordDto) => row.saleOrder?.orderSubCategory,
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
}
</script>
<style lang="sass" scoped>
.my-card
  position: relative
  margin: auto
  height: 80vh
  width: 80vw
</style>
