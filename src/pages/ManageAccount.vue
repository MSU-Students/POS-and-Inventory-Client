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
    >
      <template v-slot:top-right>
        <q-btn color="primary" dense flat label="Add User" icon="add" />
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
              <q-btn round color="blue" icon="edit" size="sm" flat dense />
              <q-btn
                color="red-10"
                icon="delete"
                size="sm"
                class="q-ml-sm"
                flat
                round
                dense
                field="edit"
                @click="editItem(props.row)"
              />
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
  setup() {
    return {
      columns,
      rows,
    };
  },
};
</script>
