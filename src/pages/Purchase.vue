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
      :rows="allPurchase"
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
                <q-btn flat round dense icon="close" v-close-popup />
              </q-card-section>

              <q-card-section>
                <div class="row q-gutter-md">
                  <div class="col">
                    <div class="text-h6">Select Product</div>
                    <q-input
                      v-model="inputPurchase.purchaseProduct"
                      outlined
                      placeholder="Pleas select the product"
                      dense
                    />
                  </div>
                  <div class="col">
                    <div class="text-h6">Select Supplier</div>
                    <q-input
                      v-model="inputPurchase.supplier"
                      outlined
                      placeholder="Pleas select supplier"
                      dense
                    />
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="q-gutter-md row">
                <div class="col">
                  <div class="text-h6">Quantity</div>
                  <q-input
                    outlined
                    dense
                    v-model="inputPurchase.purchaseQuant"
                  />
                </div>
                <div class="col">
                  <div class="text-h6">Unit</div>
                  <q-select
                    outlined
                    dense
                    v-model="inputPurchase.purchaseUnit"
                  />
                </div>
                <div class="col">
                  <div class="text-h6">Unit Price</div>
                  <q-input
                    outlined
                    dense
                    v-model="inputPurchase.purchaseUnitPrice"
                  />
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn
                  label="Cancel"
                  color="red"
                  v-close-popup
                  @click="resetModel()"
                />
                <q-btn
                  label="Submit"
                  color="deep-purple"
                  v-close-popup
                  type="submit"
                  @click="onAddPurchase()"
                />
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
              @click="openEditDialog(props.row)"
            />
            <q-dialog v-model="editRowPurchase" persistent>
              <q-card style="width: 800px; max-width: 100vw" class="q-pa-md">
                <q-card-section class="row q-pa-md">
                  <div class="text-h5">Add Purchase</div>
                  <q-space />
                  <q-btn flat round dense icon="close" v-close-popup />
                </q-card-section>

                <q-card-section>
                  <div class="row q-gutter-md">
                    <div class="col">
                      <div class="text-h6">Select Product</div>
                      <q-input
                        v-model="inputPurchase.purchaseProduct"
                        outlined
                        placeholder="Pleas select the product"
                        dense
                      />
                    </div>
                    <div class="col">
                      <div class="text-h6">Select Supplier</div>
                      <q-input
                        v-model="inputPurchase.supplier"
                        outlined
                        placeholder="Pleas select supplier"
                        dense
                      />
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="q-gutter-md row">
                  <div class="col">
                    <div class="text-h6">Quantity</div>
                    <q-input
                      outlined
                      dense
                      v-model="inputPurchase.purchaseQuant"
                    />
                  </div>
                  <div class="col">
                    <div class="text-h6">Unit</div>
                    <q-select
                      outlined
                      dense
                      v-model="inputPurchase.purchaseUnit"
                    />
                  </div>
                  <div class="col">
                    <div class="text-h6">Unit Price</div>
                    <q-input
                      outlined
                      dense
                      v-model="inputPurchase.purchaseUnitPrice"
                    />
                  </div>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn
                    label="Cancel"
                    color="red"
                    v-close-popup
                    @click="resetModel()"
                  />
                  <q-btn
                    label="Submit"
                    color="deep-purple"
                    v-close-popup
                    type="submit"
                    @click="onEditPurchase()"
                  />
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
              @click="deleteSpecificPurchase(props.row)"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { IPurchaseInfo } from '../store/purchase/state';
import { mapActions, mapState } from 'vuex';

@Options({
  computed: {
    ...mapState('purchase', ['allPurchase']),
  },
  methods: {
    ...mapActions('purchase', [
      'addPurchase',
      'editPurchase',
      'deletePurchase',
    ]),
  },
})
export default class ManageAccount extends Vue {
  allPurchase!: IPurchaseInfo[];
  addPurchase!: (payload: IPurchaseInfo) => Promise<void>;
  editPurchase!: (payload: IPurchaseInfo) => Promise<void>;
  deletePurchase!: (payload: IPurchaseInfo) => Promise<void>;

  columns = [
    {
      name: 'purchaseProduct',
      required: true,
      label: 'Product Name',
      align: 'left',
      field: (row: IPurchaseInfo) => row.purchaseProduct,
      format: (val: string) => `${val}`,
    },
    {
      name: 'purchaseDate',
      align: 'center',
      label: 'Date',
      field: 'purchaseDate',
    },
    {
      name: 'supplier',
      align: 'center',
      label: 'Supplier',
      field: 'supplier',
    },
    {
      name: 'purchaseStatus',
      align: 'center',
      label: 'Purchase Status',
      field: 'purchaseStatus',
    },
    {
      name: 'purchaseQuant',
      align: 'center',
      label: 'Quantity',
      field: 'purchaseQuant',
    },
    {
      name: 'purchaseUnit',
      align: 'center',
      label: 'Unit Measurement',
      field: 'purchaseUnit',
    },
    {
      name: 'purchaseUnitPrice',
      align: 'center',
      label: 'Unit Price',
      field: 'purchaseUnitPrice',
    },
    {
      name: 'purchaseAmount',
      align: 'center',
      label: 'Total Amount',
      field: 'purchaseAmount',
    },
    { name: 'action', align: 'center', label: 'Action', field: 'action' },
  ];

  confirmDelete = false;
  cancelEnabled = true;
  addNewPurchase = false;
  editRowPurchase = false;
  filter = '';

  options = ['Admin', 'Cashier'];

  inputPurchase: IPurchaseInfo = {
    purchaseProduct: '',
    purchaseDate: '',
    supplier: '',
    purchaseStatus: '',
    purchaseQuant: 0,
    purchaseUnit: '',
    purchaseUnitPrice: 0,
    purchaseAmount: 0,
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
    this.resetModel();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Edit.',
    });
  }

  deleteSpecificPurchase(val: IPurchaseInfo) {
    this.$q
      .dialog({
        message: 'Confirm to delete?',
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deletePurchase(val);
        this.$q.notify({
          type: 'warning',
          message: 'Successfully deleted',
        });
      });
  }

  openEditDialog(val: IPurchaseInfo) {
    this.editRowPurchase = true;
    this.inputPurchase = { ...val };
  }
  resetModel() {
    this.inputPurchase = {
      purchaseProduct: '',
      purchaseDate: '',
      supplier: '',
      purchaseStatus: '',
      purchaseQuant: 0,
      purchaseUnit: '',
      purchaseUnitPrice: 0,
      purchaseAmount: 0,
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
