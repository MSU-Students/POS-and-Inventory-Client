<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 q-pb-lg text-bold">
      <q-icon name="inventory" color="indigo" style="font-size: 4rem" />
      Inventory
    </div>
    <div class="q-pr-md">
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
              color="primary"
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
                        color="red-10"
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
                color="blue"
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
                          color="red-10"
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
                color="red-10"
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
                          type="number"
                          min="0"
                        />
                        <q-list>
                          <q-item tag="label" v-ripple>
                            <q-item-section>
                              <q-item-label>Product Availability</q-item-label>
                            </q-item-section>
                            <q-item-section avatar>
                              <q-toggle
                                color="blue"
                                v-model="inputInventory.itemStatus"
                                false-value="Used"
                                true-value="Available"
                              />
                            </q-item-section> </q-item
                        ></q-list>
                      </div>
                      <div align="right">
                        <q-btn
                          flat
                          label="Cancel"
                          color="red-10"
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
import { mapActions, mapGetters } from 'vuex';
import { InventoryDto } from 'src/services/rest-api';
import { date } from 'quasar';

const timeStamp = Date.now();
const curentDate = date.formatDate(timeStamp, 'YYYY-MM-DD:HH:mm');

@Options({
  computed: {
    ...mapGetters('inventory', ['availableInventory']),
  },
  methods: {
    ...mapActions('inventory', [
      'addInventory',
      'editInventory',
      'deleteInventory',
      'getAllInventory',
      'getByItemName',
    ]),
  },
})
export default class Inventory extends Vue {
  availableInventory!: InventoryDto[];
  addInventory!: (payload: InventoryDto) => Promise<void>;
  editInventory!: (payload: InventoryDto) => Promise<void>;
  deleteInventory!: (payload: InventoryDto) => Promise<void>;
  getAllInventory!: () => Promise<void>;
  getByItemName!: () => Promise<void>;

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
  };

  async onAddInventory() {
    const newInputInventory = {
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
    const newInputInventory = {
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
    };
  }
}
</script>
