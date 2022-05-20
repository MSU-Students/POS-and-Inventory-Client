<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 text-bold">
      <q-icon name="shopping_bag" color="amber" style="font-size: 4rem" />
      Purchase
    </div>
    <div class="q-mt-lg">
      <div class="q-gutter-sm q-pa-sm row">
        <q-space />
        <q-btn color="primary" icon-right="archive" label="Export to csv" />
      </div>
    </div>
    <q-table
      title="Purchase List"
      :rows="pendingPurchase"
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[0]"
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
            color="primary"
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
                        v-model="inputPurchase.purchaseProduct"
                        outlined
                        label="Enter Purchase Item"
                        color="secondary"
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
                        color="secondary"
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
                        color="secondary"
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
                        color="secondary"
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
                      color="red"
                      v-close-popup
                      @click="resetModel()"
                    />
                    <q-btn label="Submit" color="green" type="submit" />
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
                          v-model="inputPurchase.purchaseProduct"
                          outlined
                          label="Enter Purchase Item"
                          color="secondary"
                        />
                      </div>
                      <div class="col">
                        <q-select
                          label="Supplier"
                          transition-show="flip-up"
                          transition-hide="flip-down"
                          outlined
                          color="secondary"
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
                          color="secondary"
                          v-model="inputPurchase.productQuantity"
                          type="number"
                          label="Quantity"
                          min="0"
                        />
                      </div>
                      <div class="col">
                        <q-select
                          outlined
                          color="secondary"
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
                    <div class="q-px-sm">
                      <div class="q-pt-md">Purchase Status:</div>
                      <q-radio
                        v-model="inputPurchase.purchaseStatus"
                        val="Pending"
                        label="Pending"
                        color="orange"
                        size="lg"
                        checked-icon="task_alt"
                        unchecked-icon="panorama_fish_eye"
                      />
                      <q-radio
                        v-model="inputPurchase.purchaseStatus"
                        val="Completed"
                        label="Completed"
                        size="lg"
                        color="secondary"
                      />
                    </div>
                    <div class="q-gutter-md q-pt-md" align="right">
                      <q-btn
                        label="Cancel"
                        color="red"
                        v-close-popup
                        @click="resetModel()"
                      />
                      <q-btn label="Submit" color="green" type="submit" />
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
              @click="deleteSpecificPurchase(props.row)"
            />

            <q-btn
              round
              color="secondary"
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
                        color="Primary"
                        size="lg"
                      />
                      <q-radio
                        v-model="inputPurchase.purchaseStatus"
                        val="Completed"
                        label="Completed"
                        color="secondary"
                        size="lg"
                      />
                      <q-radio
                        v-model="inputPurchase.purchaseStatus"
                        val="Canceled"
                        label="Cancel"
                        color="red"
                        size="lg"
                      />
                    </div>
                    <div class="q-gutter-md q-pt-lg" align="right">
                      <q-btn
                        label="Cancel"
                        color="red"
                        v-close-popup
                        @click="resetModel()"
                      />
                      <q-btn label="Done" color="green" type="submit" />
                    </div>
                  </q-form>
                </q-card-section>
              </q-card>
            </q-dialog>
          </div>
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

const timeStamp = Date.now();
const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD:HH:mm');

@Options({
  computed: {
    ...mapGetters('purchase', ['pendingPurchase']),
    ...mapState('supplier', ['allSupplier']),
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
  allSupplier!: SupplierDto[];
  addPurchase!: (payload: PurchaseDto) => Promise<void>;
  editPurchase!: (payload: PurchaseDto) => Promise<void>;
  deletePurchase!: (payload: PurchaseDto) => Promise<void>;
  getAllPurchase!: () => Promise<void>;

  async mounted() {
    await this.getAllPurchase();
    console.log(this.pendingPurchase);
  }
  columns = [
    {
      name: 'itemCode',
      required: true,
      label: 'Purchase Reference',
      align: 'left',
      field: 'purchaseID',
    },
    {
      name: 'purchaseProduct',
      required: true,
      label: 'Product Name',
      align: 'center',
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
      align: 'right',
      label: 'Amount',
      field: 'purchaseAmount',
    },
    {
      name: 'purchaseStatus',
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

  inputPurchase: PurchaseDto = {
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

  // wrapCsvValue(val: any, formatFn?: any) {
  //   let formatted = formatFn !== void 0 ? formatFn(val) : val;

  //   formatted =
  //     formatted === void 0 || formatted === null ? '' : String(formatted);

  //   formatted = formatted.split('"').join('""');

  //   return `"${formatted}"`;
  // }

  // exportTable() {
  //   const content = [this.columns.map((col) => this.wrapCsvValue(col.label))]
  //     .concat(
  //       this.data.map((row) =>
  //         this.columns
  //           .map((col) =>
  //             this.wrapCsvValue(
  //               typeof col.field === 'function'
  //                 ? col.field(row)
  //                 : row[col.field === void 0 ? col.name : col.field],
  //               col.format
  //             )
  //           )
  //           .join(',')
  //       )
  //     )
  //     .join('\r\n');

  //   const status = exportFile(
  //     `table-${this.$route.name as string}.csv`,
  //     content,
  //     'text/csv'
  //   );

  //   if (status !== true) {
  //     this.$q.notify({
  //       message: 'Browser denied file download...',
  //       color: 'negative',
  //       icon: "warning can't download",
  //     });
  //   }
  // }
}
</script>
