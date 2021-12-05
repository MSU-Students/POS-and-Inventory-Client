<template>
    <q-page class="q-pa-lg">
    <div class="text-h4 q-pb-lg text-bold">
      <q-icon name="archive" color="indigo" style="font-size: 4rem" />
      Stock Report
    </div>
    <div class="row">
      <div class="q-pr-md col-10">
        <q-card class="">
          <q-table
          title="Inventory List"
          :rows="rows"
          :columns="columns"
          row-key="itemCode"
          :rows-per-page-options="[0]"
          :filter="filter"
          selection="multiple"
          
          v-model:selected="selected"
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
                  <q-fab
                    color="teal-8"
                    icon="sort"
                    direction="down"
                    label="Filter by:"
                    label-position="top"
                    external-label
                    padding="xs"
                  >
                    <div class="q-gutter-md">
                      <q-fab-action
                        color="teal-12"
                        text-color="black"
                        @click="filter = 'utensil'"
                        label="utensil"
                      />
                      <q-fab-action
                        color="teal-12"
                        text-color="black"
                        @click="filter = 'Ingredient'"
                        label="Ingredient"
                      />
                      <q-fab-action
                        color="teal-12"
                        text-color="black"
                        @click="filter = 'Equipment'"
                        label="Equipment"
                      />
                      <q-fab-action
                        color="teal-12"
                        text-color="black"
                        @click="filter = ''"
                        icon="clear"
                      />
                    </div>
                  </q-fab>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
          </template>
        </q-table>

        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';

interface IRow {
  itemCode: string;
}
@Options({})
export default class Expenses extends Vue {
  columns = [
    {
      name: 'itemCode',
      required: true,
      label: 'Item Code',
      align: 'left',
      field: (row: IRow) => row.itemCode,
      format: (val: string) => `${val}`,
    },
    {
      name: 'itemName',
      align: 'center',
      label: 'Item Name',
      field: 'itemName',
    },

    {
      name: 'quantProd',
      align: 'center',
      label: 'Quantity',
      field: 'quantProd',
    },
    {
      name: 'unitProd',
      align: 'center',
      label: 'Unit',
      field: 'unitProd',
    },
    {
      name: 'catProd',
      align: 'center',
      label: 'Category',
      field: 'catProd',
    },
    {
      name: 'ExpiryDate',
      align: 'center',
      label: 'Expiry Date',
      field: 'ExpiryDate',
    },

    {
      name: 'dateProd',
      align: 'center',
      label: 'Date Stock In',
      field: 'dateProd',
    },

  ];

  rows = [
    {
      itemCode: 'hj4j324jbb34bj4',
      itemName: 'Spoon',
      quantProd: '20000',
      unitProd: 'Packs',
      catProd: 'Utensil',
      ExpiryDate: 'None',
      dateProd: '12/11/2021',
    },
    {
      itemCode: 'hh123h12g3hj13',
      itemName: 'Sugar',
      quantProd: '10',
      unitProd: 'Packs',
      catProd: 'Ingredient',
      ExpiryDate: '12/11/2020',
      dateProd: '12/11/2021',
    },
    {
      itemCode: 'hs11121512u5',
      itemName: 'Black pearls',
      quantProd: '50',
      unitProd: 'Packs',
      catProd: 'Ingredient',
      ExpiryDate: '09/18/2021',
      dateProd: '12/11/2019',
    },
    {
      itemCode: 'h434787512u5',
      itemName: 'Blender',
      quantProd: '1',
      unitProd: 'Box',
      catProd: 'Equipment',
      ExpiryDate: '09/18/2021',
      dateProd: '12/11/2021',
    },
  ];

  prodIssue = false;
  selected = [];
  addProd = false;
  editProd = false;
  delProd = false;
  cancelEnabled = true;
  filter = '';
  catInv = '';
  unitInv = '';
  catInvOpt = [''];
  unitInvOpt = ['Piece (pcs)', 'Pack (pks)', 'Kilogram (kg)'];
}

</script>
<style lang="sass" scoped>
.my-card
  position: relative
  margin: auto
  height: 80vh
  width: 80vw
</style>