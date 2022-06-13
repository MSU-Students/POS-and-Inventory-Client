<template>
  <q-page class="q-pa-lg bg-grey-1">
    <div class="text-h4 text-teal-4 q-pb-lg q-pt-md text-bold flex flex-center">
      <q-icon
        class="bi bi-graph-down q-pr-sm"
        color="teal-4"
        style="font-size: 3rem"
      />
      Purchase Report
    </div>
    <div class="q-py-lg">
      <div class="row q-col-gutter-lg q-pt-xl">
        <div class="col">
          <q-card>
            <q-card-section
              :class="$q.dark.isActive ? 'teal-4_dark' : 'bg-teal-4'"
              class="text-white"
            >
              <div class="row">
                <div class="col-10">
                  <div class="text-h6">Pending Purchase</div>
                  <div class="text-h5 text-bold">
                    {{ pendingPurchase.length }}
                  </div>
                </div>
                <div class="col-2">
                  <q-icon size="50px" class="bi bi-cart-plus" />
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
                  <div class="text-h6">Completed Purchase</div>
                  <div class="text-h5 text-bold">
                    {{ completePurchase.length }}
                  </div>
                </div>
                <div class="col-2">
                  <q-icon size="50px" class="bi bi-cart-check" />
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
                  <div class="text-h6">Total Daily Purchase</div>
                  <div class="text-h5 text-bold">₱ {{ getDailyPurchase }}</div>
                </div>
                <div class="col-2" align="right">
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
                  <div class="text-h6">Total Monthly Purchase</div>
                  <div class="text-h5 text-bold">
                    ₱ {{ getMonthlyPurchase }}
                  </div>
                </div>
                <div class="col-2" align="right">
                  <q-icon size="50px" class="bi bi-cash-stack" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="q-pt-lg">
        <q-table
          title="Purchase History"
          :rows="completePurchase"
          :columns="columns"
          row-key="itemCode"
          :filter="filter"
        >
          <template v-slot:top-right>
            <div>
              <q-fab
                color="teal-4"
                icon="sort"
                direction="left"
                label="Filter by:"
                label-position="top"
                external-label
                padding="xs"
              >
                <q-fab-action
                  color="white"
                  text-color="black"
                  @click="filter = 'utensil'"
                  label="Utensil"
                />
                <q-fab-action
                  color="white"
                  text-color="black"
                  @click="filter = 'Ingredient'"
                  label="Ingredient"
                />
                <q-fab-action
                  color="white"
                  text-color="black"
                  @click="filter = 'Equipment'"
                  label="Equipment"
                />
                <q-fab-action
                  color="white"
                  text-color="black"
                  @click="filter = ''"
                  icon="clear"
                />
              </q-fab>
            </div>
            <div class="q-pa-md q-gutter-sm row">
              <q-input
                outlined
                rounded
                dense
                debounce="300"
                v-model="filter"
                placeholder="Search"
              >
                <template v-slot:append>
                  <q-icon name="search" />
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
          <template #body-cell-status="props">
            <q-td :props="props">
              <q-chip
                flat
                color="white"
                :text-color="colorManipulation(props.row.purchaseStatus)"
                :label="labelManipulation(props.row.purchaseStatus)"
              />
            </q-td>
          </template>
        </q-table>
      </div>
    </div>
    <div class="row q-gutter-md q-pb-md">
      <div class="col">
        <q-card
          class="bg-teal-4 flex flex-center text-h5 text-white text-weight-medium"
          style="height: 40px"
        >
          <q-icon class="bi bi-cart-fill q-pr-sm" color="white" size="30px" />
          Pending Purchase
        </q-card>
        <q-card style="height: 400px">
          <q-layout container style="height: 400px">
            <q-list separator bordered>
              <q-item
                v-for="pending in pendingPurchase"
                v-bind:key="pending.purchaseProduct"
              >
                <q-item-section top class="col-2 gt-sm">
                  <q-item-label class="q-mt-sm">
                    {{ pending.purchaseProduct }}
                  </q-item-label>
                </q-item-section>

                <q-item-section top>
                  <q-item-label lines="1">
                    <span class="text-weight-medium">Supplier: </span>
                    <span class="text-grey-8">
                      {{ pending.supplierPurchase?.company || 'None' }}
                    </span>
                  </q-item-label>
                  <q-item-label caption lines="1">
                    Purchase Quantity: {{ pending.productQuantity }}
                  </q-item-label>
                </q-item-section>

                <q-item-section top>
                  <q-item-label>
                    <q-chip
                      flat
                      color="white"
                      :text-color="colorManipulation(pending.purchaseStatus)"
                      :label="labelManipulation(pending.purchaseStatus)"
                    />
                  </q-item-label>
                </q-item-section>

                <q-item-section top side>
                  <q-item-label lines="1">
                    <span class="text-weight-medium">Price:</span>
                    <span class="text-grey-8">
                      ₱ {{ pending.purchaseAmount }}
                    </span>
                  </q-item-label>
                  <q-item-label caption lines="1">
                    Date: {{ pending.purchaseDate }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator inset vertical />
            </q-list>
          </q-layout>
        </q-card>
      </div>
      <div class="col">
        <q-card
          class="bg-teal-4 flex flex-center text-h5 text-white text-weight-medium"
          style="height: 40px"
        >
          <q-icon class="bi bi-cart-x-fill q-pr-sm" color="white" size="30px" />
          Canceled Purchase
        </q-card>
        <q-card style="height: 400px">
          <q-layout container style="height: 400px">
            <q-list separator bordered>
              <q-item
                v-for="data in cancelPurchase"
                v-bind:key="data.purchaseID"
              >
                <q-item-section top class="col-2 gt-sm">
                  <q-item-label class="q-mt-sm">
                    {{ data.purchaseProduct }}
                  </q-item-label>
                </q-item-section>

                <q-item-section top>
                  <q-item-label lines="1">
                    <span class="text-weight-medium">Supplier: </span>
                    <span class="text-grey-8">
                      {{ data.supplierPurchase?.company || 'None' }}
                    </span>
                  </q-item-label>
                  <q-item-label caption lines="1">
                    Purchase Quantity: {{ data.productQuantity }}
                  </q-item-label>
                </q-item-section>

                <q-item-section top>
                  <q-item-label>
                    <q-chip
                      flat
                      color="white"
                      :text-color="colorManipulation(data.purchaseStatus)"
                      :label="labelManipulation(data.purchaseStatus)"
                    />
                  </q-item-label>
                </q-item-section>

                <q-item-section top side>
                  <q-item-label lines="1">
                    <span class="text-weight-medium">Price: </span>
                    <span class="text-grey-8">
                      ₱ {{ data.purchaseAmount }}</span
                    >
                  </q-item-label>
                  <q-item-label caption lines="1">
                    Date: {{ data.purchaseDate }}
                  </q-item-label>
                </q-item-section>
                <div class="q-pl-sm" top>
                  <q-btn
                    color="red-5"
                    icon="delete"
                    flat
                    round
                    dense
                    @click="onDeleteCanceled(data)"
                  />
                </div>
              </q-item>
            </q-list>
          </q-layout>
        </q-card>
      </div>
    </div>
    <div class="q-pt-sm">
      <q-card class="flex flex-center">
        <q-card-section
          header
          class="text-h5 text-bold text-teal-4 text-bold flex flex-center"
        >
          <q-icon
            class="bi bi-cash-stack q-pr-sm"
            color="teal-4"
            style="font-size: 2rem"
          />
          Monthly Cost
        </q-card-section>
        <q-card-section>
          <costChart />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import CostChart from 'components/Charts/CostChart.vue';
import { mapActions, mapGetters } from 'vuex';
import { PurchaseDto } from 'src/services/rest-api';
import { exportFile } from 'quasar';

@Options({
  components: { CostChart },
  computed: {
    ...mapGetters('purchase', [
      'completePurchase',
      'cancelPurchase',
      'pendingPurchase',
      'getDailyPurchase',
      'getMonthlyPurchase',
    ]),
  },
  methods: {
    ...mapActions('purchase', ['getAllPurchase', 'deletePurchase']),
  },
})
export default class Expenses extends Vue {
  completePurchase!: PurchaseDto[];
  cancelPurchase!: PurchaseDto[];
  pendingPurchase!: PurchaseDto[];
  getMonthlyPurchase!: number;
  getDailyPurchase!: number;
  deletePurchase!: (payload: PurchaseDto) => Promise<void>;
  getAllPurchase!: () => Promise<void>;

  async moungited() {
    await this.getAllPurchase();
  }
  columns = [
    {
      name: 'itemCode',
      required: true,
      label: 'Purchase Reference',
      align: 'left',
      field: 'purchaseID',
    },
    {
      name: 'purchaseProduct',
      required: true,
      label: 'Product Name',
      align: 'left',
      field: 'purchaseProduct',
    },
    {
      name: 'purchaseDate',
      align: 'center',
      label: 'Date Purchase',
      field: 'purchaseDate',
    },
    {
      name: 'supplier',
      align: 'center',
      label: 'Supplier',
      field: (row: PurchaseDto) => row.supplierPurchase?.company || 'None',
    },

    {
      name: 'purchaseCategory',
      align: 'center',
      label: 'Category',
      field: 'purchaseCategory',
    },

    {
      name: 'productQuantity',
      align: 'center',
      label: 'Quantity',
      field: 'productQuantity',
    },
    {
      name: 'productUnit',
      align: 'center',
      label: 'Unit Measurement',
      field: 'productUnit',
    },
    {
      name: 'purchaseAmount',
      align: 'center',
      label: 'Amount',
      field: (row: PurchaseDto) => '₱' + row.purchaseAmount,
    },
    {
      name: 'status',
      align: 'center',
      label: 'Purchase Status',
      field: 'purchaseStatus',
    },
  ];
  filter = '';
  onDeleteCanceled(val: PurchaseDto) {
    this.$q
      .dialog({
        message: 'Confirm to delete?',
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deletePurchase(val.purchaseID as any);
        this.$q.notify({
          type: 'warning',
          message: 'Successfully deleted',
        });
      });
  }

  colorManipulation(purchaseStatus: string) {
    if (purchaseStatus.match('Pending')) {
      return 'warning';
    }
    if (purchaseStatus.match('Completed')) {
      return 'positive';
    }
    if (purchaseStatus.match('Canceled')) {
      return 'negative';
    }
  }
  labelManipulation(purchaseStatus: string) {
    if (purchaseStatus.match('Pending')) {
      return 'PENDING';
    }
    if (purchaseStatus.match('Completed')) {
      return 'COMPLETED';
    }
    if (purchaseStatus.match('Canceled')) {
      return 'CANCELED';
    }
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
      this.wrapCsvValue('Purchase Reference'),
      this.wrapCsvValue('Product Name'),
      this.wrapCsvValue('Purchase Date'),
      this.wrapCsvValue('Supplier'),
      this.wrapCsvValue('Category'),
      this.wrapCsvValue('Quantity'),
      this.wrapCsvValue('Unit Measurement'),
      this.wrapCsvValue('Amount'),
      this.wrapCsvValue('Purchase Status'),
    ];
    const rows = [header.join(',')].concat(
      this.completePurchase.map((c) =>
        [
          this.wrapCsvValue(String(c.purchaseID)),
          this.wrapCsvValue(c.purchaseProduct),
          this.wrapCsvValue(String(c.purchaseDate)),
          this.wrapCsvValue(String(c.supplierPurchase?.company) || 'None'),
          this.wrapCsvValue(c.purchaseCategory),
          this.wrapCsvValue(String(c.productQuantity)),
          this.wrapCsvValue(String(c.productUnit)),
          this.wrapCsvValue(String(c.purchaseAmount)),
          this.wrapCsvValue(c.purchaseStatus),
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
  height: 56vh
  width: 113vw
</style>
