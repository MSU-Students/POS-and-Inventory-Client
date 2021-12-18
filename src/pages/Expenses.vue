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
      selection="multiple"
      v-model:selected="selected"
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
                  <div class="q-gutter-md q-py-sm row">
                    <div class="col">
                      <q-input
                        filled
                        label="Expenses Name"
                        v-model="inputExpenses.expensesName"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        label="Amount"
                        prefix="₱"
                        mask="#.##"
                        fill-mask="0"
                        reverse-fill-mask
                        v-model="inputExpenses.expensesAmount"
                      />
                    </div>
                  </div>
                  <div class="q-gutter-md q-py-sm row">
                    <div class="col">
                      <q-select
                        label="Category"
                        transition-show="scale"
                        transition-hide="scale"
                        filled
                        v-model="inputExpenses.category"
                      />
                    </div>
                    <div class="col">
                      <q-select
                        label="Supplier"
                        transition-show="scale"
                        transition-hide="scale"
                        filled
                        v-model="inputExpenses.supplier"
                      />
                    </div>
                  </div>
                  <div class="q-pa-md" style="full-width" full-width>
                    <q-input
                      filled
                      label="Note"
                      type="textarea"
                      v-model="inputExpenses.expensesNote"
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
              @click="showexpensesNote = true"
            />
            <q-dialog v-model="showexpensesNote">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-h6">
                    Expenses expensesNote
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
                  <div>Reference Number:</div>
                  <div>Category:</div>
                  <div>Date:</div>
                </q-card-section>

                <q-separator />

                <q-card-section>
                  Assessing clients needs and present suitable promoted
                  products. Liaising with and persuading targeted doctors to
                  prescribe our products utilizing effective sales skills.
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
                    <div class="q-gutter-md q-py-sm row">
                      <div class="col">
                        <q-input
                          filled
                          label="Expenses Name"
                          v-model="inputExpenses.expensesName"
                        />
                      </div>
                      <div class="col">
                        <q-input
                          filled
                          label="Amount"
                          prefix="₱"
                          mask="#.##"
                          fill-mask="0"
                          reverse-fill-mask
                          v-model="inputExpenses.expensesAmount"
                        />
                      </div>
                    </div>
                    <div class="q-gutter-md q-py-sm row">
                      <div class="col">
                        <q-select
                          label="Category"
                          transition-show="scale"
                          transition-hide="scale"
                          filled
                          v-model="inputExpenses.category"
                        />
                      </div>
                      <div class="col">
                        <q-select
                          label="Supplier"
                          transition-show="scale"
                          transition-hide="scale"
                          filled
                          v-model="inputExpenses.supplier"
                        />
                      </div>
                    </div>
                    <div class="q-pa-md" style="full-width" full-width>
                      <q-input
                        filled
                        label="Note"
                        type="textarea"
                        v-model="inputExpenses.expensesNote"
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
import { Vue, Options } from 'vue-class-component';
import { IExpensesInfo } from '../store/expenses/state';
import { mapState, mapActions } from 'vuex';
@Options({
  computed: {
    ...mapState('expenses', ['allExpenses']),
  },
  methods: {
    ...mapActions('expenses', [
      'addExpenses',
      'editExpenses',
      'deleteExpenses',
    ]),
  },
})
export default class Expenses extends Vue {
  allExpenses!: IExpensesInfo;
  addExpenses!: (payload: IExpensesInfo) => Promise<void>;
  editExpenses!: (payload: IExpensesInfo) => Promise<void>;
  deleteExpenses!: (payload: IExpensesInfo) => Promise<void>;

  columns = [
    {
      name: 'reference',
      required: true,
      label: 'Reference Number',
      align: 'left',
      field: (row: IExpensesInfo) => row.expensesReference,
      format: (val: string) => `${val}`,
    },
    {
      name: 'expensesName',
      align: 'center',
      label: 'Expenses',
      field: 'expensesName',
    },
    {
      name: 'expensesDateCreated',
      align: 'center',
      label: 'Date',
      field: 'expensesDateCreated',
    },
    {
      name: 'category',
      align: 'center',
      label: 'Category',
      field: 'category',
    },
    {
      name: 'expensesAmount',
      align: 'center',
      label: 'Amount',
      field: 'expensesAmount',
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

  selected = [];
  expensesNote =
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!';
  ConfirmDelete = false;
  cancelEnabled = true;
  addNewExpenses = false;
  editRowExpenses = false;
  showexpensesNote = false;
  filter = '';

  pInit = null;
  sInit = null;
  categoryInit = null;
  suppID = [2020119, 2020221, 2020113];
  purNo = ['Chocolate Powder'];
  options = ['Admin', 'Cashier'];

  inputExpenses: IExpensesInfo = {
    expensesReference: '',
    expensesName: '',
    expensesDateCreated: '',
    category: '',
    supplier: '',
    expensesAmount: 0,
    expensesNote: '',
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

  deleteSpecificExpenses(val: IExpensesInfo) {
    this.$q
      .dialog({
        message: 'Confirm to delete?',
        cancel: true,
        persistent: true,
      })
      .onOk(async () => {
        await this.deleteExpenses(val);
        this.$q.notify({
          type: 'warning',
          message: 'Successfully deleted',
        });
      });
  }

  openEditDialog(val: IExpensesInfo) {
    this.editRowExpenses = true;
    this.inputExpenses = { ...val };
  }

  resetModel() {
    this.inputExpenses = {
      expensesReference: '',
      expensesName: '',
      expensesDateCreated: '',
      category: '',
      supplier: '',
      expensesAmount: 0,
      expensesNote: '',
    };
  }
}
</script>
