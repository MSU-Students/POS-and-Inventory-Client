<template>
  <div class="q-pa-md">
    <div class="text-h4 q-pb-lg text-bold row">
      <q-icon name="point_of_sale" color="orange" style="font-size: 4rem" />
      POS
    </div>
    <div class="row q-gutter-md">
      <div class="col-8">
        <q-card class="fit">
          <div class="q-pa-md">
            <q-table
              title="Menu"
              :rows="rows"
              :columns="columns"
              row-key="name"
              :filter="filter"
              grid
              hide-header
              hide-bottom
            >
              <template v-slot:top-right>
                <q-input
                  borderless
                  dense
                  debounce="300"
                  v-model="filter"
                  placeholder="Search"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>
              <template v-slot:body-cell-action="props">
                <q-td :props="props">
                  <q-badge :label="props.value"></q-badge>
                </q-td>
              </template>
            </q-table>
          </div>
        </q-card>
      </div>
      <div class="col">
        <q-card>
          <div>
            <q-card flat bordered class="my-card">
              <q-card-section>
                <q-table
                  :rows="rows2"
                  :columns="columns2"
                  title="Selected Order"
                  :rows-per-page-options="[]"
                  row-key="name"
                  wrap-cells
                >
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="name" :props="props">
                        {{ props.row.name }}
                      </q-td>
                      <q-td key="prodQuant" :props="props">
                        {{ props.row.prodQuant }}
                      <q-popup-edit v-model="props.row.prodQuant" buttons v-slot="scope">
                         <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                      </q-popup-edit>
                    </q-td>
                    <q-td key="price" :props="props">
                        {{ props.row.price }}
                      <q-popup-edit v-model="props.row.price" buttons v-slot="scope">
                         <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                      </q-popup-edit>
                    </q-td>
                    <q-td key="subtotal" :props="props">
                        {{ props.row.subtotal }}
                      <q-popup-edit v-model="props.row.subtotal" buttons v-slot="scope">
                         <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
                      </q-popup-edit>
                    </q-td>
                      
                    </q-tr>
                  </template>
                </q-table>
              </q-card-section>

              <q-separator inset />

              <q-card-section>Grand Total: </q-card-section>
            </q-card>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

interface IRow {
  name: string;
}

@Options({})
export default class POS extends Vue {
  columns = [
    {
      name: 'name',
      required: true,
      label: 'Dessert (100g serving)',
      align: 'left',
      field: (row: IRow) => row.name,
      format: (val: string) => `${val}`,
      sortable: true,
    },

    {
      name: 'price',
      align: 'price',
      label: 'price',
      field: 'price',
    },
    {
      name: 'img',
      label: 'img',
      field: 'img',
      sortable: true,
      style: 'width: 10px',
    },
  ];

  rows = [
    {
      name: 'Frozen Yogurt',
      price: 10,
    },
    {
      name: 'Ice cream sandwich',
      price: 10,
    },
    {
      name: 'Eclair',
      price: 10,
    },
    {
      name: 'Cupcake',
      price: 10,
    },
    {
      name: 'Gingerbread',
      price: 10,
    },
    {
      name: 'Jelly bean',
      price: 10,
    },
    {
      name: 'Lollipop',
      price: 10,
    },
    {
      name: 'Honeycomb',
      price: 10,
    },
    {
      name: 'Donut',
      price: 10,
    },
    {
      name: 'KitKat',
      price: 10,
    },
  ];

  columns2 = [
    {
      name: 'name',
      required: true,
      label: 'Product',
      align: 'left',
      field: (row: IRow) => row.name,
      format: (val: string) => `${val}`,
      sortable: true,
    },

    {
      name: 'prodQuant',
      align: 'center',
      label: 'Quantity',
      field: 'prodQuant',
      sortable: true,    
    },
    {
      name: 'price',
      align: 'center',
      label: 'price',
      field: 'price',
    },
    {
      name: 'subtotal',
      align: 'center',
      label: 'subtotal',
      field: 'subtotal',
    },
  ];

  rows2 = [
    {
      name: 'Frozen Yogurt',
      prodQuant:125,
      price: 10,
      subtotal: 300,
    },
    {
      name: 'Ice cream sandwich',
      prodQuant:300,
      price: 10,
      subtotal: 300,
    },
    {
      name: 'Eclair',
      prodQuant:1,
      price: 10,
      subtotal: 300,
    },
    {
      name: 'Cupcake',
      prodQuant:40,
      price: 10,
      subtotal: 300,
    },
    {
      name: 'Gingerbread',
      prodQuant:5,
      price: 10,
      subtotal: 300,
    },
  ];
  
  filter = '';
}
</script>
