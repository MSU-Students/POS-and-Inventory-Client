<template>
  <div class="q-pa-md">
    <div class="text-h4 q-pb-lg text-bold row">
      <q-icon name="point_of_sale" color="orange" style="font-size: 4rem" />
      POS
    </div>
    <div class="row q-gutter-md">
      <div class="col-7">
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
                  row-key="SelProd"
                  wrap-cells
                  hide-bottom
                >
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="SelProd" :props="props">
                        {{ props.row.SelProd }}
                      </q-td>
                      <q-td key="prodQuant" :props="props">
                        {{ props.row.prodQuant }}
                        <q-popup-edit
                          v-model="props.row.prodQuant"
                          title="Update quantity"
                          buttons
                          v-slot="editQuant"
                        >
                          <q-input
                            type="number"
                            v-model="editQuant.value"
                            dense
                            autofocus
                            counter
                            @keyup.enter="editQuant.set"
                          />
                        </q-popup-edit>
                      </q-td>
                      <q-td key="price" :props="props">
                        {{ props.row.price }}
                      </q-td>
                      <q-td key="subtotal" :props="props">
                        {{ props.row.subtotal }}
                      </q-td>
                      <q-td key="action" :props="props">
                        {{ props.row.action }}
                        <div>
                          <q-btn
                            color="red-10"
                            icon="remove"
                            size="sm"
                            class="q-ml-sm"
                            flat
                            round
                            dense
                          />
                        </div>
                      </q-td>
                    </q-tr>
                  </template>

                  <template v-slot:body-cell-action="props">
                    <q-td :props="props"> </q-td>
                  </template>
                </q-table>
              </q-card-section>

              <q-separator inset />

              <q-card-section>
                <div class="row">
                  <div class="col">Grand Total:</div>
                  <div class="col text-right q-px-sm">₱100000.000</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-card>
        <div class="row justify-end q-pt-sm">
          <q-btn push color="primary" label="Confirm Order" />
        </div>
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
  filter = '';

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
      name: 'SelProd',
      required: true,
      label: 'Product',
      align: 'left',
      field: (row: SelRow) => row.SelProd,
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
      label: 'Price',
      field: 'price',
    },
    {
      name: 'subtotal',
      align: 'center',
      label: 'SubTotal',
      field: 'subtotal',
    },
    {
      name: 'action',
      align: 'center',
      label: 'Action',
      field: 'action',
    },
  ];

  rows2 = [
    {
      SelProd: 'Frozen Yogurt',
      prodQuant: 125,
      price: 10,
      subtotal: 300,
    },
    {
      SelProd: 'Ice cream sandwich',
      prodQuant: 300,
      price: 10,
      subtotal: 300,
    },
    {
      SelProd: 'Eclair',
      prodQuant: 1,
      price: 10,
      subtotal: 300,
    },
    {
      SelProd: 'Cupcake',
      prodQuant: 40,
      price: 10,
      subtotal: 300,
    },
    {
      SelProd: 'Gingerbread',
      prodQuant: 5,
      price: 10,
      subtotal: 300,
    },
  ];
}
</script>
