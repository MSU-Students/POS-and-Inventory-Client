<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 q-pb-lg text-bold">
      <q-icon name="payments" color="indigo" style="font-size: 4rem" />
      Expenses
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
            color="primary"
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
                        v-model="inputExpenses.supplierSupplierID"
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
      <template v-slot:body-cell-expensesNote="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn
              round
              color="blue"
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
              color="blue"
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
                          v-model="inputExpenses.supplierSupplierID"
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
import { date } from 'quasar';

const timeStamp = Date.now();
const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD:HH:mm');

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
      file: 'expensesName',
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
      align: 'center',
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

  inputExpenses: ExpensesDto = {
    expensesName: '',
    expensesDate: formattedString,
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
      expensesDate: formattedString,
      description: '',
      expensesCategory: '',
    };
  }
}
</script>
