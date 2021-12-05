<template>
  <q-page class="q-pa-lg">
    <div class="q-pb-xl text-h4 text-bold">
      <q-icon name="menu_book" color="amber" style="font-size: 4rem" />
      Manage Products
    </div>
    <q-table
      title="Menu products"
      :rows="managePOS"
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[0]"
      :filter="filter"
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
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn
            size="13px"
            label="Add Product"
            color="primary"
            dense
            flat
            icon="add"
            @click="addProd = true"
          />
          <q-dialog v-model="addProd" persistent>
            <q-card style="width: 600px; max-width: 35vw">
              <q-card-section class="row">
                <div class="text-h6">Add Product</div>
                <q-space />
                <q-btn flat round dense icon="close" v-close-popup />
              </q-card-section>

              <q-card-section>
                <div class="row q-gutter-md">
                  <div class="col">
                    <q-input
                      class="q-py-md"
                      outlined
                      v-model="Name"
                      label="Product Name"
                    >
                      <template v-slot:prepend>
                        <q-icon name="drive_file_rename_outline" />
                      </template>
                    </q-input>
                  </div>
                  <div class="col">
                    <q-file
                      class="q-py-md"
                      outlined
                      v-model="Name"
                      label="Product Name"
                      accept=".jpg, image/*"
                    >
                      <template v-slot:prepend>
                        <q-icon name="drive_file_rename_outline" />
                      </template>
                    </q-file>
                  </div>
                </div>
                <div class="row q-gutter-md">
                  <div class="col">
                    <q-select
                      class="q-py-md"
                      outlined
                      :options="categoryType"
                      v-model="category"
                      label="Category"
                    >
                      <template v-slot:prepend>
                        <q-icon name="category" />
                      </template>
                    </q-select>
                  </div>
                  <div class="col">
                    <q-input
                      class="q-py-md"
                      outlined
                      label="Amount"
                      mask="#.##"
                      fill-mask="0"
                      reverse-fill-mask
                    >
                      <template v-slot:prepend> ₱ </template>
                    </q-input>
                  </div>
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="red-10" v-close-popup />
                <q-btn flat label="Save" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </template>
      <template v-slot:body-cell-Actions="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn
              round
              color="blue"
              icon="edit"
              size="sm"
              flat
              dense
              @click="editRow = true"
            />
            <q-dialog v-model="editRow" persistent>
              <q-card style="width: 900px; max-width: 35vw">
                <q-card-section class="row">
                  <div class="text-h6">Edit Product</div>
                  <q-space />
                  <q-btn flat round dense icon="close" v-close-popup />
                </q-card-section>
                <q-card-section>
                  <div class="row q-gutter-md">
                    <div class="col">
                      <q-input
                        class="q-py-md"
                        outlined
                        v-model="Name"
                        label="Product Name"
                      >
                        <template v-slot:prepend>
                          <q-icon name="drive_file_rename_outline" />
                        </template>
                      </q-input>
                    </div>
                    <div class="col">
                      <q-file
                        class="q-py-md"
                        outlined
                        v-model="Name"
                        label="Product Name"
                        accept=".jpg, image/*"
                      >
                        <template v-slot:prepend>
                          <q-icon name="drive_file_rename_outline" />
                        </template>
                      </q-file>
                    </div>
                  </div>
                  <div class="row q-gutter-md">
                    <div class="col">
                      <q-select
                        class="q-py-md"
                        outlined
                        :options="categoryType"
                        v-model="category"
                        label="Category"
                      >
                        <template v-slot:prepend>
                          <q-icon name="category" />
                        </template>
                      </q-select>
                    </div>
                    <div class="col">
                      <q-input
                        class="q-py-md"
                        outlined
                        label="Amount"
                        mask="#.##"
                        fill-mask="0"
                        reverse-fill-mask
                      >
                        <template v-slot:prepend> ₱ </template>
                      </q-input>
                    </div>
                  </div>
                  <q-item tag="label" v-ripple>
                    <q-item-section>
                      <q-item-label>Availability</q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                      <q-toggle
                        :label="availability"
                        class="q-py-md"
                        outlined
                        size="lg"
                        color="pink"
                        false-value="NO"
                        true-value="YES"
                        v-model="availability"
                      />
                    </q-item-section>
                  </q-item>
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
              @click="ConfirmDelete = true"
            />
            <q-dialog v-model="ConfirmDelete" persistent>
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
                  <q-btn flat label="Confirm" color="primary" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { ManagePOSInfo } from 'src/store/managePOS/state';
import { mapState } from 'vuex';

@Options({
  computed: {
    ...mapState('managePOS', ['managePOS', 'activeManagePOS']),
  },
})
export default class ManageAccount extends Vue {
  managePOS!: ManagePOSInfo[];
  columns = [
    {
      name: 'product_ID',
      required: true,
      label: 'Product Number',
      align: 'left',
      field: (row: ManagePOSInfo) => row.product_ID,
      format: (val: string) => `${val}`,
    },
    {
      name: 'name',
      align: 'center',
      label: 'Product Name',
      field: 'name',
    },
    {
      name: 'productPrice',
      align: 'center',
      label: 'Price',
      field: 'productPrice',
    },
    {
      name: 'Category',
      align: 'center',
      label: 'Category',
      field: 'Category',
    },
    {
      name: 'Availability',
      align: 'center',
      label: 'Product Availability ',
      field: 'Availability',
    },
    {
      name: 'Actions',
      align: 'center',
      label: 'Actions',
      field: 'Actions',
    },
  ];
  Name = '';
  price = '';
  categoryType = ['Beverage/Drinks', 'Food', 'Add-ons', 'Appetizer'];
  category = '';
  addProd = false;
  availability = 'Availability Option';
  filter = '';
  files = '';
  cancelEnabled = true;
  addUser = false;
  editRow = false;
  ConfirmDelete = false;

  defaultManagePOS: ManagePOSInfo = {
    product_ID: '',
    name: '',
    productPrice: 0,
    Category: '',
    Availability: '',
  };
  presentManagePOS = { ...this.defaultManagePOS };
}
</script>
