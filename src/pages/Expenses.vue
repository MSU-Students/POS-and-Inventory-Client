<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 text-teal q-pb-lg q-pt-md text-bold flex flex-center">
      <q-icon
        class="bi bi-wallet q-pr-sm"
        color="teal"
        style="font-size: 3rem"
      />
      Expenses
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
      title="Expenses List"
      :rows="allExpenses"
      :columns="columns"
      row-key="reference"
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
            label="Add Expenses"
            color="teal"
            dense
            flat
            icon="add"
            size="13px"
            @click="addNewExpenses = true"
          />
          <q-dialog v-model="addNewExpenses" persistent>
            <q-card style="width: 700px" class="q-pa-md">
              <q-card-section class="row">
                <div class="text-h6">Edit Expenses</div>
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
                <q-form @submit="onAddExpenses">
                  <div class="q-gutter-md row">
                    <div class="col">
                      <q-input
                        outlined
                        label="Expenses Name"
                        v-model="inputExpenses.expensesName"
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
                      <q-input
                        outlined
                        label="Amount"
                        prefix="₱"
                        mask="#.##"
                        fill-mask="0"
                        reverse-fill-mask
                        v-model="inputExpenses.amount"
                        color="secondary"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'You must put the product unit',
                        ]"
                      />
                    </div>
                  </div>
                  <div class="q-gutter-md q-py-md row">
                    <div class="col">
                      <q-select
                        color="secondary"
                        label="Category"
                        :options="categoryOpt"
                        transition-show="flip-up"
                        transition-hide="flip-down"
                        outlined
                        v-model="inputExpenses.expensesCategory"
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
                        v-model="inputExpenses.supplier"
                      />
                    </div>
                  </div>
                  <div class="q-pb-md">
                    <q-input
                      outlined
                      label="Note"
                      type="textarea"
                      color="secondary"
                      v-model="inputExpenses.description"
                    />
                  </div>
                  <div align="right">
                    <q-btn
                      flat
                      label="Cancel"
                      color="red-5"
                      v-close-popup
                      @click="resetModel()"
                    />
                    <q-btn flat label="Save" color="teal" type="submit" />
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
      </template>
      <template v-slot:body-cell-expensesNote="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn
              round
              color="green"
              icon="description"
              size="sm"
              flat
              dense
              @click="openExpensesNote(props.row)"
            />
            <q-dialog v-model="showExpensesNote">
              <q-card style="width: 400px" flat bordered>
                <q-card-section>
                  <div class="text-h6">
                    Expenses Note
                    <q-btn
                      round
                      flat
                      dense
                      icon="close"
                      class="float-right"
                      color="grey-8"
                      v-close-popup
                    ></q-btn>
                  </div>
                  <q-space />
                  <div>
                    Expenses Name:
                    <strong>{{ inputExpenses.expensesName }}</strong>
                  </div>
                  <div>
                    Category:
                    <strong>{{ inputExpenses.expensesCategory }}</strong>
                  </div>
                  <div>
                    Date and Time:
                    <strong>{{ inputExpenses.expensesDate }}</strong>
                  </div>
                </q-card-section>

                <q-separator />

                <q-card-section>
                  {{ inputExpenses.description }}
                </q-card-section>
                <q-separator />
              </q-card>
            </q-dialog>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn
              round
              color="teal"
              icon="edit"
              size="sm"
              flat
              dense
              @click="openEditDialog(props.row)"
            />
            <q-dialog v-model="editRowExpenses" persistent>
              <q-card style="width: 700px" class="q-pa-md">
                <q-card-section class="row">
                  <div class="text-h6">Edit Expenses</div>
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
                  <q-form @submit="onEditExpenses">
                    <div class="q-gutter-md row">
                      <div class="col">
                        <q-input
                          outlined
                          label="Expenses Name"
                          v-model="inputExpenses.expensesName"
                          color="secondary"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          outlined
                          label="Amount"
                          prefix="₱"
                          mask="#.##"
                          fill-mask="0"
                          reverse-fill-mask
                          v-model="inputExpenses.amount"
                          color="secondary"
                        />
                      </div>
                    </div>
                    <div class="q-gutter-md q-py-md row">
                      <div class="col">
                        <q-select
                          color="secondary"
                          label="Category"
                          :options="categoryOpt"
                          transition-show="flip-up"
                          transition-hide="flip-down"
                          outlined
                          v-model="inputExpenses.expensesCategory"
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
                          option-value="supplierId"
                          emit-value
                          map-options
                          v-model="inputExpenses.supplier"
                        />
                      </div>
                    </div>
                    <div class="q-pb-md">
                      <q-input
                        outlined
                        label="Note"
                        type="textarea"
                        color="secondary"
                        v-model="inputExpenses.description"
                      />
                    </div>
                    <div align="right">
                      <q-btn
                        flat
                        label="Cancel"
                        color="red-5"
                        v-close-popup
                        @click="resetModel()"
                      />
                      <q-btn flat label="Save" color="teal" type="submit" />
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
              @click="deleteSpecificExpenses(props.row)"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { ExpensesDto, SupplierDto } from 'src/services/rest-api';
import { Vue, Options } from 'vue-class-component';
import { mapState, mapActions } from 'vuex';
import { date, exportFile } from 'quasar';

const timeStamp = Date.now();
const dateNowStr = date.formatDate(timeStamp, 'YYYY-MM-DD:HH:mm');

@Options({
  computed: {
    ...mapState('expenses', ['allExpenses']),
    ...mapState('supplier', ['allSupplier']),
  },
  methods: {
    ...mapActions('expenses', [
      'addExpenses',
      'editExpenses',
      'deleteExpenses',
      'getAllExpenses',
    ]),
  },
})
export default class Expenses extends Vue {
  allExpenses!: ExpensesDto[];
  allSupplier!: SupplierDto[];
  addExpenses!: (payload: ExpensesDto) => Promise<void>;
  editExpenses!: (payload: ExpensesDto) => Promise<void>;
  deleteExpenses!: (payload: ExpensesDto) => Promise<void>;
  getAllExpenses!: () => Promise<void>;

  async mounted() {
    await this.getAllExpenses();
  }

  columns = [
    {
      name: 'expensesID',
      align: 'left',
      label: 'Expenses Reference',
      field: 'expensesID',
    },
    {
      name: 'expensesName',
      required: true,
      label: 'Expenses Name',
      align: 'center',
      field: 'expensesName',
    },
    {
      name: 'category',
      align: 'center',
      label: 'Category',
      field: 'expensesCategory',
    },
    {
      name: 'supplier',
      align: 'center',
      label: 'Supplier',
      field: (row: any) => row.supplier?.company || 'None',
    },
    {
      name: 'expensesDate',
      align: 'center',
      label: 'Date',
      field: 'expensesDate',
    },

    {
      name: 'amount',
      align: 'right',
      label: 'Amount',
      field: 'amount',
    },
    {
      name: 'expensesNote',
      align: 'center',
      label: 'Note',
      field: 'expensesNote',
    },
    {
      name: 'action',
      align: 'center',
      label: 'Action',
      field: 'action',
    },
  ];

  categoryOpt = [
    'Bills',
    'Purchase Order',
    'Rent',
    'Transportation',
    'Miscellaneous/Other',
  ];

  addNewExpenses = false;
  editRowExpenses = false;
  showExpensesNote = false;
  statusExpenses = false;
  filter = '';

  inputExpenses: any = {
    expensesName: '',
    expensesDate: dateNowStr,
    description: '',
    expensesCategory: '',
  };

  async onAddExpenses() {
    await this.addExpenses(this.inputExpenses);
    this.addNewExpenses = false;
    this.resetModel();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Adeded.',
    });
  }

  async onEditExpenses() {
    await this.editExpenses(this.inputExpenses);
    this.editRowExpenses = false;
    this.resetModel();
    this.$q.notify({
      type: 'positive',
      message: 'Successfully Edit.',
    });
  }

  deleteSpecificExpenses(val: ExpensesDto) {
    this.$q
      .dialog({
        message: 'Confirm to delete?',
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteExpenses(val.expensesID as any);
        this.$q.notify({
          type: 'warning',
          message: 'Successfully deleted',
        });
      });
  }

  openEditDialog(val: ExpensesDto) {
    this.editRowExpenses = true;
    this.inputExpenses = { ...val };
  }

  openExpensesNote(val: ExpensesDto) {
    this.showExpensesNote = true;
    this.inputExpenses = { ...val };
  }

  resetModel() {
    this.inputExpenses = {
      expensesName: '',
      expensesDate: dateNowStr,
      description: '',
      expensesCategory: '',
    };
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
      this.wrapCsvValue('Expense Reference'),
      this.wrapCsvValue('Expense Name'),
      this.wrapCsvValue('Category'),
      this.wrapCsvValue('Supplier'),
      this.wrapCsvValue('Date'),
      this.wrapCsvValue('Amount'),
    ];
    const rows = [header.join(',')].concat(
      this.allExpenses.map((c) =>
        [
          this.wrapCsvValue(String(c.expensesID)),
          this.wrapCsvValue(c.expensesName),
          this.wrapCsvValue(String(c.expensesCategory)),
          this.wrapCsvValue(String(c.supplier) || 'None'),
          this.wrapCsvValue(String(c.expensesDate)),
          this.wrapCsvValue(String(c.amount)),
        ].join(',')
      )
    );

    const status = exportFile(
      'ExpenseList-export.csv',
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
