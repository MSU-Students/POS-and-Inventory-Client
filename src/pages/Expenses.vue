<template>
  <div class="q-pa-md">
    <div class="text-h4 q-pb-lg text-bold">
      <q-icon name="payments" color="indigo" style="font-size: 4rem" />
      Expenses
    </div>
    <q-table
      title="Expenses List"
      :rows="rows"
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
            @click="addExp = true"
          />
          <q-dialog v-model="addExp" persistent>
            <q-card style="width: 700px" class="q-pa-md">
              <q-card-section class="row">
                <div class="text-h6">Edit Expenses</div>
                <q-space />
                <q-btn flat round dense icon="close" v-close-popup />
              </q-card-section>

              <q-card-section class="q-gutter-md row">
                <div class="col">
                  <q-select
                    filled
                    v-model="categoryInit"
                    :options="options"
                    label="Category"
                  />
                </div>
                <div class="col">
                  <q-input filled label="Amount" prefix="₱" />
                </div>
              </q-card-section>
              <q-card-section class="q-gutter-md row">
                <div class="col">
                  <q-select
                    label="Supplier ID (Optional)"
                    transition-show="scale"
                    transition-hide="scale"
                    filled
                    v-model="sInit"
                    :options="suppID"
                  />
                </div>
                <div class="col">
                  <q-select
                    label="Purchase No:"
                    transition-show="scale"
                    transition-hide="scale"
                    filled
                    v-model="pInit"
                    :options="purNo"
                  />
                </div>
              </q-card-section>
              <q-card-section class="q-pa-md" style="max-width: 600px">
                <q-input filled label="Note" type="textarea" />
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="red-10" v-close-popup />
                <q-btn flat label="Save" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </template>
      <template v-slot:body-cell-note="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn
              round
              color="blue"
              icon="description"
              size="sm"
              flat
              dense
              @click="showNote = true"
            />
            <q-dialog v-model="showNote">
              <q-card flat bordered>
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
              @click="editRow = true"
            />
            <q-dialog v-model="editRow" persistent>
              <q-card style="width: 700px" class="q-pa-md">
                <q-card-section class="row">
                  <div class="text-h6">Edit Expenses</div>
                  <q-space />
                  <q-btn flat round dense icon="close" v-close-popup />
                </q-card-section>

                <q-card-section class="q-gutter-md row">
                  <div class="col">
                    <q-select
                      filled
                      v-model="categoryInit"
                      :options="options"
                      label="Category"
                    />
                  </div>
                  <div class="col">
                    <q-input filled label="Amount" prefix="₱" />
                  </div>
                </q-card-section>
                <q-card-section class="q-gutter-md row">
                  <div class="col">
                    <q-select
                      label="Supplier ID (Optional)"
                      transition-show="scale"
                      transition-hide="scale"
                      filled
                      v-model="sInit"
                      :options="suppID"
                    />
                  </div>
                  <div class="col">
                    <q-select
                      label="Purchase No:"
                      transition-show="scale"
                      transition-hide="scale"
                      filled
                      v-model="pInit"
                      :options="purNo"
                    />
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-md" style="max-width: 600px">
                  <q-input filled label="Note" type="textarea" />
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="Cancel" color="red-10" v-close-popup />
                  <q-btn flat label="Save" color="primary" v-close-popup />
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
              @click="dialog = true"
            />
            <q-dialog v-model="dialog" persistent>
              <q-card style="width: 300px">
                <q-card-section class="row items-center">
                  <q-avatar
                    size="sm"
                    icon="warning"
                    color="red-10"
                    text-color="white"
                  />
                  <span class="q-ml-sm">Confirm Delete?</span>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn
                    flat
                    label="Cancel"
                    color="primary"
                    v-close-popup="cancelEnabled"
                    :disable="!cancelEnabled"
                  />
                  <q-btn flat label="Confirm" color="primary" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

interface IRow {
  reference: string;
}
@Options({})
export default class Expenses extends Vue {
  columns = [
    {
      name: 'reference',
      required: true,
      label: 'Reference Number',
      align: 'left',
      field: (row: IRow) => row.reference,
      format: (val: string) => `${val}`,
    },
    {
      name: 'date',
      align: 'center',
      label: 'Date',
      field: 'date',
    },
    {
      name: 'category',
      align: 'center',
      label: 'Category',
      field: 'category',
    },
    {
      name: 'supplier',
      align: 'center',
      label: 'Supplier',
      field: 'supplier',
    },
    {
      name: 'amount',
      align: 'center',
      label: 'Amount',
      field: 'amount',
    },
    {
      name: 'note',
      align: 'center',
      label: 'Note',
      field: 'note',
    },
    {
      name: 'action',
      align: 'center',
      label: 'Action',
      field: 'action',
    },
  ];

  rows = [
    {
      reference: 'hj4j324jbb34bj4',
      date: '12/23/2021',
      category: 'Utensils',
      supplier: 'Coca Cola Company',
      amount: '10,000',
      note: '',
    },
  ];
  selected = [];
  Note =
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!';
  dialog = false;
  cancelEnabled = true;
  addExp = false;
  editRow = false;
  showNote = false;
  suppID = [2020119, 2020221, 2020113];
  purNo = ['Chocolate Powder'];
  filter = '';
  options = ['Admin', 'Cashier'];
  pInit = null;
  sInit = null;
  categoryInit = null;
}
</script>
