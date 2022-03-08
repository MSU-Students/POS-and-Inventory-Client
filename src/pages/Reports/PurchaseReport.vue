<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 q-pb-lg text-bold">
      <q-icon name="request_quote" color="indigo" style="font-size: 4rem" />
      Purchase Report
    </div>
    <div>
      <q-table
        title="Purchase List"
        :rows="rows"
        :columns="columns"
        row-key="itemCode"
        :rows-per-page-options="[0]"
        :filter="filter"
      >
        <template v-slot:top-right>
          <div>
            <q-fab
              color="teal-8"
              icon="sort"
              direction="left"
              label="Filter by:"
              label-position="top"
              external-label
              padding="xs"
            >
              <q-fab-action
                color="white"
                text-color="black"
                @click="filter = 'utensil'"
                label="utensil"
              />
              <q-fab-action
                color="white"
                text-color="black"
                @click="filter = 'Ingredient'"
                label="Ingredient"
              />
              <q-fab-action
                color="white"
                text-color="black"
                @click="filter = 'Equipment'"
                label="Equipment"
              />
              <q-fab-action
                color="white"
                text-color="black"
                @click="filter = ''"
                icon="clear"
              />
            </q-fab>
          </div>
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
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </template>
      </q-table>
    </div>
    <div class="q-py-lg row q-gutter-xl">
      <div class="col">
        <q-card>
          <q-list bordered class="rounded-borders">
            <q-item-label header>Pending Purchase</q-item-label>

            <q-item>
              <q-item-section avatar top>
                <q-icon name="pending_actions" color="green" size="34px" />
              </q-item-section>

              <q-item-section top class="col-2 gt-sm">
                <q-item-label class="q-mt-sm">Milk</q-item-label>
              </q-item-section>

              <q-item-section top>
                <q-item-label lines="1">
                  <span class="text-weight-medium">Supplier:</span>
                  <span class="text-grey-8"> Nestle Company</span>
                </q-item-label>
                <q-item-label caption lines="1">
                  Purchase Quantity: 300 Packs
                </q-item-label>
              </q-item-section>

              <q-item-section top side>
                <q-item-label lines="1">
                  <span class="text-weight-medium">Price:</span>
                  <span class="text-grey-8"> ₱4500.00</span>
                </q-item-label>
                <q-item-label caption lines="1">
                  Date: 04/03/2021
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator spaced />

            <q-item>
              <q-item-section avatar top>
                <q-icon name="pending_actions" color="green" size="34px" />
              </q-item-section>

              <q-item-section top class="col-2 gt-sm">
                <q-item-label class="q-mt-sm">Beef Patty</q-item-label>
              </q-item-section>

              <q-item-section top>
                <q-item-label lines="1">
                  <span class="text-weight-medium">Supplier:</span>
                  <span class="text-grey-8"> CDO corps.</span>
                </q-item-label>
                <q-item-label caption lines="1">
                  Purchase Quantity: 50 Boxes
                </q-item-label>
              </q-item-section>

              <q-item-section top side>
                <q-item-label lines="1">
                  <span class="text-weight-medium">Price:</span>
                  <span class="text-grey-8"> ₱8000.00</span>
                </q-item-label>
                <q-item-label caption lines="1">
                  Date: 05/11/2021
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
      <div class="col-5">
        <q-card>
          <q-list bordered class="rounded-borders">
            <q-item-label header>Canceled List</q-item-label>

            <q-item>
              <q-item-section avatar top>
                <q-icon name="assignment_return" color="red" size="34px" />
              </q-item-section>

              <q-item-section top class="col-2 gt-sm">
                <q-item-label class="q-mt-sm">Pepper</q-item-label>
              </q-item-section>

              <q-item-section top>
                <q-item-label lines="1">
                  <span class="text-weight-medium">Supplier:</span>
                  <span class="text-grey-8"> None</span>
                </q-item-label>
                <q-item-label caption lines="1">
                  Purchase Quantity: 10 Packs
                </q-item-label>
              </q-item-section>

              <q-item-section top side>
                <q-item-label lines="1">
                  <span class="text-weight-medium">Price:</span>
                  <span class="text-grey-8"> ₱250.00</span>
                </q-item-label>
                <q-item-label caption lines="1">
                  Date: 04/03/2021
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator spaced />
          </q-list>
        </q-card>
      </div>
    </div>
    <div class="q-pt-sm row">
      <q-card>
        <q-card-section>
          <q-item-section>
            <div class="text-h6">Monthly Cost</div>
          </q-item-section>
        </q-card-section>
        <q-card-section>
          <costChart />
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
  filter = '';
}
</script>
<style lang="sass" scoped>
.my-card
  position: relative
  margin: auto
  height: 56vh
  width: 113vw
</style>
