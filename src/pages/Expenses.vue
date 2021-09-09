<template>
  <div class="q-pa-md">
    <div class="text-h4 q-pb-lg text-bold">
      <q-icon
        name="account_circle"
        color="light-blue-6"
        style="font-size: 4rem"
      />
      Expenses
    </div>
    <q-table
      title="Account List"
      :rows="rows"
      :columns="columns"
      row-key="reference"
      :rows-per-page-options="[0]"
      :filter="filter"
      :selected-rows-label="getSelectedString"
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
            label="Add User"
            color="primary"
            dense
            flat
            icon="add"
            @click="addUser = true"
          />
          <q-dialog v-model="addUser" persistent>
            <q-card style="width: 350px"><div>Add expenses</div> </q-card>
          </q-dialog>
        </div>
      </template>

      <template v-slot:body-cell-action="props"
        >F
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
              <q-card style="width: 350px">
                <q-card-section class="row">
                  <div class="text-h6">Edit User</div>
                  <q-space />
                  <q-btn flat round dense icon="close" v-close-popup />
                </q-card-section>

                <q-card-section class="q-gutter-md">
                  <q-input outlined v-model="name" label="First Name" />
                  <q-input outlined v-model="name" label="Middle Initial" />
                  <q-input outlined v-model="name" label="Last Name" />
                  <q-input outlined v-model="username" label="Username" />
                  <q-input outlined v-model="password" label="Password" />
                  <q-input
                    outlined
                    v-model="email"
                    label="Email"
                    type="email"
                  />
                  <q-select
                    outlined
                    v-model="role"
                    :options="options"
                    label="Roles"
                  />
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
      amount: '10,000',
      note: '',
    },
  ];
  selected = [];

  dialog = false;
  cancelEnabled = true;
  addUser = false;
  editRow = false;
  name = '';
  username = '';
  password = '';
  email = '';
  role = '';
  filter = '';
  options = ['Admin', 'Cashier'];
}
</script>
