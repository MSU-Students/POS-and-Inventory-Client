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
                  title="Selected Order"
                  :rows="SelRows"
                  :columns="SelColumns"
                  row-key="SelProd"
                  hide-bottom
                >
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="SelProd" :props="props">
                        {{ props.row.SelProd }}
                      </q-td>
                      <q-td key="prodPrice" :props="props"
                        >{{ props.row.prodPrice }}
                      </q-td>
                      <q-td key="prodQuant" :props="props">
                        {{ props.row.prodQuant }}
                        <q-popup-edit
                          v-model="props.row.prodQuant"
                          title="Update quantity"
                          buttons
                        >
                          <q-input
                            type="number"
                            v-model="props.row.quantity"
                            dense
                            autofocus
                          />
                        </q-popup-edit>
                      </q-td>

                      <q-td key="subTotal" :props="props"
                        >{{ props.row.subTotal }}
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
interface SelRow {
  SelProd: string;
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

  SelColumns = [
    {
      name: 'SelProd',
      required: true,
      label: 'Product',
      align: 'left',
      field: (SelRows: SelRow) => SelRows.SelProd,
      format: (val: string) => `${val}`,
    },
    {
      name: 'prodPrice',
      align: 'center',
      label: 'Price',
      field: 'prodPrice',
    },
    {
      name: 'prodQuant',
      align: 'center',
      label: 'Quantity',
      field: 'prodQuant',
    },
    {
      name: 'subTotal',
      align: 'center',
      label: 'Sub Total',
      field: 'subTotal',
    },
  ];
  SelRows = [
    {
      selProd: 'Mocah',
      prodPrice: '120',
      prodQuant: '1',
      subTotal: '120',
    },
    {
      selProd: 'Mocah',
      prodPrice: '120',
      prodQuant: '1',
      subTotal: '120',
    },
  ];
  filter = '';
}
</script>
