<template>
  <q-page class="q-pa-lg">
    <div class="q-pb-xl text-h4 text-bold">
      <q-icon name="menu_book" color="amber" style="font-size: 4rem" />
      Manage Products
    </div>
    <q-table
      title="Menu products"
      :rows="allManageSale"
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
            @click="addNewManageSale = true"
          />
          <q-dialog v-model="addNewManageSale" persistent>
            <q-card style="width: 600px; max-width: 35vw">
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
                <q-form @submit="onAddManageSale">
                  <div class="row q-gutter-md">
                    <div class="col">
                      <q-input
                        class="q-py-md"
                        outlined
                        v-model="inputManageSale.productName"
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
                        label="Product Image"
                        accept=".jpg, image/*"
                      >
                        <template v-slot:prepend>
                          <q-icon name="camera" />
                        </template>
                      </q-file>
                    </div>
                  </div>
                  <div class="row q-gutter-md">
                    <div class="col">
                      <q-select
                        class="q-py-md"
                        outlined
                        :options="productCategoryType"
                        v-model="inputManageSale.productCategory"
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
                        label="Price"
                        mask="#.##"
                        fill-mask="0"
                        reverse-fill-mask
                        v-model="inputManageSale.productPrice"
                      >
                        <template v-slot:prepend> ₱ </template>
                      </q-input>
                    </div>
                  </div>
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-subtitle1">
                        Availability
                      </q-item-label>
                    </q-item-section>
                    <q-item-section avatar>
                      <q-toggle
                        outlined
                        size="lg"
                        color="green"
                        false-value="No"
                        true-value="Yes"
                        v-model="inputManageSale.productAvailability"
                      />
                    </q-item-section>
                  </q-item>
                  <div class="q-py-md" align="right">
                    <q-btn
                      flat
                      label="Cancel"
                      color="red-10"
                      v-close-popup
                      @click="resetModel()"
                    />
                    <q-btn flat label="Save" color="primary" type="submit" />
                  </div>
                </q-form>
              </q-card-section>
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
              @click="openEditDialog(props.row)"
            />
            <q-dialog v-model="editRowManageSale" persistent>
              <q-card style="width: 900px; max-width: 35vw">
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
                  <q-form @submit="onEditManageSale">
                    <div class="row q-gutter-md">
                      <div class="col">
                        <q-input
                          class="q-py-md"
                          outlined
                          v-model="inputManageSale.productName"
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
                          label="Product Image"
                          accept=".jpg, image/*"
                        >
                          <template v-slot:prepend>
                            <q-icon name="camera" />
                          </template>
                        </q-file>
                      </div>
                    </div>
                    <div class="row q-gutter-md">
                      <div class="col">
                        <q-select
                          class="q-py-md"
                          outlined
                          :options="productCategoryType"
                          v-model="inputManageSale.productCategory"
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
                          label="Price"
                          mask="#.##"
                          fill-mask="0"
                          reverse-fill-mask
                          v-model="inputManageSale.productPrice"
                        >
                          <template v-slot:prepend> ₱ </template>
                        </q-input>
                      </div>
                    </div>
                    <q-item>
                      <q-item-section>
                        <q-item-label class="text-subtitle1">
                          Availability
                        </q-item-label>
                      </q-item-section>
                      <q-item-section avatar>
                        <q-toggle
                          outlined
                          size="lg"
                          color="green"
                          false-value="No"
                          true-value="Yes"
                          v-model="inputManageSale.productAvailability"
                        />
                      </q-item-section>
                    </q-item>
                    <div class="q-py-md" align="right">
                      <q-btn
                        flat
                        label="Cancel"
                        color="red-10"
                        v-close-popup
                        @click="resetModel()"
                      />
                      <q-btn flat label="Save" color="primary" type="submit" />
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
              @click="deleteSpecificManageSale(props.row)"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { IManageSaleInfo } from '../store/manageSale/state';
import { mapState, mapActions } from 'vuex';

@Options({
  computed: {
    ...mapState('manageSale', ['allManageSale']),
  },
  methods: {
    ...mapActions('manageSale', [
      'addManageSale',
      'editManageSale',
      'deleteManageSale',
    ]),
  },
})
export default class ManageAccount extends Vue {
  allManageSale!: IManageSaleInfo[];
  addManageSale!: (payload: IManageSaleInfo) => Promise<void>;
  editManageSale!: (payload: IManageSaleInfo) => Promise<void>;
  deleteManageSale!: (payload: IManageSaleInfo) => Promise<void>;

  columns = [
    {
      name: 'product_ID',
      required: true,
      label: 'Product Number',
      align: 'left',
      field: (row: IManageSaleInfo) => row.product_ID,
      format: (val: string) => `${val}`,
    },
    {
      name: 'productName',
      align: 'center',
      label: 'Product Name',
      field: 'productName',
    },
    {
      name: 'productPrice',
      align: 'center',
      label: 'Price',
      field: 'productPrice',
    },
    {
      name: 'productCategory',
      align: 'center',
      label: 'Category',
      field: 'productCategory',
    },
    {
      name: 'productAvailability',
      align: 'center',
      label: 'Product Availability ',
      field: 'productAvailability',
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
  productCategoryType = ['Beverage/Drinks', 'Food', 'Add-ons', 'Appetizer'];
  addNewManageSale = false;
  productAvailability = 'Availability Option';
  availabilityOption = ['No', 'Yes'];
  filter = '';
  files = '';
  cancelEnabled = true;
  addUser = false;
  editRowManageSale = false;
  ConfirmDelete = false;

  inputManageSale: IManageSaleInfo = {
    product_ID: '',
    productName: '',
    productPrice: 0,
    productCategory: '',
    productAvailability: '',
  };

  async onAddManageSale() {
    await this.addManageSale(this.inputManageSale);
    this.addNewManageSale = false;
    this.resetModel();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Adeded.',
    });
  }

  async onEditManageSale() {
    await this.editManageSale(this.inputManageSale);
    this.editRowManageSale = false;
    this.resetModel();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Edit.',
    });
  }

  deleteSpecificManageSale(val: IManageSaleInfo) {
    this.$q
      .dialog({
        message: 'Confirm to delete?',
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteManageSale(val);
        this.$q.notify({
          type: 'warning',
          message: 'Successfully deleted',
        });
      });
  }

  openEditDialog(val: IManageSaleInfo) {
    this.editRowManageSale = true;
    this.inputManageSale = { ...val };
  }

  resetModel() {
    this.inputManageSale = {
      product_ID: '',
      productName: '',
      productPrice: 0,
      productCategory: '',
      productAvailability: '',
    };
  }
}
</script>
