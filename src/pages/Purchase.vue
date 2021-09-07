<template>
  <div class="q-pa-md">
    <div class="text-h4 text-bold">
      <q-icon
        name="shopping_bag"
        color="light-blue-6"
        style="font-size: 4rem"
      />
      Purchase
    </div>
    <div class="q-mt-lg">
      <div class="q-gutter-sm q-pa-sm row">
        <q-space />
        <q-btn
          color="teal"
          icon-right="archive"
          label="Import Purchase"
          no-caps
          @click="importTable"
        />
        <q-btn
          color="purple"
          icon-right="archive"
          label="Export to csv"
          no-caps
          @click="exportTable"
        />
      </div>
    </div>
    <q-table
      title="Account List"
      :rows="rows"
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
            label="Add Purchase"
            color="primary"
            dense
            flat
            icon="add"
            @click="addUser = true"
          />
          <q-dialog v-model="addUser" persistent>
            <q-card>
              <q-card-section class="row">
                <div class="text-h6">Add Purchase</div>
                <q-space />
                <q-btn flat round dense icon="close" v-close-popup />
              </q-card-section>

              <q-card-section class="q-gutter-md row">
                <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                  <q-input
                    filled
                    v-model="name"
                    label="Your name *"
                    hint="Name and surname"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Please type something',
                    ]"
                  />

                  <q-input
                    filled
                    type="number"
                    v-model="age"
                    label="Your age *"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val !== null && val !== '') || 'Please type your age',
                      (val) =>
                        (val > 0 && val < 100) || 'Please type a real age',
                    ]"
                  />

                  <div>
                    <q-btn label="Submit" type="submit" color="primary" />
                    <q-btn
                      label="Reset"
                      type="reset"
                      color="primary"
                      flat
                      class="q-ml-sm"
                    />
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
import { exportFile } from 'quasar';
interface IRow {
  product: string;
}
@Options({})
export default class ManageAccount extends Vue {
  columns = [
    {
      name: 'product',
      required: true,
      label: 'Product',
      align: 'left',
      field: (row: IRow) => row.product,
      format: (val: string) => `${val}`,
    },
    {
      name: 'date',
      align: 'center',
      label: 'Date',
      field: 'date',
    },
    {
      name: 'supplier',
      align: 'center',
      label: 'Supplier',
      field: 'supplier',
    },
    {
      name: 'status',
      align: 'center',
      label: 'Purchase Status',
      field: 'status',
    },
    {
      name: 'total',
      align: 'center',
      label: 'Grand Total',
      field: 'total',
    },
    { name: 'paid', align: 'center', label: 'Paid', field: 'paid' },
    { name: 'balance', align: 'center', label: 'Balance', field: 'balance' },
    {
      name: 'paystatus',
      align: 'center',
      label: 'Purchase Status',
      field: 'paystatus',
    },
    { name: 'action', align: 'center', label: 'Action', field: 'action' },
  ];
  rows = [
    {
      product: 'Chocolate Powder',
      date: '9/24/2021',
      supplier: 'Milo Company',
      status: 'Pending',
      total: '200 packs',
      paid: 'Partial',
      balance: 'Paid',
      paystatus: 'Ongoing',
    },
  ];
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
  age = '';

  options = ['Admin', 'Cashier'];

  // onSubmit() {}

  // onReset() {}

  onItemClick() {
    console.log('Clicked!');
  }
}
</script>
