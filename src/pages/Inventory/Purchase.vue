<template>
  <q-page class="q-pa-lg bg-grey-1">
    <div class="text-h4 text-teal-4 q-pb-lg q-pt-md text-bold flex flex-center">
      <q-icon
        class="b q-pr-sm"
        name="shopping_bag"
        color="teal-4"
        style="font-size: 3rem"
      />
      Purchase
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
      title="Purchase List"
      :rows="pendingPurchase"
      :columns="columns"
      row-key="name"
      table-header-class="bg-teal-4 text-white"
      :filter="filter"
    >
      <template v-slot:top-right>
        <div class="q-pa-md q-gutter-md row">
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
            label="Add Purchase"
            color="teal-4"
            dense
            flat
            icon="add"
            @click="addNewPurchase = true"
          />
          <q-dialog v-model="addNewPurchase" persistent>
            <q-card style="width: 800px; max-width: 100vw" class="q-pa-md">
              <q-card-section class="row q-pa-md">
                <div class="text-h5">Add Purchase</div>
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
                <q-form @submit="onAddPurchase()">
                  <div class="row q-gutter-md">
                    <div class="col">
                      <q-input
                        autofocus
                        v-model="inputPurchase.purchaseProduct"
                        outlined
                        label="Enter Purchase Item"
                        color="primary"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'You must put the product unit',
                        ]"
                      />
                    </div>
                    <div class="col">
                      <q-select
                        label="Supplier"
                        transition-show="flip-up"
                        transition-hide="flip-down"
                        outlined
                        color="primary"
                        :options="allSupplier"
                        option-label="company"
                        option-value="supplierID"
                        map-options
                        emit-value
                        v-model="inputPurchase.supplierPurchase"
                      />
                    </div>
                  </div>
                  <div class="q-gutter-md row q-py-md">
                    <div class="col">
                      <q-input
                        outlined
                        color="primary"
                        v-model="inputPurchase.productQuantity"
                        type="number"
                        label="Quantity"
                        min="0"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'You must put the product unit',
                        ]"
                      />
                    </div>
                    <div class="col">
                      <q-select
                        outlined
                        color="primary"
                        :options="unitProduct"
                        v-model="inputPurchase.productUnit"
                        transition-show="flip-up"
                        transition-hide="flip-down"
                        label="Unit"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'You must put the product unit',
                        ]"
                      />
                    </div>
                  </div>
                  <div class="row q-gutter-md">
                    <div class="col">
                      <q-select
                        outlined
                        transition-show="flip-up"
                        transition-hide="flip-down"
                        label="Category"
                        :options="categoryOpt"
                        v-model="inputPurchase.purchaseCategory"
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
                        label="Amount"
                        prefix="₱"
                        outlined
                        mask="#.##"
                        fill-mask="0"
                        reverse-fill-mask
                        input-class="text-right"
                        v-model="inputPurchase.purchaseAmount"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'You must put the product unit',
                        ]"
                      />
                    </div>
                  </div>
                  <div class="q-gutter-md q-pt-md" align="right">
                    <q-btn
                      label="Cancel"
                      color="red-5"
                      v-close-popup
                      @click="resetModel()"
                    />
                    <q-btn label="Submit" color="teal-4" type="submit" />
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
            <q-dialog v-model="editRowPurchase" persistent>
              <q-card style="width: 800px; max-width: 100vw" class="q-pa-md">
                <q-card-section class="row q-pa-md">
                  <div class="text-h5">Edit Purchase</div>
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
                  <q-form @submit="onEditPurchase()">
                    <div class="row q-gutter-md">
                      <div class="col">
                        <q-input
                          autofocus
                          v-model="inputPurchase.purchaseProduct"
                          outlined
                          label="Enter Purchase Item"
                          color="primary"
                        />
                      </div>
                      <div class="col">
                        <q-select
                          label="Supplier"
                          transition-show="flip-up"
                          transition-hide="flip-down"
                          outlined
                          color="primary"
                          :options="allSupplier"
                          option-label="company"
                          option-value="supplierID"
                          map-options
                          emit-value
                          v-model="inputPurchase.supplierPurchase"
                        />
                      </div>
                    </div>
                    <div class="q-gutter-md row q-py-md">
                      <div class="col">
                        <q-input
                          outlined
                          color="primary"
                          v-model="inputPurchase.productQuantity"
                          type="number"
                          label="Quantity"
                          min="0"
                        />
                      </div>
                      <div class="col">
                        <q-select
                          outlined
                          color="primary"
                          :options="unitProduct"
                          v-model="inputPurchase.productUnit"
                          transition-show="flip-up"
                          transition-hide="flip-down"
                          label="Unit"
                        />
                      </div>
                    </div>
                    <div class="row q-gutter-md">
                      <div class="col">
                        <q-select
                          outlined
                          transition-show="flip-up"
                          transition-hide="flip-down"
                          label="Category"
                          :options="categoryOpt"
                          v-model="inputPurchase.purchaseCategory"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          label="Amount"
                          prefix="₱"
                          outlined
                          mask="#.##"
                          fill-mask="0"
                          reverse-fill-mask
                          input-class="text-right"
                          v-model="inputPurchase.purchaseAmount"
                        />
                      </div>
                    </div>
                    <div class="q-gutter-md q-pt-md" align="right">
                      <q-btn
                        label="Cancel"
                        color="red-5"
                        v-close-popup
                        @click="resetModel()"
                      />
                      <q-btn label="Submit" color="teal-4" type="submit" />
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
              @click="deleteSpecificPurchase(props.row)"
            />

            <q-btn
              round
              color="primary"
              icon="done_all"
              size="sm"
              flat
              dense
              @click="openPurchaseStatus(props.row)"
            />
            <q-dialog v-model="statusPurchase">
              <q-card style="width: 400px" class="q-ma-sm">
                <q-card-section class="text-h5">Purchase Status</q-card-section>
                <q-card-section class="flex flex-center q-pt-none">
                  <q-form @submit="onEditPurchase()">
                    <div>
                      <q-radio
                        v-model="inputPurchase.purchaseStatus"
                        val="Pending"
                        label="Pending"
                        color="warning"
                        size="lg"
                      />
                      <q-radio
                        v-model="inputPurchase.purchaseStatus"
                        val="Completed"
                        label="Completed"
                        color="positive"
                        size="lg"
                      />
                      <q-radio
                        v-model="inputPurchase.purchaseStatus"
                        val="Canceled"
                        label="Canceled"
                        color="red-5"
                        size="lg"
                      />
                    </div>
                    <div class="q-gutter-md q-pt-lg" align="right">
                      <q-btn
                        label="Cancel"
                        color="red-5"
                        v-close-popup
                        @click="resetModel()"
                      />
                      <q-btn label="Done" color="teal-4" type="submit" />
                    </div>
                  </q-form>
                </q-card-section>
              </q-card>
            </q-dialog>
          </div>
        </q-td>
      </template>
      <template #body-cell-status="props">
        <q-td :props="props">
          <q-chip
            flat
            color="white"
            :text-color="colorManipulation(props.row.purchaseStatus)"
            :label="labelManipulation(props.row.purchaseStatus)"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>
<script lang="ts">
import { PurchaseDto, SupplierDto } from 'src/services/rest-api';
import { Vue, Options } from 'vue-class-component';
import { mapActions, mapGetters, mapState } from 'vuex';
import { date } from 'quasar';
import { exportFile } from 'quasar';

const timeStamp = Date.now();
const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD:HH:mm');

@Options({
  computed: {
    ...mapGetters('purchase', ['pendingPurchase']),
    ...mapState('supplier', ['allSupplier']),
    ...mapState('purchase', ['allPurchase']),
  },
  methods: {
    ...mapActions('purchase', [
      'addPurchase',
      'editPurchase',
      'deletePurchase',
      'getAllPurchase',
    ]),
  },
})
export default class Pruchase extends Vue {
  pendingPurchase!: PurchaseDto[];
  allPurchase!: PurchaseDto[];
  allSupplier!: SupplierDto[];
  addPurchase!: (payload: PurchaseDto) => Promise<void>;
  editPurchase!: (payload: PurchaseDto) => Promise<void>;
  deletePurchase!: (payload: PurchaseDto) => Promise<void>;
  getAllPurchase!: () => Promise<void>;

  async mounted() {
    await this.getAllPurchase();
  }
  columns = [
    {
      name: 'purchaseProduct',
      required: true,
      label: 'Product Name',
      align: 'left',
      field: 'purchaseProduct',
    },
    {
      name: 'purchaseDate',
      align: 'center',
      label: 'Date Purchase',
      field: 'purchaseDate',
    },
    {
      name: 'supplier',
      align: 'center',
      label: 'Supplier',
      field: (row: any) => row.supplierPurchase?.company || 'None',
    },

    {
      name: 'purchaseCategory',
      align: 'center',
      label: 'Category',
      field: 'purchaseCategory',
    },

    {
      name: 'productQuantity',
      align: 'center',
      label: 'Quantity',
      field: 'productQuantity',
    },
    {
      name: 'productUnit',
      align: 'center',
      label: 'Unit Measurement',
      field: 'productUnit',
    },
    {
      name: 'purchaseAmount',
      align: 'center',
      label: 'Amount',
      field: (row: PurchaseDto) => '₱ ' + this.formatPrice(row.purchaseAmount),
    },
    {
      name: 'status',
      align: 'center',
      label: 'Purchase Status',
      field: 'purchaseStatus',
    },
    { name: 'action', align: 'center', label: 'Action', field: 'action' },
  ];

  confirmDelete = false;
  cancelEnabled = true;
  addNewPurchase = false;
  editRowPurchase = false;
  statusPurchase = false;
  filter = '';
  categoryOpt = ['Utensil', 'Ingredient', 'Equipments', 'Miscellaneous/Other'];
  unitProduct = [
    'Piece (pcs)',
    'Pack (pks)',
    'Sack',
    'Kilogram (kg)',
    'Miligram (ml)',
    'Other',
  ];
  statusOpt = ['Pending', 'Completed', 'Canceled'];

  inputPurchase: any = {
    purchaseProduct: '',
    purchaseDate: formattedString,
    purchaseCategory: '',
    productUnit: '',
    purchaseStatus: 'Pending',
  };

  async onAddPurchase() {
    await this.addPurchase(this.inputPurchase);
    this.addNewPurchase = false;
    this.resetModel();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Added.',
    });
  }

  async onEditPurchase() {
    await this.editPurchase(this.inputPurchase);
    this.editRowPurchase = false;
    this.statusPurchase = false;
    this.resetModel();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Edit.',
    });
  }

  deleteSpecificPurchase(val: PurchaseDto) {
    this.$q
      .dialog({
        message: 'Confirm to delete?',
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deletePurchase(val.purchaseID as any);
        this.$q.notify({
          type: 'warning',
          message: 'Successfully deleted',
        });
      });
  }

  openEditDialog(val: PurchaseDto) {
    this.editRowPurchase = true;
    this.inputPurchase = { ...val };
  }

  openPurchaseStatus(val: PurchaseDto) {
    this.statusPurchase = true;
    this.inputPurchase = { ...val };
  }
  resetModel() {
    this.inputPurchase = {
      purchaseProduct: '',
      purchaseDate: formattedString,
      purchaseCategory: '',
      productUnit: '',
      purchaseStatus: 'Pending',
    };
  }

  colorManipulation(purchaseStatus: string) {
    if (purchaseStatus.match('Pending')) {
      return 'warning';
    }
  }
  labelManipulation(purchaseStatus: string) {
    if (purchaseStatus.match('Pending')) {
      return 'PENDING';
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
  formatPrice(value: number) {
    let val = (value / 1).toFixed(2).replace(',', '.');
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  exportTable() {
    // naive encoding to csv format
    const header = [
      this.wrapCsvValue('ID'),
      this.wrapCsvValue('Product'),
      this.wrapCsvValue('Category'),
      this.wrapCsvValue('Purchase Date'),
      this.wrapCsvValue('Quantity'),
      this.wrapCsvValue('Quantity Unit'),
      this.wrapCsvValue('Status'),
      this.wrapCsvValue('Amount'),
      this.wrapCsvValue('Supplier'),
    ];
    const rows = [header.join(',')].concat(
      this.allPurchase.map((c) =>
        [
          this.wrapCsvValue(String(c.purchaseID)),
          this.wrapCsvValue(c.purchaseProduct),
          this.wrapCsvValue(c.purchaseCategory),
          this.wrapCsvValue(String(c.purchaseDate)),
          this.wrapCsvValue(String(c.productQuantity)),
          this.wrapCsvValue(String(c.productUnit)),
          this.wrapCsvValue(c.purchaseStatus),
          this.wrapCsvValue(String(c.purchaseAmount)),
          this.wrapCsvValue(String(c.supplierPurchase?.company) || 'None'),
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
