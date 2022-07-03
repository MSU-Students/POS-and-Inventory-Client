<template>
  <q-page class="q-pa-lg bg-grey-1">
    <div class="text-h4 text-teal-4 q-pb-lg q-pt-md text-bold flex flex-center">
      <q-icon
        class="bi bi-box-seam q-pr-sm"
        color="teal-4"
        style="font-size: 3rem"
      />
      Inventory
    </div>

    <div class="q-pt-xl">
      <div class="row q-col-gutter-lg q-px-md">
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-card>
            <q-card-section
              :class="$q.dark.isActive ? 'teal_dark' : 'bg-teal-4'"
              class="text-white"
            >
              <div class="row">
                <div class="col-10">
                  <div class="text-h6">Total Available Item</div>
                  <div class="text-h5">{{ availableInventory.length }}</div>
                </div>
                <div class="col-2">
                  <q-icon size="62px" name="auto_stories" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-card>
            <q-card-section
              :class="$q.dark.isActive ? 'red_dark' : 'bg-teal-4'"
              class="text-white"
            >
              <div class="row">
                <div class="col-10">
                  <div class="text-h6">Total Low Item Stock</div>
                  <div class="text-h5">{{ getLowStock.length }}</div>
                </div>
                <div class="col-2">
                  <q-icon size="60px" class="bi bi-box-arrow-in-down" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-card>
            <q-card-section
              :class="$q.dark.isActive ? 'red_dark' : 'bg-teal-4'"
              class="text-white"
            >
              <div class="row">
                <div class="col-10">
                  <div class="text-h6">Near Expiry</div>
                  <div class="text-h5">{{ getNearExpire.length }}</div>
                </div>
                <div class="col-2" align="right">
                  <q-icon size="45px" class="bi bi-calendar-week-fill" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="q-mt-lg">
        <div class="q-gutter-sm q-pa-sm row">
          <q-space />
          <q-btn
            color="teal-4"
            icon-right="archive"
            label="Export to csv"
            @click="exportTable()"
          />
        </div>
      </div>
      <q-table
        title="Inventory List"
        :rows="availableInventory"
        table-header-class="bg-teal-4 text-white"
        :columns="columns"
        row-key="itemName"
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
              color="teal-3"
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-btn
              label="Add Item"
              color="teal-4"
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
                          autofocus
                          outlined
                          label="Item Name"
                          color="teal-3"
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
                          color="teal-3"
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
                          color="teal-3"
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
                          color="teal-3"
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
                          color="teal-3"
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
                      <q-btn flat label="Add" color="teal-4" type="submit" />
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
                color="teal-4"
                icon="edit"
                size="sm"
                flat
                dense
                @click="openEditDialog(props.row)"
              />
              <q-dialog v-model="editRowInventory" persistent>
                <q-card style="width: 800px; max-width: 100vw" class="q-pa-md">
                  <q-card-section class="row">
                    <div class="text-h6">Edit Item</div>
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
                            autofocus
                            outlined
                            label="Item Name"
                            color="teal-3"
                            v-model="inputInventory.itemName"
                          />
                        </div>
                        <div class="col">
                          <q-select
                            outlined
                            :options="categoryOpt"
                            color="teal-3"
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
                            color="teal-3"
                            v-model="inputInventory.itemUnitProd"
                            :options="unitInvOpt"
                            label="Unit"
                            transition-show="flip-up"
                            transition-hide="flip-down"
                          />
                        </div>
                        <div class="col">
                          <div v-if="removeRestriction">
                            <q-input
                              outlined
                              color="teal-3"
                              label="Quantity"
                              v-model="inputInventory.itemQuantProd"
                              type="number"
                              min="0"
                              hint="Note: You can only change the quantity if you put wrong input"
                            />
                          </div>
                          <div v-else>
                            <q-input
                              outlined
                              readonly
                              color="teal-3"
                              label="Quantity"
                              v-model="inputInventory.itemQuantProd"
                              type="number"
                              min="0"
                              hint="Note: You can only change the quantity if you put wrong input"
                            />
                          </div>
                        </div>
                        <div class="col">
                          <q-input
                            color="teal-3"
                            v-model="inputInventory.itemExpiryDate"
                            outlined
                            type="date"
                            hint="Expirt Date"
                          />
                        </div>
                      </div>
                      <div class="q-pt-lg" align="right">
                        <q-btn
                          flat
                          color="teal-4"
                          @click="showMessage()"
                          label="Edit Quantity"
                        />
                        <q-btn
                          flat
                          label="Cancel"
                          color="red-5"
                          v-close-popup
                          @click="resetModel()"
                        />
                        <q-btn flat label="Save" color="teal-4" type="submit" />
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
                color="teal-4"
                icon="done_all"
                size="sm"
                flat
                dense
                @click="openStatusDialog(props.row)"
              />
              <q-dialog v-model="statusInventory">
                <q-card style="width: 400px; max-width: 100vw" class="q-ma-md">
                  <q-card-section class="row">
                    <div class="text-h6 text-teal-5">Edit Product Status</div>
                    <q-space />
                    <q-btn
                      flat
                      color="red-5"
                      round
                      dense
                      icon="close"
                      v-close-popup
                      @click="resetModel()"
                    />
                  </q-card-section>
                  <q-card-section class="text-h6 flex flex-center text-teal-4">
                    Available Quantity:
                    <q-chip
                      :label="inputInventory.itemQuantStatus"
                      color="teal-4"
                      text-color="white"
                    />
                  </q-card-section>
                  <q-card-section>
                    <q-form @submit="onEditStatusInventory()">
                      <div class="q-pb-md">
                        <q-input
                          autofocus
                          outlined
                          color="teal-3"
                          label="Enter Quantity Used"
                          v-model="editQuantity"
                          :rules="[
                            (val, prev) =>
                              (val && isExceeded(val, oldInventoryValue)) ||
                              'You exceeded the value',
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
                        <q-btn flat label="Save" color="teal-4" type="submit" />
                      </div>
                    </q-form>
                  </q-card-section>
                </q-card>
              </q-dialog>
            </div>
          </q-td>
        </template>
      </q-table>
      <div class="q-py-lg row q-gutter-md">
        <div class="col">
          <q-card style="height: 300px">
            <q-layout container style="height: 300px">
              <q-list bordered class="rounded-borders">
                <q-item-label header class="text-teal-4 text-h6">
                  <q-icon
                    class="bi bi-cart-x-fill"
                    color="teal-4"
                    size="30px"
                  />
                  Low Stock Item
                </q-item-label>

                <q-item v-for="data in getLowStock" v-bind:key="data.itemName">
                  <q-item-section top>
                    {{ data.itemName }}
                  </q-item-section>

                  <q-item-section class="flex flex-center" top>
                    <q-item-label caption> Product Category </q-item-label>
                    <strong> {{ data.itemCategory }} </strong>
                  </q-item-section>

                  <q-item-section class="flex flex-center" top>
                    <q-item-label caption> Available Product </q-item-label>
                    <strong class="text-red-5">
                      {{ data.itemQuantStatus }}
                    </strong>
                  </q-item-section>

                  <q-item-section class="flex flex-center" top side>
                    <q-item-label caption> Date Stock-In </q-item-label>
                    {{ data.itemDateCreated }}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-layout>
          </q-card>
        </div>
        <div class="col">
          <q-card style="height: 300px">
            <q-layout container style="height: 300px">
              <q-list bordered class="rounded-borders">
                <q-item-label header class="text-teal-4 text-h6">
                  <q-icon
                    class="bi bi-calendar-week-fill"
                    color="teal-4"
                    size="30px"
                  />
                  Expiry Item
                </q-item-label>

                <q-item
                  v-for="data in getNearExpire"
                  v-bind:key="data.itemName"
                >
                  <q-item-section top>
                    <q-item-label class="text-overline">
                      {{ data.itemName }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section class="flex flex-center" top>
                    <q-item-label caption> Product Category </q-item-label>
                    <strong> {{ data.itemCategory }} </strong>
                  </q-item-section>

                  <q-item-section class="flex flex-center" top>
                    <q-item-label caption> Expiry Date </q-item-label>
                    <strong class="text-red-5">
                      {{ data.itemExpiryDate }}
                    </strong>
                  </q-item-section>

                  <q-item-section class="flex flex-center" top side>
                    <q-item-label caption> Date Stock-In </q-item-label>
                    {{ data.itemDateCreated }}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-layout>
          </q-card>
        </div>
      </div>
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
    ...mapGetters('inventory', [
      'availableInventory',
      'getNearExpire',
      'getLowStock',
    ]),
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
      'getExpiry',
    ]),
  },
})
export default class Inventory extends Vue {
  allInventory!: InventoryDto[];
  availableInventory!: InventoryDto[];
  getNearExpire!: InventoryDto[];
  getLowStock!: InventoryDto[];
  addInventory!: (payload: InventoryDto) => Promise<void>;
  editInventory!: (payload: InventoryDto) => Promise<void>;
  deleteInventory!: (payload: InventoryDto) => Promise<void>;
  getAllInventory!: () => Promise<void>;
  getByItemName!: () => Promise<void>;
  editInventoryStatus!: () => Promise<void>;
  getExpiry!: () => Promise<void>;
  editQuantity = '';

  async mounted() {
    await this.getAllInventory();
    await this.getExpiry();
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
      field: 'itemQuantStatus',
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
      name: 'itemStatus',
      align: 'center',
      label: 'Status',
      field: 'itemStatus',
      sortable: true,
    },
    {
      name: 'itemConsumeAt',
      align: 'center',
      label: 'Recent Consume',
      field: 'itemConsumeAt',
      sortable: true,
    },

    {
      name: 'itemExpiryDate',
      align: 'center',
      label: 'Expiry Date',
      field: 'itemExpiryDate',
      sortable: true,
    },

    {
      name: 'itemDateCreated',
      align: 'center',
      label: 'Date Stock In',
      field: 'itemDateCreated',
      sortable: true,
    },

    {
      name: 'action',
      align: 'center',
      label: 'Action',
      field: 'action',
    },
  ];

  removeRestriction = false;
  prodIssue = false;
  addNewInventory = false;
  editRowInventory = false;
  statusInventory = false;
  oldInventoryValue = 0;
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
    itemQuantProd: 0,
  };
  isExceeded(val: number | string, on: number | string) {
    return Number(val) <= Number(on);
  }
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
      itemQuantStatus:
        this.inputInventory.itemQuantStatus - Number(this.editQuantity),
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
        color: 'teal-4',
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteInventory(val.itemCode as any);
        this.$q.notify({
          type: 'teal-4',
          message: 'Successfully deleted',
        });
      });
  }

  showMessage() {
    this.$q
      .dialog({
        message: 'Confirm to Edit, This only for correcting wrong quantity!! ',
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        this.removeRestriction = true;
        this.$q.notify({
          type: 'teal-4',
          message: 'Succesfully remove restriction',
        });
      });
  }

  openEditDialog(val: InventoryDto) {
    this.editRowInventory = true;
    this.inputInventory = { ...val };
  }

  openStatusDialog(val: InventoryDto) {
    this.oldInventoryValue = val.itemQuantStatus;
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
      itemQuantProd: 0,
    };
    this.removeRestriction = false;
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
        icon: 'teal-4',
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
