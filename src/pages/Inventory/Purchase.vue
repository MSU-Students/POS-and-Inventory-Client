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
                      />
                    </div>
                    <div class="col">
                      <q-select
                        outlined
                        label="Select Supplier"
                        transition-show="flip-up"
                        transition-hide="flip-down"
                        color="secondary"
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
                          outlined
                          label="Select Supplier"
                          transition-show="flip-up"
                          transition-hide="flip-down"
                          color="secondary"
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
                    <div class="q-gutter-md row q-py-md">
                      <div class="col">
                        <q-input
                          outlined
                          color="secondary"
                          v-model="inputPurchase.productQuantity"
                          type="number"
                          label="Quantity"
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
          </div>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>
<script lang="ts">
import { PurchaseDto } from 'src/services/rest-api';
import { Vue, Options } from 'vue-class-component';
import { mapActions, mapState } from 'vuex';
import { date } from 'quasar';

const timeStamp = Date.now();
const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD:HH:mm');

@Options({
  computed: {
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
  allPurchase!: PurchaseDto[];
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
      field: (row: PurchaseDto) => row.purchaseProduct,
      format: (val: string) => `${val}`,
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
      field: 'supplier',
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
  filter = '';
  categoryOpt = ['Utensil', 'Ingredient', 'Equipments', 'Miscellaneous/Other'];
  unitProduct = ['Kilogram (kg)', 'Miligram (mg)', 'Packs'];

  inputPurchase: PurchaseDto = {
    purchaseProduct: '',
    purchaseDate: formattedString,
    productQuantity: 0,
    productUnit: '',
    purchaseStatus: 'Pending',
    purchaseAmount: 0,
    purchaseCategory: '',
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

  deleteSpecificPurchase(val: PurchaseDto) {
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

  openEditDialog(val: PurchaseDto) {
    this.editRowPurchase = true;
    this.inputPurchase = { ...val };
  }
  resetModel() {
    this.inputPurchase = {
      purchaseProduct: '',
      purchaseDate: '',
      purchaseStatus: '',
      purchaseAmount: 0,
      purchaseCategory: '',
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
