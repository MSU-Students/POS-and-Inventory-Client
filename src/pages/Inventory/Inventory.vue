<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 q-pb-lg text-bold">
      <q-icon name="inventory" color="indigo" style="font-size: 4rem" />
      Inventory
    </div>
    <div class="q-pr-md">
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
        title="Inventory List"
        :rows="availableInventory"
        :columns="columns"
        row-key="itemName"
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
              color="green"
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-btn
              label="Add Product"
              color="teal"
              dense
              flat
              icon="add"
              @click="addNewInventory = true"
            />
            <q-dialog v-model="addNewInventory" persistent>
              <q-card style="width: 800px; max-width: 100vw" class="q-pa-md">
                <q-card-section class="row">
                  <div class="text-h6">Add Product</div>
                  <q-space />
                  <q-btn
                    flat
                    round
                    dense
                    icon="close"
                    v-close-popup
                    @click="resetModel()"
                  />
                </q-card-section>

                <q-card-section>
                  <q-form @submit="onAddInventory">
                    <div class="q-py-sm q-gutter-md row">
                      <div class="col">
                        <q-input
                          outlined
                          label="Item Name"
                          color="green"
                          v-model="inputInventory.itemName"
                          lazy-rules
                          :rules="[
                            (val) =>
                              (val && val.length > 0) ||
                              'You must put the product name',
                          ]"
                        />
                      </div>
                      <div class="col">
                        <q-select
                          outlined
                          :options="categoryOpt"
                          color="green"
                          label="Category"
                          v-model="inputInventory.itemCategory"
                          transition-show="flip-up"
                          transition-hide="flip-down"
                          lazy-rules
                          :rules="[
                            (val) =>
                              (val && val.length > 0) ||
                              'You must put the product unit',
                          ]"
                        />
                      </div>
                    </div>
                    <div class="q-py-sm q-gutter-md row">
                      <div class="col">
                        <q-select
                          outlined
                          color="green"
                          v-model="inputInventory.itemUnitProd"
                          :options="unitInvOpt"
                          label="Unit"
                          transition-show="flip-up"
                          transition-hide="flip-down"
                          lazy-rules
                          :rules="[
                            (val) =>
                              (val && val.length > 0) ||
                              'You must put the product unit',
                          ]"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          outlined
                          color="green"
                          label="Quantity"
                          v-model="inputInventory.itemQuantProd"
                          type="number"
                          min="1"
                          lazy-rules
                          :rules="[
                            (val) =>
                              (val && val.length > 0) ||
                              'You must put the product unit',
                          ]"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          color="green"
                          v-model="inputInventory.itemExpiryDate"
                          outlined
                          type="date"
                          hint="Expirt Date"
                        />
                      </div>
                    </div>
                    <div align="right">
                      <q-btn
                        flat
                        label="Cancel"
                        color="red-5"
                        v-close-popup
                        @click="resetModel()"
                      />
                      <q-btn flat label="Add" color="green" type="submit" />
                    </div>
                  </q-form>
                </q-card-section>
              </q-card>
            </q-dialog>
          </div>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn
                round
                color="secondary"
                icon="edit"
                size="sm"
                flat
                dense
                @click="openEditDialog(props.row)"
              />
              <q-dialog v-model="editRowInventory" persistent>
                <q-card style="width: 800px; max-width: 100vw" class="q-pa-md">
                  <q-card-section class="row">
                    <div class="text-h6">Edit Product</div>
                    <q-space />
                    <q-btn
                      flat
                      round
                      dense
                      icon="close"
                      v-close-popup
                      @click="resetModel()"
                    />
                  </q-card-section>

                  <q-card-section>
                    <q-form @submit="onEditInventory()">
                      <div class="q-py-sm q-gutter-md row">
                        <div class="col">
                          <q-input
                            outlined
                            label="Item Name"
                            color="green"
                            v-model="inputInventory.itemName"
                          />
                        </div>
                        <div class="col">
                          <q-select
                            outlined
                            :options="categoryOpt"
                            color="green"
                            label="Category"
                            v-model="inputInventory.itemCategory"
                            transition-show="flip-up"
                            transition-hide="flip-down"
                          />
                        </div>
                      </div>
                      <div class="q-py-sm q-gutter-md row">
                        <div class="col">
                          <q-select
                            outlined
                            color="green"
                            v-model="inputInventory.itemUnitProd"
                            :options="unitInvOpt"
                            label="Unit"
                            transition-show="flip-up"
                            transition-hide="flip-down"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            outlined
                            color="green"
                            label="Quantity"
                            v-model="inputInventory.itemQuantProd"
                            type="number"
                            min="0"
                            hint="Note: You can only change the quantity if you put wrong input"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            color="green"
                            v-model="inputInventory.itemExpiryDate"
                            outlined
                            type="date"
                            hint="Expirt Date"
                          />
                        </div>
                      </div>
                      <div align="right">
                        <q-btn
                          flat
                          label="Cancel"
                          color="red-5"
                          v-close-popup
                          @click="resetModel()"
                        />
                        <q-btn flat label="Save" color="green" type="submit" />
                      </div>
                    </q-form>
                  </q-card-section>
                </q-card>
              </q-dialog>
              <q-btn
                color="red-5"
                icon="delete"
                size="sm"
                class="q-ml-sm"
                flat
                round
                dense
                @click="deleteSpecificInventory(props.row)"
              />
              <q-btn
                round
                color="secondary"
                icon="done_all"
                size="sm"
                flat
                dense
                @click="openStatusDialog(props.row)"
              />
              <q-dialog v-model="statusInventory">
                <q-card style="width: 400px; max-width: 100vw" class="q-ma-md">
                  <q-card-section class="row">
                    <div class="text-h6">Edit Product Status</div>
                    <q-space />
                    <q-btn
                      flat
                      round
                      dense
                      icon="close"
                      v-close-popup
                      @click="resetModel()"
                    />
                  </q-card-section>
                  <q-card-section>
                    <q-form @submit="onEditStatusInventory()">
                      <div class="q-pb-md">
                        <q-input
                          outlined
                          color="green"
                          label="Quantity"
                          v-model="inputInventory.itemQuantStatus"
                          :rules="[
                            (val) =>
                              (val &&
                                val.itemQuantStatus <
                                  inputInventory.itemQuantStatus) ||
                              'Please input amount',
                            limit,
                          ]"
                        />
                      </div>
                      <div align="right">
                        <q-btn
                          flat
                          label="Cancel"
                          color="red-5"
                          v-close-popup
                          @click="resetModel()"
                        />
                        <q-btn flat label="Save" color="green" type="submit" />
                      </div>
                    </q-form>
                  </q-card-section>
                </q-card>
              </q-dialog>
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapActions, mapGetters, mapState } from 'vuex';
import { InventoryDto } from 'src/services/rest-api';
import { date, exportFile } from 'quasar';

const timeStamp = Date.now();
const curentDate = date.formatDate(timeStamp, 'YYYY-MM-DD:HH:mm');

@Options({
  computed: {
    ...mapGetters('inventory', ['availableInventory']),
    ...mapState('inventory', ['allInventory']),
  },
  methods: {
    ...mapActions('inventory', [
      'addInventory',
      'editInventory',
      'deleteInventory',
      'getAllInventory',
      'getByItemName',
      'editInventoryStatus',
    ]),
  },
})
export default class Inventory extends Vue {
  allInventory!: InventoryDto[];
  availableInventory!: InventoryDto[];
  addInventory!: (payload: InventoryDto) => Promise<void>;
  editInventory!: (payload: InventoryDto) => Promise<void>;
  deleteInventory!: (payload: InventoryDto) => Promise<void>;
  getAllInventory!: () => Promise<void>;
  getByItemName!: () => Promise<void>;
  editInventoryStatus!: () => Promise<void>;

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
      field: 'itemQuantStatus',
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
      name: 'itemConsumeAt',
      align: 'center',
      label: 'Recent Consume',
      field: 'itemConsumeAt',
    },

    {
      name: 'itemExpiryDate',
      align: 'center',
      label: 'Expiry Date',
      field: 'itemExpiryDate',
    },

    {
      name: 'itemDateCreated',
      align: 'center',
      label: 'Date Stock In',
      field: 'itemDateCreated',
    },

    {
      name: 'action',
      align: 'center',
      label: 'Action',
      field: 'action',
    },
  ];

  prodIssue = false;
  addNewInventory = false;
  editRowInventory = false;
  statusInventory = false;
  filter = '';
  unitInvOpt = [
    'Piece (pcs)',
    'Pack (pks)',
    'Sack',
    'Kilogram (kg)',
    'Miligram (ml)',
    'Other',
  ];
  categoryOpt = ['Utensil', 'Ingredient', 'Equipments', 'Miscellaneous/Other'];

  inputInventory: InventoryDto = {
    itemName: '',
    itemUnitProd: '',
    itemExpiryDate: '',
    itemDateCreated: curentDate,
    itemCategory: '',
    itemStatus: 'Available',
    itemConsumeAt: '',
    itemQuantStatus: 0,
  };

  async onAddInventory() {
    const newInputInventory: any = {
      ...this.inputInventory,
      itemQuantStatus: this.inputInventory.itemQuantProd,
    };
    await this.addInventory(newInputInventory);
    this.addNewInventory = false;
    this.statusInventory = false;
    this.resetModel();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Adeded.',
    });
  }

  async onEditInventory() {
    const newInputInventory: any = {
      ...this.inputInventory,
      itemQuantStatus: this.inputInventory.itemQuantProd,
    };
    await this.editInventory(newInputInventory);
    this.editRowInventory = false;
    this.statusInventory = false;
    this.resetModel();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Edit.',
    });
  }

  async onEditStatusInventory() {
    const newInputInventory = {
      ...this.inputInventory,
      itemConsumeAt: curentDate,
    };
    await this.editInventory(newInputInventory);
    await this.editInventoryStatus();
    this.editRowInventory = false;
    this.statusInventory = false;
    this.resetModel();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Edit.',
    });
  }

  deleteSpecificInventory(val: InventoryDto) {
    this.$q
      .dialog({
        message: 'Confirm to delete?',
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteInventory(val.itemCode as any);
        this.$q.notify({
          type: 'warning',
          message: 'Successfully deleted',
        });
      });
  }

  openEditDialog(val: InventoryDto) {
    this.editRowInventory = true;
    this.inputInventory = { ...val };
  }

  openStatusDialog(val: InventoryDto) {
    this.statusInventory = true;
    this.inputInventory = { ...val };
  }

  resetModel() {
    this.inputInventory = {
      itemName: '',
      itemUnitProd: '',
      itemExpiryDate: '',
      itemDateCreated: curentDate,
      itemCategory: '',
      itemStatus: 'Available',
      itemConsumeAt: '',
      itemQuantStatus: 0,
    };
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
      this.wrapCsvValue('Recent Consume'),
      this.wrapCsvValue('Expiry Date'),
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
          this.wrapCsvValue(String(c.itemConsumeAt)),
          this.wrapCsvValue(String(c.itemExpiryDate)),
          this.wrapCsvValue(String(c.itemDateCreated)),
        ].join(',')
      )
    );

    const status = exportFile(
      'InventoryList-export.csv',
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

  limit() {
    if (this.inputInventory.itemQuantStatus >= 24) {
      return 'Exceeded!';
    }
  }
}
</script>
