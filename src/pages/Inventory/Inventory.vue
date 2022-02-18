<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 q-pb-lg text-bold">
      <q-icon name="inventory" color="indigo" style="font-size: 4rem" />
      Inventory
    </div>
    <div class="row">
      <div class="q-pr-md col-10">
        <q-table
          title="Inventory List"
          :rows="allInventory"
          :columns="columns"
          row-key="itemCode"
          :rows-per-page-options="[0]"
          :filter="filter"
          selection="multiple"
          v-model:selected="selected"
        >
          <template v-slot:top-right>
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
                      color="teal-12"
                      text-color="black"
                      @click="filter = 'utensil'"
                      label="utensil"
                    />
                    <q-fab-action
                      color="teal-12"
                      text-color="black"
                      @click="filter = 'Ingredient'"
                      label="Ingredient"
                    />
                    <q-fab-action
                      color="teal-12"
                      text-color="black"
                      @click="filter = 'Equipment'"
                      label="Equipment"
                    />
                    <q-fab-action
                      color="teal-12"
                      text-color="black"
                      @click="filter = ''"
                      icon="clear"
                    />
                  </q-fab>
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
                            label="Product Code"
                            v-model="inputInventory.itemCode"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            outlined
                            label="Name"
                            v-model="inputInventory.itemName"
                          />
                        </div>
                      </div>
                      <div class="q-py-sm q-gutter-md row">
                        <div class="col">
                          <q-select
                            outlined
                            v-model="inputInventory.itemCategory"
                            :options="catInvOpt"
                            label="Category"
                          />
                        </div>
                        <div class="col">
                          <q-select
                            outlined
                            v-model="inputInventory.itemUnitProd"
                            :options="unitInvOpt"
                            label="Unit"
                          />
                        </div>
                        <div class="col">
                          <q-input
                            outlined
                            label="Quantity"
                            v-model="inputInventory.itemQuantProd"
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
                        <q-btn flat label="Add" color="primary" type="submit" />
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
                  <q-card
                    style="width: 800px; max-width: 100vw"
                    class="q-pa-md"
                  >
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
                      <q-form @submit="onEditInventory">
                        <div class="q-py-sm q-gutter-md row">
                          <div class="col">
                            <q-input
                              outlined
                              label="Product Code"
                              v-model="inputInventory.itemCode"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              outlined
                              label="Name"
                              v-model="inputInventory.itemName"
                            />
                          </div>
                        </div>
                        <div class="q-py-sm q-gutter-md row">
                          <div class="col">
                            <q-select
                              outlined
                              v-model="inputInventory.itemCategory"
                              :options="catInvOpt"
                              label="Category"
                            />
                          </div>
                          <div class="col">
                            <q-select
                              outlined
                              v-model="inputInventory.itemUnitProd"
                              :options="unitInvOpt"
                              label="Unit"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              outlined
                              label="Quantity"
                              v-model="inputInventory.itemQuantProd"
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
                          <q-btn
                            flat
                            label="Add"
                            color="primary"
                            type="submit"
                          />
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
              </div>
            </q-td>
          </template>
        </q-table>
      </div>
      <div class="col">
        <q-card flat bordered class="my-card">
          <q-card-section>
            <div class="text-h5">Overview</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-h7">Total Products</div>
            <div class="text-subtitle2">4</div>
          </q-card-section>

          <q-separator inset />

          <q-card-section class="q-pt-none">
            <div class="text-h7">Product Issues</div>
            <div
              class="text-subtitle2 text-red-10"
              @mouseenter="prodIssue = true"
              @mouseleave="prodIssue = false"
            >
              1
            </div>
            <q-popup-proxy
              v-model="prodIssue"
              transition-show="flip-up"
              transition-hide="flip-down"
            >
              <q-banner>
                <div class="text-h7">Item name: Black pearls</div>
                <div class="text-subtitle2 text-red-10">
                  Expiry Date: 9/18/2021
                </div>
              </q-banner>
            </q-popup-proxy>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { iInventoryInfo } from '../../store/inventory/state';
import { mapState, mapActions } from 'vuex';

@Options({
  computed: {
    ...mapState('inventory', ['allInventory']),
  },
  methods: {
    ...mapActions('inventory', [
      'addInventory',
      'editInventory',
      'deleteInventory',
    ]),
  },
})
export default class Expenses extends Vue {
  allInventory!: iInventoryInfo[];
  addInventory!: (payload: iInventoryInfo) => Promise<void>;
  editInventory!: (payload: iInventoryInfo) => Promise<void>;
  deleteInventory!: (payload: iInventoryInfo) => Promise<void>;

  columns = [
    {
      name: 'itemCode',
      required: true,
      label: 'Item Code',
      align: 'left',
      field: (row: iInventoryInfo) => row.itemCode,
      format: (val: string) => `${val}`,
    },
    {
      name: 'itemName',
      align: 'center',
      label: 'Item Name',
      field: 'itemName',
    },

    {
      name: 'itemQuantProd',
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
      name: 'itemCategory',
      align: 'center',
      label: 'Category',
      field: 'itemCategory',
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
  selected = [];
  addNewInventory = false;
  editRowInventory = false;
  filter = '';
  catInv = '';
  unitInv = '';
  catInvOpt = [''];
  unitInvOpt = ['Piece (pcs)', 'Pack (pks)', 'Kilogram (kg)'];

  inputInventory: iInventoryInfo = {
    itemCode: '',
    itemName: '',
    itemQuantProd: '',
    itemUnitProd: '',
    itemCategory: '',
    itemExpiryDate: '',
    itemDateCreated: '',
  };

  async onAddInventory() {
    await this.addInventory(this.inputInventory);
    this.addNewInventory = false;
    this.resetModel();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Adeded.',
    });
  }

  async onEditInventory() {
    await this.editInventory(this.inputInventory);
    this.editRowInventory = false;
    this.resetModel();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Edit.',
    });
  }

  deleteSpecificInventory(val: iInventoryInfo) {
    this.$q
      .dialog({
        message: 'Confirm to delete?',
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteInventory(val);
        this.$q.notify({
          type: 'warning',
          message: 'Successfully deleted',
        });
      });
  }

  openEditDialog(val: iInventoryInfo) {
    this.editRowInventory = true;
    this.inputInventory = { ...val };
  }

  resetModel() {
    this.inputInventory = {
      itemCode: '',
      itemName: '',
      itemQuantProd: '',
      itemUnitProd: '',
      itemCategory: '',
      itemExpiryDate: '',
      itemDateCreated: '',
    };
  }
}
</script>
