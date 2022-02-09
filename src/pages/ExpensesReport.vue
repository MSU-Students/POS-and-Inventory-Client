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
          >
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
import { IExpensesInfo } from 'src/store/expenses/state';

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
      sortable: true,
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
  ];
}
</script>

<style></style>
