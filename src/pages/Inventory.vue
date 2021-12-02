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
          :rows="inventory"
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
                    direction="down"
                    label="Filter by:"
                    label-position="top"
                    external-label
                    padding="xs"
                  >
                    <div class="q-gutter-md">
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
                    </div>
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
                @click="addProd = true"
              />
              <q-dialog v-model="addProd" persistent>
                <q-card style="width: 800px; max-width: 100vw" class="q-pa-md">
                  <q-card-section class="row">
                    <div class="text-h6">Add Product</div>
                    <q-space />
                    <q-btn flat round dense icon="close" v-close-popup />
                  </q-card-section>

                  <q-card-section class="q-gutter-md row">
                    <div class="col">
                      <q-input outlined label="Product Code" />
                    </div>
                    <div class="col">
                      <q-input outlined label="Name" />
                    </div>
                  </q-card-section>
                  <q-card-section class="q-gutter-md row">
                    <div class="col">
                      <q-select
                        outlined
                        v-model="catInv"
                        :options="catInvOpt"
                        label="Category"
                      />
                    </div>
                    <div class="col">
                      <q-select
                        outlined
                        v-model="unitInv"
                        :options="unitInvOpt"
                        label="Unit"
                      />
                    </div>
                    <div class="col">
                      <q-input outlined label="Quantity" />
                    </div>
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="red-10" v-close-popup />
                    <q-btn flat label="Add" color="primary" v-close-popup />
                  </q-card-actions>
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
                  @click="editProd = true"
                />
                <q-dialog v-model="editProd" persistent>
                  <q-card
                    style="width: 800px; max-width: 100vw"
                    class="q-pa-md"
                  >
                    <q-card-section class="row">
                      <div class="text-h6">Add Product</div>
                      <q-space />
                      <q-btn flat round dense icon="close" v-close-popup />
                    </q-card-section>

                    <q-card-section class="q-gutter-md row">
                      <div class="col">
                        <q-input outlined label="Product Code" />
                      </div>
                      <div class="col">
                        <q-input outlined label="Name" />
                      </div>
                    </q-card-section>
                    <q-card-section class="q-gutter-md row">
                      <div class="col">
                        <q-select
                          outlined
                          v-model="catInv"
                          :options="catInvOpt"
                          label="Category"
                        />
                      </div>
                      <div class="col">
                        <q-select
                          outlined
                          v-model="unitInv"
                          :options="unitInvOpt"
                          label="Unit"
                        />
                      </div>
                      <div class="col">
                        <q-input outlined label="Quantity" />
                      </div>
                    </q-card-section>

                    <q-card-actions align="right">
                      <q-btn flat label="Cancel" color="red-10" v-close-popup />
                      <q-btn flat label="Save" color="primary" v-close-popup />
                    </q-card-actions>
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
                  @click="delProd = true"
                />
                <q-dialog v-model="delProd" persistent>
                  <q-card style="width: 300px">
                    <q-card-section class="row items-center">
                      <q-avatar
                        size="sm"
                        icon="warning"
                        color="red-10"
                        text-color="white"
                      />
                      <span class="q-ml-sm">Confirm Delete?</span>
                    </q-card-section>
                    <q-card-actions align="right">
                      <q-btn
                        flat
                        label="Cancel"
                        color="primary"
                        v-close-popup="cancelEnabled"
                        :disable="!cancelEnabled"
                      />
                      <q-btn
                        flat
                        label="Confirm"
                        color="primary"
                        v-close-popup
                      />
                    </q-card-actions>
                  </q-card>
                </q-dialog>
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
import { InventoryInfo } from 'src/store/inventory/state';
import { mapState } from 'vuex';

@Options({
  computed: {
    ...mapState('inventory', ['inventory', 'activeInventory']),
  },
})
export default class Expenses extends Vue {
  inventory!: InventoryInfo[];

  columns = [
    {
      name: 'itemCode',
      required: true,
      label: 'Item Code',
      align: 'left',
      field: (row: InventoryInfo) => row.itemCode,
      format: (val: string) => `${val}`,
    },
    {
      name: 'itemName',
      align: 'center',
      label: 'Item Name',
      field: 'itemName',
    },

    {
      name: 'quantProd',
      align: 'center',
      label: 'Quantity',
      field: 'quantProd',
    },
    {
      name: 'unitProd',
      align: 'center',
      label: 'Unit',
      field: 'unitProd',
    },
    {
      name: 'catProd',
      align: 'center',
      label: 'Category',
      field: 'catProd',
    },
    {
      name: 'ExpiryDate',
      align: 'center',
      label: 'Expiry Date',
      field: 'ExpiryDate',
    },

    {
      name: 'dateProd',
      align: 'center',
      label: 'Date Stock In',
      field: 'dateProd',
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
  addProd = false;
  editProd = false;
  delProd = false;
  cancelEnabled = true;
  filter = '';
  catInv = '';
  unitInv = '';
  catInvOpt = [''];

  defaultInventory: InventoryInfo = {
    itemCode: '',
    itemName: '',
    quantProd: '',
    unitProd: '',
    catProd: '',
    ExpiryDate: '',
    dateProd: '',
  };
  presentInventory = { ...this.defaultInventory };
  unitInvOpt = ['Piece (pcs)', 'Pack (pks)', 'Kilogram (kg)'];
}
</script>
