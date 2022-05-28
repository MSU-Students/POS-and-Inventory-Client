<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 q-pb-lg text-bold">
      <q-icon name="archive" color="indigo" style="font-size: 4rem" />
      Stock Report
    </div>
    <div class="row">
      <div class="col-9">
        <div class="q-pr-md">
          <q-card>
            <q-table
              title="Stock List"
              :rows="usedInventory"
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
                    label="Filter by:"
                    label-position="top"
                    external-label
                    padding="xs"
                    direction="left"
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
                <div class="q-gutter-sm q-pa-sm row">
                  <q-space />
                  <q-btn
                    color="teal"
                    icon-right="archive"
                    label="Export to csv"
                    @click="exportTable()"
                  />
                </div>
              </template>
            </q-table>
          </q-card>
        </div>
      </div>
      <div class="col">
        <q-card>
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label class="text-h6"> Dashboard </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item>
              <q-item-section>Total Stock-in</q-item-section>
              <q-item-section class="text-h6 text-bold text-primary" side>
                {{ allInventory.length }}
              </q-item-section>
            </q-item>
            <q-separator inset />
            <q-item>
              <q-item-section>Total Available</q-item-section>
              <q-item-section class="text-h6 text-bold text-green" side>
                {{ availableInventory.length }}
              </q-item-section>
            </q-item>
            <q-separator inset />
            <q-item>
              <q-item-section>Total Used</q-item-section>
              <q-item-section class="text-h6 text-bold text-red-10" side>
                {{ usedInventory.length }}
              </q-item-section>
            </q-item>
            <q-separator inset />
            <q-separator inset />
          </q-list>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { InventoryDto } from 'src/services/rest-api';
import { mapActions, mapGetters, mapState } from 'vuex';
import { exportFile } from 'quasar';

@Options({
  computed: {
    ...mapGetters('inventory', ['usedInventory']),
    ...mapState('inventory', ['allInventory']),
    ...mapGetters('inventory', ['availableInventory']),
  },
  methods: {
    ...mapActions('inventory', ['getAllInventory']),
  },
})
export default class Expenses extends Vue {
  usedInventory!: InventoryDto[];
  allInventory!: InventoryDto[];
  availableInventory!: InventoryDto[];
  getAllInventory!: () => Promise<void>;

  async mounted() {
    await this.getAllInventory();
  }
  columns = [
    {
      name: 'itemName',
      required: true,
      label: 'Item Name',
      align: 'left',
      field: (row: InventoryDto) => row.itemName,
      format: (val: string) => `${val}`,
    },
    {
      name: 'itemCategory',
      align: 'center',
      label: 'Category',
      field: 'itemCategory',
    },
    {
      name: 'itemQuantStatus',
      align: 'center',
      label: 'Quantity',
      field: 'itemQuantProd',
    },
    {
      name: 'itemUnitProd',
      align: 'center',
      label: 'Unit',
      field: 'itemUnitProd',
    },

    {
      name: 'itemStatus',
      align: 'center',
      label: 'Status',
      field: 'itemStatus',
    },

    {
      name: 'itemExpiryDate',
      align: 'center',
      label: 'Expiry Date',
      field: 'itemExpiryDate',
      sortable: true,
    },

    {
      name: 'itemConsumeAt',
      align: 'center',
      label: 'Consume At',
      field: 'itemConsumeAt',
      sortable: true,
    },

    {
      name: 'itemDateCreated',
      align: 'center',
      label: 'Date Stock In',
      field: 'itemDateCreated',
      sortable: true,
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
      this.wrapCsvValue('Item Name'),
      this.wrapCsvValue('Category'),
      this.wrapCsvValue('Quantity'),
      this.wrapCsvValue('Unit'),
      this.wrapCsvValue('Status'),
      this.wrapCsvValue('Expiry Date'),
      this.wrapCsvValue('Recent Consume'),
      this.wrapCsvValue('Date Stock-in'),
    ];
    const rows = [header.join(',')].concat(
      this.allInventory.map((c) =>
        [
          this.wrapCsvValue(String(c.itemName)),
          this.wrapCsvValue(String(c.itemCategory)),
          this.wrapCsvValue(String(c.itemQuantProd)),
          this.wrapCsvValue(String(c.itemUnitProd)),
          this.wrapCsvValue(String(c.itemStatus)),
          this.wrapCsvValue(String(c.itemExpiryDate) || 'None'),
          this.wrapCsvValue(String(c.itemConsumeAt)),
          this.wrapCsvValue(String(c.itemDateCreated)),
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
  height: 70vh
  width: 90vw
</style>
