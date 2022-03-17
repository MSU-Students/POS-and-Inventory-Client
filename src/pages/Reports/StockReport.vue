<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 q-pb-lg text-bold">
      <q-icon name="archive" color="indigo" style="font-size: 4rem" />
      Stock Report
    </div>
    <div class="row">
      <div class="col-9">
        <div class="q-pr-md">
          <q-card>
            <q-table
              title="Stock List"
              :rows="allInventory"
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
                    label="Filter by:"
                    label-position="top"
                    external-label
                    padding="xs"
                    direction="left"
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
          </q-card>
        </div>
      </div>
      <div class="col">
        <q-card>
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label class="text-h6"> Low stock Items </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item>
              <q-item-section>Black Pearls</q-item-section>
              <q-item-section class="text-h6 text-bold text-red-10" side>
                20 packs
              </q-item-section>
            </q-item>
            <q-separator inset />
            <q-item>
              <q-item-section>Sugar</q-item-section>
              <q-item-section class="text-h6 text-bold text-red-10" side>
                5 packs
              </q-item-section>
            </q-item>
            <q-separator inset />
            <q-item>
              <q-item-section>Plastic Cup</q-item-section>
              <q-item-section class="text-h6 text-bold text-red-10" side>
                3 Boxs
              </q-item-section>
            </q-item>
            <q-separator inset />
            <q-item>
              <q-item-section>Plastic Straw</q-item-section>
              <q-item-section class="text-h6 text-bold text-red-10" side>
                15 Boxs
              </q-item-section>
            </q-item>
            <q-separator inset />
          </q-list>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { InventoryDto } from 'src/services/rest-api';
import { mapState } from 'vuex';

@Options({
  computed: {
    ...mapState('inventory', ['allInventory']),
  },
})
export default class Expenses extends Vue {
  allInventory!: InventoryDto[];
  columns = [
    {
      name: 'itemName',
      required: true,
      label: 'Item Name',
      align: 'left',
      field: (row: InventoryDto) => row.itemName,
      format: (val: string) => `${val}`,
    },
    {
      name: 'itemQuantProd',
      align: 'center',
      label: 'Quantity',
      field: 'itemQuantProd',
    },
    {
      name: 'itemUnitProd',
      align: 'center',
      label: 'Unit',
      field: 'itemUnitProd',
    },
    {
      name: 'itemCategory',
      align: 'center',
      label: 'Category',
      field: 'itemCategory',
    },
    {
      name: 'itemExpiryDate',
      align: 'center',
      label: 'Expiry Date',
      field: 'itemExpiryDate',
    },

    {
      name: 'itemDateCreated',
      align: 'center',
      label: 'Date Stock In',
      field: 'itemDateCreated',
    },
  ];
  filter = '';
}
</script>
<style lang="sass" scoped>
.my-card
  position: relative
  margin: auto
  height: 70vh
  width: 90vw
</style>
