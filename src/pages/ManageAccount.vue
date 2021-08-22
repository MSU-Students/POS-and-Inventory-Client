<template>
  <div class="q-pa-md">
    <q-card class="rounded-borders elevated" style="max-width: 250px">
      <q-card-section class="bg-teal text-white shadow-2" align="center">
        <div class="text-h6">Total User</div>
      </q-card-section>

      <q-separator inset />

      <q-card-section align="center"> 1 active user </q-card-section> </q-card
    ><br />
    <q-table
      title="Account"
      :rows="rows"
      :columns="columns"
      row-key="name"
      selection="single"
      v-model:selected="selected"
    >
      <!-- <template v-slot:body="props">
      <q-tr :props="props">
        <q-td auto auto-width
      </q-tr>
    </template> -->
    </q-table>
  </div>
</template>
<script>
import { ref } from 'vue';

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
    name: 'contact',
    align: 'center',
    label: 'Contact Number',
    field: 'contact',
  },
  { name: 'role', align: 'center', label: 'Role', field: 'role' },
  { name: 'status', align: 'center', label: 'Status', field: 'status' },
  { name: 'login', align: 'center', label: 'Last Login', field: 'login' },
];

const rows = [
  {
    name: 'Admin',
    contact: '09631358292',
    role: 'Admin',
    status: 'Active',
    login: '2021/23/2:10:00',
  },
];

export default {
  setup() {
    return {
      selected: ref([]),
      columns,
      rows,
    };
  },
};
</script>
