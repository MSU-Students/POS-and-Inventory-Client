<template>
  <q-page class="q-pa-lg">
    <div class="q-pb-xl text-h4 text-bold">
      <q-icon name="menu_book" color="amber" style="font-size: 4rem" />
      Manage Products
    </div>
    <q-table
      title="Menu products"
      :rows="allProduct"
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
                        outlined
                        v-model="inputManageSale.productName"
                        label="Product Name"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'You must enter an input',
                        ]"
                      >
                        <template v-slot:prepend>
                          <q-icon name="drive_file_rename_outline" />
                        </template>
                      </q-input>
                    </div>
                    <div class="col">
                      <q-file
                        outlined
                        label="Product Image"
                        accept=".jpg, image/*"
                        v-model="imageAttachement"
                        max-file-size="2000000"
                        @rejected="onRejected"
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
                        outlined
                        :options="productCategoryType"
                        label="Category"
                        v-model="inputManageSale.productCategory"
                      >
                        <template v-slot:prepend>
                          <q-icon name="category" />
                        </template>
                      </q-select>
                    </div>
                    <div class="col">
                      <q-select
                        :v-model="
                          inputManageSale.productCategory ==
                            'Beverage/Drinks' ||
                          'Food' ||
                          'Sinker/Add-Ons'
                            ? selectSubCategory()
                            : selectSubCategory
                        "
                        outlined
                        :options="SubCategory"
                        label="Sub-Category"
                        v-model="inputManageSale.productSubCategory"
                        transition-show="flip-up"
                        transition-hide="flip-down"
                      >
                        <template v-slot:prepend>
                          <q-icon name="category" />
                        </template>
                      </q-select>
                    </div>
                  </div>
                  <div class="row q-pt-md q-gutter-md">
                    <div class="col">
                      <q-select
                        label="Product Size"
                        outlined
                        :options="sizeOpt"
                        transition-show="flip-up"
                        transition-hide="flip-down"
                        v-model="inputManageSale.productSize"
                      >
                        <template v-slot:prepend>
                          <q-icon name="menu_open" />
                        </template>
                      </q-select>
                    </div>
                    <div class="col">
                      <q-input
                        outlined
                        label="Price"
                        mask="#.##"
                        fill-mask="0"
                        reverse-fill-mask
                        v-model="inputManageSale.productPrice"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'You must enter an input',
                        ]"
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
                    <q-btn
                      flat
                      label="Add"
                      color="primary"
                      type="submit"
                      :loading="loading"
                    />
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
                  <q-form @submit="oneditManageProduct">
                    <div class="row q-gutter-md">
                      <div class="col">
                        <q-input
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
                          outlined
                          label="Product Image"
                          accept=".jpg, image/*"
                          v-model="imageAttachement"
                          max-file-size="2000000"
                          @rejected="onRejected"
                        >
                          <template v-slot:prepend>
                            <q-icon name="camera" />
                          </template>
                        </q-file>
                      </div>
                    </div>
                    <div class="row q-pt-md q-gutter-md">
                      <div class="col">
                        <q-select
                          outlined
                          :options="productCategoryType"
                          label="Category"
                          v-model="inputManageSale.productCategory"
                        >
                          <template v-slot:prepend>
                            <q-icon name="category" />
                          </template>
                        </q-select>
                      </div>
                      <div class="col">
                        <q-select
                          :v-model="
                            inputManageSale.productCategory ==
                              'Beverage/Drinks' ||
                            'Food' ||
                            'Sinker/Add-Ons'
                              ? selectSubCategory()
                              : selectSubCategory
                          "
                          outlined
                          :options="SubCategory"
                          label="Sub-Category"
                          v-model="inputManageSale.productSubCategory"
                          transition-show="flip-up"
                          transition-hide="flip-down"
                        >
                          <template v-slot:prepend>
                            <q-icon name="category" />
                          </template>
                        </q-select>
                      </div>
                    </div>
                    <div class="row q-pt-md q-gutter-md">
                      <div class="col">
                        <q-select
                          label="Product Size"
                          outlined
                          :options="sizeOpt"
                          transition-show="flip-up"
                          transition-hide="flip-down"
                          v-model="inputManageSale.productSize"
                        >
                          <template v-slot:prepend>
                            <q-icon name="menu_open" />
                          </template>
                        </q-select>
                      </div>
                      <div class="col">
                        <q-input
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
                      <q-btn
                        flat
                        label="Save"
                        color="primary"
                        type="submit"
                        :loading="loading"
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
import { mapState, mapActions } from 'vuex';
import { ManageProductDto, MediaDto } from 'src/services/rest-api';
import { date } from 'quasar';

const timeStamp = Date.now();
const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD:HH:mm');

@Options({
  computed: {
    ...mapState('manageProduct', ['allProduct']),
  },
  methods: {
    ...mapActions('manageProduct', [
      'addManageProduct',
      'editManageProduct',
      'deleteManageProduct',
      'getAllManageProduct',
    ]),
    ...mapActions('media', ['uploadMedia']),
  },
})
export default class ManageProduct extends Vue {
  allProduct!: ManageProductDto[];
  addManageProduct!: (payload: ManageProductDto) => Promise<void>;
  editManageProduct!: (payload: ManageProductDto) => Promise<void>;
  deleteManageProduct!: (payload: ManageProductDto) => Promise<void>;
  getAllManageProduct!: () => Promise<void>;
  uploadMedia!: (payload: File) => Promise<MediaDto>;
  async mounted() {
    await this.getAllManageProduct();
  }

  onRejected() {
    this.$q.notify({
      type: 'negative',
      message: 'The File is too Large',
    });
  }
  columns = [
    {
      name: 'Product Name',
      required: true,
      label: 'Product Number',
      align: 'left',
      field: (row: ManageProductDto) => row.productName,
      format: (val: string) => `${val}`,
    },
    {
      name: 'productCategory',
      align: 'center',
      label: 'Category',
      field: 'productCategory',
    },
    {
      name: 'SubCategory',
      align: 'center',
      label: 'Sub-Category',
      field: 'productSubCategory',
    },
    {
      name: 'productSize',
      align: 'center',
      label: 'Product Size',
      field: 'productSize',
    },
    {
      name: 'productPrice',
      align: 'center',
      label: 'Price',
      field: 'productPrice',
    },
    {
      name: 'productAvailability',
      align: 'center',
      label: 'Product Availability ',
      field: 'productAvailability',
    },

    {
      name: 'ProductDate',
      align: 'center',
      label: 'Date Created',
      field: 'productDateCreated',
    },
    {
      name: 'Actions',
      align: 'center',
      label: 'Actions',
      field: 'Actions',
    },
  ];
  productCategoryType = ['Beverage/Drinks', 'Food', 'Sinker/Add-Ons'];
  sizeOpt = ['Regular', 'Small', 'Medium', 'Large'];
  SubCategory: any[] = [];
  addNewManageSale = false;
  filter = '';
  editRowManageSale = false;
  imageAttachement: File = new File([], 'Select File');

  inputManageSale: any = {
    productName: '',
    productPrice: 0,
    productAvailability: 'Yes',
    productDateCreated: formattedString,
    productCategory: '',
    productSubCategory: '',
    productSize: 'Regular',
  };

  selectSubCategory() {
    if (this.inputManageSale.productCategory == 'Beverage/Drinks') {
      return (this.SubCategory = [
        'Milk Teas',
        'Fruit Teas',
        'Yogurt Teas',
        'Ice Blended Drinks',
        'Salted Cream Series',
        'Iced Coffees',
        'Creamcheese Series',
        'Ice Blended Coffees',
        'Other Drinks',
      ]);
    } else if (this.inputManageSale.productCategory == 'Food') {
      return (this.SubCategory = [
        'Meals',
        'Platters',
        'Rice Toppings',
        'Chicken Wings',
        'Sandwiches and Burgers',
        'All-Time Favorites',
        'Pasta and Noodles',
        'Something Sweet',
        'Pizza',
        'French Fries and Nachos',
        'Party Trays',
        'Healthy Option',
        'Smoothie Bowls',
        'Frozen Spoon Ice Cream',
      ]);
    } else if (this.inputManageSale.productCategory == 'Sinker/Add-Ons') {
      return (this.SubCategory = ['None']);
    }
  }
  loading = false;
  async onAddManageSale() {
    try {
      if (this.imageAttachement.size > 0) {
        this.loading = true;
        const media = await this.uploadMedia(this.imageAttachement);
        await this.addManageProduct({
          ...this.inputManageSale,
          url: media.id,
        });
      } else if (this.imageAttachement.size < 0) {
        this.loading = true;
        await this.addManageProduct(this.inputManageSale);
      }
    } catch (error) {}

    this.addNewManageSale = false;
    this.resetModel();
    this.loading = false;
  }

  async oneditManageProduct() {
    try {
      if (this.imageAttachement.size > 0) {
        this.loading = true;
        const media = await this.uploadMedia(this.imageAttachement);
        await this.editManageProduct({
          ...this.inputManageSale,
          url: media.id,
        });
      } else {
        await this.editManageProduct(this.inputManageSale);
      }

      this.$q.notify({
        type: 'positive',
        message: 'Successfully Edit.',
      });
    } catch (error) {
      this.$q.notify({
        type: 'negative',
        message: 'Something went wrong!',
      });
    }

    this.loading = false;
    this.editRowManageSale = false;
    this.resetModel();
  }

  deleteSpecificManageSale(val: ManageProductDto) {
    this.$q
      .dialog({
        message: 'Confirm to delete?',
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteManageProduct(val.product_ID as any);
        this.$q.notify({
          type: 'warning',
          message: 'Successfully deleted',
        });
      });
  }

  openEditDialog(val: ManageProductDto) {
    this.editRowManageSale = true;
    this.inputManageSale = { ...val };
  }

  resetModel() {
    this.inputManageSale = {
      productName: '',
      productPrice: 0,
      productAvailability: 'Yes',
      productDateCreated: formattedString,
      productCategory: '',
      productSubCategory: '',
      productSize: 'Regular',
      url: '',
    };
    this.imageAttachement = new File([], 'Select File');
  }
}
</script>
