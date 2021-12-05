<template>
    <q-page class="q-pa-lg">
    <div class="text-h4 q-pb-lg text-bold">
      <q-icon name="request_quote" color="indigo" style="font-size: 4rem" />
      Purchase Report
    </div>
    <div class="row my-table">
      <div class="q-pr-md col-10 ">
        <q-table
          
          title="Purchase List"
          :rows="rows"
          :columns="columns"
          row-key="itemCode"
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
      </div>
    </div>
    <div class="q-pt-sm row">
        <q-card>
          <q-card-section>
          <q-item-section>
            <div class="text-h6">
              Monthly Cost 
            </div>
          </q-item-section>
        </q-card-section>
        <q-card-section>
          <costChart/>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import CostChart from 'components/Charts/CostChart.vue';

interface IRow {
  itemCode: string;
}
@Options({
  components: { CostChart },
})
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
      name: 'quantPurchase',
      align: 'center',
      label: 'Purchase Quantity',
      field: 'quantPurchase',
    },
    {
      name: 'unitProd',
      align: 'center',
      label: 'Unit',
      field: 'unitProd',
    },
    {
      name: 'InStock',
      align: 'center',
      label: 'In Stock',
      field: 'InStock',
    },
    {
      name: 'catProd',
      align: 'center',
      label: 'Category',
      field: 'catProd',
    },
     {
      name: 'Amount',
      align: 'center',
      label: 'Purchase Amount',
      field: 'Amount',
    },

    {
      name: 'dateProd',
      align: 'center',
      label: 'Purchase Date',
      field: 'dateProd',
    },
  ];

  rows = [
    {
      itemCode: 'hj4j324jbb34bj4',
      itemName: 'Spoon',
      quantPurchase: '50',
      unitProd: 'Packs',
      InStock: '5',
      catProd: 'Utensil',
      Amount: '1000',
      dateProd: '12/11/2021',
    },
    {
      itemCode: 'hh123h12g3hj13',
      itemName: 'Sugar',
      quantPurchase: '70',
      unitProd: 'Packs',
      InStock: '5',
      catProd: 'Ingredient',
      Amount: '2500',
      dateProd: '12/11/2021',
    },
    {
      itemCode: 'hs11121512u5',
      itemName: 'Black pearls',
      quantPurchase: '50',
      unitProd: 'Packs',
      InStock: '5',
      catProd: 'Ingredient',
      Amount: '1500',
      dateProd: '12/11/2021',
    },
    {
      itemCode: 'h434787512u5',
      itemName: 'Blender',
      quantPurchase: '50',
      unitProd: 'Box',
      InStock: '1',
      catProd: 'Equipment',
      Amount: '11500',
      dateProd: '12/11/2021',
    },  

  ];

  prodIssue = false;
  selected = [];
 
  editProd = false;
  delProd = false;
  cancelEnabled = true;
  filter = '';
  catInv = '';
  unitInv = '';
  catInvOpt = [''];
  
}
</script>
<style lang="sass" scoped>
.my-card
  position: relative
  margin: auto
  height: 56vh
  width: 16vw

</style>
