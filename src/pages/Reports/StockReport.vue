<template>
  <q-page class="q-pa-lg bg-grey-1">
    <div class="text-h4 text-teal-4 q-pb-lg q-pt-md text-bold flex flex-center">
      <q-icon
        class="bi bi-graph-down q-pr-sm"
        color="teal-4"
        style="font-size: 3rem"
      />
      Stock Report
    </div>
    <div class="row q-col-gutter-lg q-pt-md">
      <div class="col">
        <q-card>
          <q-card-section
            :class="$q.dark.isActive ? 'teal-4_dark' : 'bg-teal-4'"
            class="text-white"
          >
            <div class="row">
              <div class="col-10">
                <div class="text-h6">Total Stock-in Item</div>
                <div class="text-h5 text-bold">{{ allInventory.length }}</div>
              </div>
              <div class="col-2">
                <q-icon size="50px" class="bi bi-inboxes-fill" />
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
                <div class="text-h6">Total Available Item</div>
                <div class="text-h5 text-bold">
                  {{ availableInventory.length }}
                </div>
              </div>
              <div class="col-2">
                <q-icon size="50px" class="bi bi-box-arrow-in-down" />
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
                <div class="text-h6">Total Used Item</div>
                <div class="text-h5 text-bold">{{ usedInventory.length }}</div>
              </div>
              <div class="col-2" align="right">
                <q-icon size="50px" class="bi bi-calendar-week-fill" />
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
                <div class="text-h6">Total Expired Item</div>
                <div class="text-h5 text-bold">
                  {{ expiredInventory.length }}
                </div>
              </div>
              <div class="col-2" align="right">
                <q-icon size="50px" class="bi bi-calendar-week-fill" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="q-pr-md q-pt-xl">
      <q-card
        class="bg-teal-4 flex flex-center text-h5 text-white text-weight-medium"
        style="height: 40px"
      >
        Inventory History
      </q-card>
    </div>
    <div class="q-pr-md q-pt-sm q-pb-lg">
      <q-table
        title="Inventory Report"
        :rows="usedInventory"
        :columns="columns"
        table-header-class="bg-teal-4 text-white"
        row-key="itemCode"
        :filter="filter"
      >
        <template v-slot:top-right>
          <div>
            <q-fab
              color="teal-4"
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
                @click="filter = 'Utensil'"
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
          <div class="q-gutter-sm q-pa-sm row">
            <q-space />
            <q-btn
              color="teal-4"
              icon-right="archive"
              label="Export to csv"
              @click="exportTable()"
            />
          </div>
        </template>
        <template #body-cell-status="props">
          <q-td :props="props">
            <q-chip
              flat
              color="white"
              :text-color="colorManipulation(props.row.itemStatus)"
              :label="labelManipulation(props.row.itemStatus)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
    <div class="q-pr-md q-pt-xl">
      <q-card
        class="bg-teal-4 flex flex-center text-h5 text-white text-weight-medium"
        style="height: 40px"
      >
        Expired Item
      </q-card>
    </div>

    <div class="q-pr-md q-pt-sm">
      <q-table
        :rows="expiredInventory"
        :columns="expiredColumn"
        table-header-class="bg-teal-4 text-white"
        row-key="itemCode"
        :filter="expiredFilter"
      >
        <template v-slot:top-right>
          <div>
            <q-fab
              color="teal-4"
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
                @click="expiredFilter = 'Utensil'"
                label="Utensil"
              />
              <q-fab-action
                color="white"
                text-color="black"
                @click="expiredFilter = 'Ingredient'"
                label="Ingredient"
              />
              <q-fab-action
                color="white"
                text-color="black"
                @click="expiredFilter = 'Equipment'"
                label="Equipment"
              />
              <q-fab-action
                color="white"
                text-color="black"
                @click="expiredFilter = ''"
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
              v-model="expiredFilter"
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
              color="teal-4"
              icon-right="archive"
              label="Export to csv"
              @click="exportTable()"
            />
          </div>
        </template>
        <template #body-cell-status="props">
          <q-td :props="props">
            <q-chip
              flat
              color="white"
              :text-color="colorManipulation(props.row.itemStatus)"
              :label="labelManipulation(props.row.itemStatus)"
            />
          </q-td>
        </template>
      </q-table>
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
    ...mapState('inventory', ['allInventory']),
    ...mapGetters('inventory', [
      'availableInventory',
      'expiredInventory',
      'usedInventory',
      'getNearExpire',
      'getLowStock',
    ]),
  },
  methods: {
    ...mapActions('inventory', ['getAllInventory']),
  },
})
export default class Expenses extends Vue {
  usedInventory!: InventoryDto[];
  allInventory!: InventoryDto[];
  getNearExpire!: InventoryDto[];
  getLowStock!: InventoryDto[];
  availableInventory!: InventoryDto[];
  expiredInventory!: InventoryDto[];
  getAllInventory!: () => Promise<void>;
  filter = '';
  expiredFilter = '';

  async mounted() {
    await this.getAllInventory();
    console.log(this.usedInventory);
  }

  columns = [
    {
      name: 'itemName',
      required: true,
      label: 'Item Name',
      align: 'left',
      field: (row: InventoryDto) => row.itemName,
      format: (val: string) => `${val}`,
      sortable: true,
    },
    {
      name: 'itemCategory',
      align: 'center',
      label: 'Category',
      field: 'itemCategory',
      sortable: true,
    },
    {
      name: 'itemQuantStatus',
      align: 'center',
      label: 'Quantity',
      field: 'itemQuantProd',
      sortable: true,
    },
    {
      name: 'itemUnitProd',
      align: 'center',
      label: 'Unit',
      field: 'itemUnitProd',
      sortable: true,
    },

    {
      name: 'status',
      align: 'center',
      label: 'Status',
      field: 'itemStatus',
    },

    {
      name: 'itemExpiryDate',
      align: 'left',
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

  expiredColumn = [
    {
      name: 'itemName',
      required: true,
      label: 'Item Name',
      align: 'left',
      field: (row: InventoryDto) => row.itemName,
      format: (val: string) => `${val}`,
      sortable: true,
    },
    {
      name: 'itemCategory',
      align: 'center',
      label: 'Category',
      field: 'itemCategory',
      sortable: true,
    },
    {
      name: 'itemQuantStatus',
      align: 'center',
      label: 'Available Quantity',
      field: (row: InventoryDto) => row.itemQuantStatus,
      sortable: true,
    },
    {
      name: 'itemUnitProd',
      align: 'center',
      label: 'Unit',
      field: 'itemUnitProd',
      sortable: true,
    },

    {
      name: 'status',
      align: 'center',
      label: 'Status',
      field: 'itemStatus',
    },

    {
      name: 'itemExpiryDate',
      align: 'left',
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

  colorManipulation(itemStatus: string) {
    if (itemStatus === 'Used') {
      return 'warning';
    }
    if (itemStatus === 'Expired') {
      return 'negative';
    }
    if (itemStatus === 'Available') {
      return 'positive';
    }
  }
  labelManipulation(itemStatus: string) {
    if (itemStatus === 'Used') {
      return 'USED';
    }
    if (itemStatus === 'Expired') {
      return 'EXPIRED';
    }
    if (itemStatus === 'Available') {
      return 'AVAILABLE';
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
