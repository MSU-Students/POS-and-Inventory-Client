<template>
  <q-page>
    <div class="q-pa-lg">
      <div class="text-h4 text-bold q-pb-lg">
        <q-icon
          name="stacked_bar_chart"
          color="orange"
          style="font-size: 4rem"
        />
        Expense Report
      </div>
      <div class="row q-pb-lg q-gutter-lg">
        <div class="col-8">
          <q-table
            title="Expenses List"
            :rows="allExpenses"
            :columns="columns"
            row-key="reference"
            :rows-per-page-options="[5]"
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
        <div class="col">
          <q-card>
            <q-list bordered class="rounded-borders" style="max-width: 800px">
              <q-item-label header> Expenses Overview </q-item-label>

              <q-item>
                <q-item-section avatar top>
                  <q-icon name="payment" color="teal" size="35px" />
                </q-item-section>

                <q-item-section top>
                  <q-item-label class="q-mt-sm">Total Cost</q-item-label>
                </q-item-section>

                <q-item-section top side>
                  <q-item-label class="q-mt-sm">₱250.00</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced />
            </q-list>
          </q-card>
        </div>
      </div>
      <q-card class="q-pa-md">
        <ExpensesChart />
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import ExpensesChart from 'components/Charts/ExpensesReportChart.vue';
import { mapState } from 'vuex';
import { ExpensesDto } from 'src/services/rest-api';

@Options({
  components: { ExpensesChart },
  computed: {
    ...mapState('expenses', ['allExpenses']),
  },
})
export default class ExpensesReport extends Vue {
  filter = '';
  allExpenses!: ExpensesDto;
  columns = [
    {
      name: 'expensesID',
      align: 'left',
      label: 'Expenses Reference',
      field: 'expensesID',
    },
    {
      name: 'expensesName',
      required: true,
      label: 'Expenses Name',
      align: 'center',
      file: 'expensesName',
    },
    {
      name: 'category',
      align: 'center',
      label: 'Category',
      field: 'expensesCategory',
    },
    {
      name: 'supplier',
      align: 'center',
      label: 'Supplier',
      field: (row: any) => row.supplier?.company || 'None',
    },
    {
      name: 'expensesDate',
      align: 'center',
      label: 'Date',
      field: 'expensesDate',
    },

    {
      name: 'amount',
      align: 'center',
      label: 'Amount',
      field: 'amount',
    },
  ];
}
</script>

<style></style>
