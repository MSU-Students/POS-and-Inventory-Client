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
      <div class="row q-pb-lg q-gutter-xl">
        <div class="col-9">
          <q-table
            title="Expenses List"
            :rows="allExpenses"
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
import { IExpensesInfo } from '../store/expenses/state';
import { mapState } from 'vuex';

@Options({
  components: { ExpensesChart },
  computed: {
    ...mapState('expenses', ['allExpenses']),
  },
})
export default class ExpensesReport extends Vue {
  allExpenses!: IExpensesInfo;
  columns = [
    {
      name: 'reference',
      required: true,
      label: 'Reference Number',
      align: 'left',
      field: (row: IExpensesInfo) => row.expensesReference,
      format: (val: string) => `${val}`,
    },
    {
      name: 'expensesName',
      align: 'center',
      label: 'Expenses',
      field: 'expensesName',
    },
    {
      name: 'expensesDateCreated',
      align: 'center',
      label: 'Date',
      field: 'expensesDateCreated',
    },
    {
      name: 'category',
      align: 'center',
      label: 'Category',
      field: 'category',
    },
    {
      name: 'expensesAmount',
      align: 'center',
      label: 'Amount',
      field: 'expensesAmount',
    },
    {
      name: 'expensesNote',
      align: 'center',
      label: 'Note',
      field: 'expensesNote',
    },
    {
      name: 'action',
      align: 'center',
      label: 'Action',
      field: 'action',
    },
  ];
}
</script>

<style></style>
