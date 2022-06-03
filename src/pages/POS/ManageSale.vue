<template>
  <q-page class="q-pa-lg bg-grey-1">
    <div class="q-pb-xl text-h4 text-bold">
      <q-icon name="menu_book" color="amber" style="font-size: 4rem" />
      Manage Products
    </div>
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
      title="Menu products"
      :rows="allProduct"
      :columns="columns"
      row-key="name"
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
            color="secondary"
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
                        autofocus
                        color="primary"
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
                          <q-icon
                            name="drive_file_rename_outline"
                            color="primary"
                          />
                        </template>
                      </q-input>
                    </div>
                    <div class="col">
                      <q-file
                        color="primary"
                        outlined
                        label="Product Image"
                        accept=".jpg, image/*"
                        v-model="imageAttachement"
                        max-file-size="2000000"
                        @rejected="onRejected"
                      >
                        <template v-slot:prepend>
                          <q-icon name="camera" color="primary" />
                        </template>
                      </q-file>
                    </div>
                  </div>
                  <div class="row q-gutter-md">
                    <div class="col">
                      <q-select
                        color="primary"
                        outlined
                        :options="productCategoryType"
                        label="Category"
                        v-model="inputManageSale.productCategory"
                      >
                        <template v-slot:prepend>
                          <q-icon name="category" color="primary" />
                        </template>
                      </q-select>
                    </div>
                    <div class="col">
                      <q-select
                        color="primary"
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
                          <q-icon name="category" color="primary" />
                        </template>
                      </q-select>
                    </div>
                  </div>
                  <div class="row q-pt-md q-gutter-md">
                    <div class="col">
                      <q-select
                        color="primary"
                        label="Product Size"
                        outlined
                        :options="sizeOpt"
                        transition-show="flip-up"
                        transition-hide="flip-down"
                        v-model="inputManageSale.productSize"
                      >
                        <template v-slot:prepend>
                          <q-icon name="menu_open" color="primary" />
                        </template>
                      </q-select>
                    </div>
                    <div class="col">
                      <q-input
                        color="primary"
                        outlined
                        label="Price"
                        mask="##.##"
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
                      color="red-5"
                      v-close-popup
                      @click="resetModel()"
                    />
                    <q-btn
                      flat
                      label="Add"
                      color="secondary"
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
      <template #body-cell-availability="props">
        <q-td :props="props">
          <q-chip
            flat
            color="white"
            :text-color="colorManipulation(props.row.productAvailability)"
            :label="labelManipulation(props.row.productAvailability)"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-Actions="props">
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
                          autofocus
                          color="primary"
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
                          color="primary"
                          outlined
                          label="Product Image"
                          accept=".jpg, image/*"
                          v-model="imageAttachement"
                          max-file-size="2000000"
                          @rejected="onRejected"
                        >
                          <template v-slot:prepend>
                            <q-icon name="camera" color="primary" />
                          </template>
                        </q-file>
                      </div>
                    </div>
                    <div class="row q-pt-md q-gutter-md">
                      <div class="col">
                        <q-select
                          color="primary"
                          outlined
                          :options="productCategoryType"
                          label="Category"
                          v-model="inputManageSale.productCategory"
                        >
                          <template v-slot:prepend>
                            <q-icon name="category" color="primary" />
                          </template>
                        </q-select>
                      </div>
                      <div class="col">
                        <q-select
                          color="primary"
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
                            <q-icon name="category" color="primary" />
                          </template>
                        </q-select>
                      </div>
                    </div>
                    <div class="row q-pt-md q-gutter-md">
                      <div class="col">
                        <q-select
                          color="primary"
                          label="Product Size"
                          outlined
                          :options="sizeOpt"
                          transition-show="flip-up"
                          transition-hide="flip-down"
                          v-model="inputManageSale.productSize"
                        >
                          <template v-slot:prepend>
                            <q-icon name="menu_open" color="primary" />
                          </template>
                        </q-select>
                      </div>
                      <div class="col">
                        <q-input
                          outlined
                          color="primary"
                          label="Price"
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
                        color="red-5"
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
              color="red-5"
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
import { date, exportFile } from 'quasar';

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
      name: 'productName',
      required: true,
      label: 'Product Name',
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
      name: 'availability',
      align: 'center',
      label: 'Product Availability ',
      field: 'productAvailability',
    },

    {
      name: 'ProductDate',
      align: 'center',
      label: 'Date Created',
      field: 'productDateCreated',
      sortable: true,
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
      } else {
        this.loading = true;
        await this.addManageProduct(this.inputManageSale);
      }
      this.addNewManageSale = false;
      this.resetModel();
      this.loading = false;
      this.$q.notify({
        type: 'positive',
        message: 'Successfully Added.',
      });
    } catch (error: any) {
      this.$q.notify({
        type: 'negative',
        message: 'Something went wrong!... Please try again.',
      });
    }
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
      this.loading = false;
      this.editRowManageSale = false;
      this.resetModel();
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
    };
    this.imageAttachement = new File([], 'Select File');
  }
  colorManipulation(productAvailability: string) {
    if (productAvailability == 'Yes') {
      return 'positive';
    } else if (productAvailability == 'No') {
      return 'negative';
    }
  }
  labelManipulation(productAvailability: string) {
    if (productAvailability == 'Yes') {
      return 'YES';
    } else if (productAvailability == 'No') {
      return 'NO';
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
      this.wrapCsvValue('Product number'),
      this.wrapCsvValue('Category'),
      this.wrapCsvValue('Product Size'),
      this.wrapCsvValue('Price'),
      this.wrapCsvValue('Product Availability'),
      this.wrapCsvValue('Date Created'),
    ];
    const rows = [header.join(',')].concat(
      this.allProduct.map((c) =>
        [
          this.wrapCsvValue(String(c.product_ID)),
          this.wrapCsvValue(c.productCategory),
          this.wrapCsvValue(c.productSubCategory),
          this.wrapCsvValue(c.productSize),
          this.wrapCsvValue(String(c.productAvailability)),
          this.wrapCsvValue(String(c.productDateCreated)),
        ].join(',')
      )
    );

    const status = exportFile(
      'MenuList-export.csv',
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
