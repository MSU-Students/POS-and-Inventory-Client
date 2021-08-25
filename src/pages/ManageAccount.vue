<template>
  <div class="q-pa-md">
    <div class="text-h4 text-bold">Account Management</div>
    <div class="row q-gutter-md">
      <q-card class="my-card bg-secondary text-white">
        <q-card-section>
          <div class="text-h6 text-center">Total Users</div>
        </q-card-section>
        <q-separator dark />
      </q-card>
      <q-card class="my-card bg-secondary text-white">
        <q-card-section>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
        </q-card-section>

        <q-card-section> </q-card-section>

        <q-separator dark />

        <q-card-actions>
          <q-btn flat>Action 1</q-btn>
          <q-btn flat>Action 2</q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <br />
    <q-table
      title="Account List"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[0]"
    >
      <template v-slot:top-right>
        <div class="q-pa-md q-gutter-sm">
          <q-btn
            label="Add User"
            color="primary"
            dense
            flat
            icon="add"
            @click="addUser = true"
          />
          <q-dialog v-model="addUser">
            <q-card>
              <q-card-section class="row">
                <div class="text-h6">Add User</div>
                <q-space />
                <q-btn flat round dense icon="close" v-close-popup />
              </q-card-section>

              <q-card-section class="q-gutter-md">
                <q-input outlined v-model="addName" label="Name" />
                <q-input outlined v-model="addUsername" label="Username" />
                <q-input outlined v-model="addPass" label="Password" />
                <q-input
                  outlined
                  v-model="addEmail"
                  label="Email"
                  type="email"
                />
                <q-input outlined v-model="addRole" label="Role" />
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

      <template v-slot:body="props">
        <q-tr :props="props">
          <div>
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
                <q-card>
                  <q-card-section class="row">
                    <div class="text-h6">Edit User</div>
                    <q-space />
                    <q-btn flat round dense icon="close" v-close-popup />
                  </q-card-section>

                  <q-card-section class="q-gutter-md">
                    <q-input outlined v-model="addName" label="Name" />
                    <q-input outlined v-model="addUsername" label="Username" />
                    <q-input outlined v-model="addPass" label="Password" />
                    <q-input
                      outlined
                      v-model="addEmail"
                      label="Email"
                      type="email"
                    />
                    <q-input outlined v-model="addRole" label="Role" />
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="red-10" v-close-popup />
                    <q-btn flat label="Add" color="primary" v-close-popup />
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
                <q-card>
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
<script>
import { useQuasar } from 'quasar';
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
  },
  {
    name: 'email',
    align: 'center',
    label: 'Email',
    field: 'email',
  },
  {
    name: 'dateCreated',
    align: 'center',
    label: 'Date Created',
    field: 'dateCreated',
  },
  { name: 'role', align: 'center', label: 'Role', field: 'role' },
  { name: 'status', align: 'center', label: 'Status', field: 'status' },
  {
    name: 'lastLogin',
    align: 'center',
    label: 'Last Login',
    field: 'lastLogin',
  },
];
const rows = [
  {
    name: 'Basam C. Serad',
    email: 'basamserad1998@gmail.com',
    dateCreated: 'December 23, 1998',
    role: 'Admin',
    status: 'Active',
    lastLogin: '11 / 11 / 2001',
  },
];
export default {
  data() {
    return {
      columns,
      rows,
      dialog:false,
      cancelEnabled: true,
      addUser: false,
      editRow: false,
    };
  },
};
</script>
