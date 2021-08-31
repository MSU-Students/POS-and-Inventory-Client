<template>
  <div class="q-pa-md">
    <div class="text-h4 text-bold">
      <q-icon
        name="local_shipping"
        color="light-blue-6"
        style="font-size: 4rem"
      />
      Supplier
    </div>

    <br />
    
    <q-table 
      title="Supplier"
      :rows="rows"
      :columns="columns"
      row-key="name"
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
            label="Add User"
            color="primary"
            dense
            flat
            icon="add"
            @click="addUser = true"
          />
          <q-dialog v-model="addUser">
            <q-card style="width: 350px">
              <q-card-section class="row">
                <div class="text-h6">Add User</div>
                <q-space />
                <q-btn flat round dense icon="close" v-close-popup />
              </q-card-section>

              <q-card-section class="q-gutter-md">
                    <q-input outlined v-model="name" label="full name" />
                    <q-input outlined v-model="contact" label="contact" />
                    <q-input outlined v-model="revenue" label="Revenue " />

              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="red-10" v-close-popup />
                <q-btn flat label="Add" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      
      <template v-slot:body-cell-Actions="props">
        <q-tr :props="props">
          <div  class="q-px-md q-gutter-sm row">
            <q-td>
              <q-btn
                round
                color="blue"
                icon="edit"
                size="sm"
                flat
                dense
                @click="editRow = true"
              />
              <q-dialog v-model="editRow">
                <q-card style="width: 350px">
                  <q-card-section class="row">
                    <div class="text-h6">Edit User</div>
                    <q-space />
                    <q-btn flat round dense icon="close" v-close-popup />
                  </q-card-section>

                  <q-card-section class="q-gutter-md">
                    <q-input outlined v-model="name" label="full name" />
                    <q-input outlined v-model="contact" label="contact" />
                    <q-input outlined v-model="revenue" label="Revenue " />
                    
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
            </q-td>
          </div>

          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
interface IRow {
  name: string;
}
@Options({})
export default class ManageAccount extends Vue {
  columns = [
    {
      name: 'name',
      required: true,
      label: 'Name',
      align: 'left',
      field: (row: IRow) => row.name,
      format: (val: string) => `${val}`,
    },
    {
      name: 'Contact',
      align: 'center',
      label: 'Contact',
      field: 'Contact',
    },
    {
      name: 'dateCreated',
      align: 'center',
      label: 'Date Created',
      field: 'dateCreated',
    },
    { name: 'Revenue', 
      align: 'center', 
      label: 'Revenue', 
      field: 'Revenue' 
    },
    { name: 'Actions', 
      align: 'center', 
      label: 'Actions', 
      field: 'Actions' 
    },
    
  ];
  rows = [
    {
      name: 'Basam C. Serad',
      Contact: '+6392222222',
      dateCreated: 'December 23, 1998',
      Revenue: '$500',
    },
    
  ];
  dialog = false;
  cancelEnabled = true;
  addUser = false;
  editRow = false;
  name = '';
  contact = '';
  revenue = '';
  filter = '';
  options = ['Admin', 'Cashier'];

  onItemClick() {
    console.log('Clicked!');
  }
}
</script>
