<template>
  <q-page>
    <div class="q-pa-lg">
      <div class="text-h4 text-bold q-pb-lg">
        <q-icon
          name="stacked_bar_chart"
          color="orange"
          style="font-size: 4rem"
        />
        Sales Report
      </div>
      <div class="row q-pb-lg q-gutter-xl">
        <div class="col-9">
          <q-table
            title="Expenses List"
            :rows="expenses"
            :columns="columns"
            row-key="reference"
            :rows-per-page-options="[5]"
          >
          </q-table>
        </div>
        <div class="col">
          <q-card align="center">
            <q-card-section>
              <q-icon
                name="shopping_bag"
                color="green-2"
                style="font-size: 2rem"
              >
              </q-icon>
              <div class="text-h6 q-pb-md">Total Expenses List</div>
              <div class="text-h6">140</div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-icon name="paid" color="green-2" style="font-size: 2rem">
              </q-icon>
              <div class="text-h6 q-pb-md">Total Expenses</div>
              <div class="text-h6">100000.000</div>
            </q-card-section>
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
import { ExpensesInfo } from 'src/store/expenses/state';
import { mapState } from 'vuex';

@Options({
  components: { ExpensesChart },
  computed: {
    ...mapState('expenses', ['expenses', 'activeExpenses']),
  },
})
export default class ExpensesReport extends Vue {
  expenses!: ExpensesInfo;
  columns = [
    {
      name: 'reference',
      required: true,
      label: 'Reference Number',
      align: 'left',
      field: (row: ExpensesInfo) => row.reference,
      format: (val: string) => `${val}`,
    },
    {
      name: 'date',
      align: 'center',
      label: 'Date',
      field: 'date',
      sortable: true,
    },
    {
      name: 'category',
      align: 'center',
      label: 'Category',
      field: 'category',
    },
    {
      name: 'supplier',
      align: 'center',
      label: 'Supplier',
      field: 'supplier',
    },
    {
      name: 'amount',
      align: 'center',
      label: 'Amount',
      field: 'amount',
    },
  ];
  defaultExpenses: ExpensesInfo = {
    reference: '',
    date: '',
    category: '',
    supplier: '',
    amount: 0,
    note: '',
  };
  presentExpenses = { ...this.defaultExpenses };
}
</script>

<style></style>
