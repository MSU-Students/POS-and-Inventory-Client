<template>
  <div class="q-pa-md ">
    <div class="text-h4 q-pb-lg text-bold row">
        <q-icon name="point_of_sale" color="orange" style="font-size: 4rem" />
        POS
    </div>
    <div class="row">
    <div class="q-pa-md col-8">
    <q-table
      title="Menu"
      :rows="rows"
      :columns="columns"
      row-key="name"
      selection="multiple"
      v-model:selected="selected"
      :filter="filter"
      grid
      hide-header
    >
    
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
            <q-badge :label="props.value"></q-badge>
            <img :src="images[props.row.imageIndex].url"/>
        </q-td> 
      </template>
    </q-table>
  </div>
   <div class="col-4" >
      <q-card flat bordered class="my-card">
      <q-card-section>
        <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Selected</q-toolbar-title>
    </q-toolbar>
    <q-list dense bordered padding class="rounded-borders">
      <q-item>
        <q-item-section>
          Item
        </q-item-section>
      </q-item>

      <q-item >
        <q-item-section>
          Item
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          Item
        </q-item-section>
      </q-item>
    </q-list>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
       Total:
      </q-card-section>
    </q-card>
 
    </div>
    </div>
  </div>
  
</template>

<script>
import { ref } from 'vue'

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  
    {
      name: 'price',
      align: 'price',
      label: 'price',
      field: 'price',
    },
  { name: 'img', 
    label: 'img', 
    field: 'img', 
    sortable: true, 
    style: 'width: 10px' 
  }
]

const rows = [
  {
    name: 'Frozen Yogurt',
    price: 10
    
  },
  {
    name: 'Ice cream sandwich',
    price: 10
  },
  {
    name: 'Eclair',
    price: 10
  
    
  },
  {
    name: 'Cupcake',
    price: 10
  },
  {
    name: 'Gingerbread',
    price: 10
  },
  {
    name: 'Jelly bean',
    price: 10
  },
  {
    name: 'Lollipop',
    price: 10
  },
  {
    name: 'Honeycomb',
    price: 10
  },
  {
    name: 'Donut',
    price: 10
  },
  {
    name: 'KitKat',
    price: 10
  }
]

export default {
  setup () {
    return {
      filter: ref(''),
      selected: ref([]),
      columns,
      rows
    }
  }
}
</script>
