<template>
  <div class="q-pa-md">
    <div class="q-pa-md row q-gutter-md">
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
    <div class="row justify-end">
      <q-btn push color="primary" dense rounded label="Add User" icon="add" />
    </div>
    <div class="q-pa-md">
      <q-table
        title="Account List"
        :rows="rows"
        :columns="columns"
        row-key="name"
      >
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
                <q-btn size="sm" color="blue" round dense icon="edit" />
              </q-td>
              <q-td>
                <q-btn size="sm" color="red-10" round dense icon="delete" />
              </q-td>
            </div>

            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
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
