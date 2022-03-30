<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 q-pb-lg text-bold">
      <q-icon name="request_quote" color="indigo" style="font-size: 4rem" />
      Purchase Report
    </div>
    <div>
      <q-table
        title="Purchase History"
        :rows="allPurchase"
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
import { mapState } from 'vuex';
import { PurchaseDto } from 'src/services/rest-api';

@Options({
  components: { CostChart },
  computed: {
    ...mapState('purchase', ['allPurchase']),
  },
})
export default class Expenses extends Vue {
  allPurchase!: PurchaseDto[];
  columns = [
    {
      name: 'itemCode',
      required: true,
      label: 'Purchase Reference',
      align: 'left',
      field: 'purchaseID',
    },
    {
      name: 'itemName',
      align: 'center',
      label: 'Item Name',
      field: (row: PurchaseDto) => row.purchaseProduct,
      format: (val: string) => `${val}`,
    },
    {
      name: 'quantPurchase',
      align: 'center',
      label: 'Purchase Quantity',
      field: 'productQuantity',
    },
    {
      name: 'unitProd',
      align: 'center',
      label: 'Unit',
      field: 'productUnit',
    },
    {
      name: 'catProd',
      align: 'center',
      label: 'Category',
      field: 'purchaseCategory',
    },
    {
      name: 'InStock',
      align: 'center',
      label: 'Supplier',
      field: 'InStock',
    },
    {
      name: 'Amount',
      align: 'center',
      label: 'Purchase Amount',
      field: 'purchaseAmount',
    },

    {
      name: 'dateProd',
      align: 'center',
      label: 'Purchase Date',
      field: 'purchaseDate',
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
