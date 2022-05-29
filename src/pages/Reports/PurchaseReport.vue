<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 q-pb-lg text-bold">
      <q-icon name="request_quote" color="indigo" style="font-size: 4rem" />
      Purchase Report
    </div>
    <div>
      <div class="q-mt-lg">
        <div class="q-gutter-sm q-pa-sm row">
          <q-space />
          <q-btn
            color="teal"
            icon-right="archive"
            label="Export to csv"
            @click="exportTable()"
          />
        </div>
      </div>
      <q-table
        title="Purchase History"
        :rows="completePurchase"
        :columns="columns"
        row-key="itemCode"
        :rows-per-page-options="[0]"
        :filter="filter"
      >
        <template v-slot:top-right>
          <div>
            <q-fab
              color="teal-8"
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
                label="utensil"
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
        </template>
      </q-table>
    </div>
    <div class="q-py-lg row q-gutter-xl">
      <div class="col">
        <q-card style="height: 300px">
          <q-layout container style="height: 300px">
            <q-list style="max-height: 300px" class="rounded-borders">
              <q-item-label header>Pending Purchase</q-item-label>

              <q-item
                v-for="pending in pendingPurchase"
                v-bind:key="pending.purchaseProduct"
              >
                <q-item-section avatar top>
                  <q-icon name="pending_actions" color="green" size="34px" />
                </q-item-section>

                <q-item-section top class="col-2 gt-sm">
                  <q-item-label class="q-mt-sm">{{
                    pending.purchaseProduct
                  }}</q-item-label>
                </q-item-section>

                <q-item-section top>
                  <q-item-label lines="1">
                    <span class="text-weight-medium">Supplier: </span>
                    <span class="text-grey-8">
                      {{ pending.supplierPurchase?.company }}</span
                    >
                  </q-item-label>
                  <q-item-label caption lines="1">
                    Purchase Quantity: {{ pending.productQuantity }}
                  </q-item-label>
                </q-item-section>

                <q-item-section top side>
                  <q-item-label lines="1">
                    <span class="text-weight-medium">Price:</span>
                    <span class="text-grey-8">
                      ₱{{ pending.purchaseAmount }}</span
                    >
                  </q-item-label>
                  <q-item-label caption lines="1">
                    Date: {{ pending.purchaseDate }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator spaced />
            </q-list>
          </q-layout>
        </q-card>
      </div>
      <div class="col-5">
        <q-card style="height: 300px">
          <q-layout container style="height: 300px">
            <q-list bordered class="rounded-borders">
              <q-item-label header>Canceled List</q-item-label>

              <q-item
                v-for="data in cancelPurchase"
                v-bind:key="data.purchaseProduct"
              >
                <q-item-section avatar top>
                  <q-icon name="assignment_return" color="red" size="34px" />
                </q-item-section>

                <q-item-section top class="col-2 gt-sm">
                  <q-item-label class="q-mt-sm">
                    {{ data.purchaseProduct }}
                  </q-item-label>
                </q-item-section>

                <q-item-section top>
                  <q-item-label lines="1">
                    <span class="text-weight-medium">Supplier: </span>
                    <span class="text-grey-8">
                      {{ data.supplierPurchase?.company || 'None' }}</span
                    >
                  </q-item-label>
                  <q-item-label caption lines="1">
                    Purchase Quantity: {{ data.productQuantity }}
                  </q-item-label>
                </q-item-section>

                <q-item-section top side>
                  <q-item-label lines="1">
                    <span class="text-weight-medium">Price: </span>
                    <span class="text-grey-8"> ₱{{ data.purchaseAmount }}</span>
                  </q-item-label>
                  <q-item-label caption lines="1">
                    Date: {{ data.purchaseDate }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-layout>
        </q-card>
      </div>
    </div>
    <div class="q-pt-sm">
      <q-card class="flex flex-center">
        <q-card-section>
          <q-item-section>
            <div class="text-h6">Monthly Cost</div>
          </q-item-section>
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
    ]),
  },
  methods: {
    ...mapActions('purchase', ['getAllPurchase']),
  },
})
export default class Expenses extends Vue {
  completePurchase!: PurchaseDto[];
  cancelPurchase!: PurchaseDto[];
  pendingPurchase!: PurchaseDto[];
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
      align: 'right',
      label: 'Amount',
      field: 'purchaseAmount',
    },
    {
      name: 'purchaseStatus',
      align: 'center',
      label: 'Purchase Status',
      field: 'purchaseStatus',
    },
  ];
  filter = '';
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
