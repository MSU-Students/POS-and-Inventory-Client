<template>
  <!-- <q-card
    class="bg-teal-4 flex flex-center text-h5 text-white text-weight-medium"
    style="height: 40px"
  >
    Sale Record
  </q-card> -->
  <q-card class>
    <q-tabs
      v-model="MonthTab"
      dense
      class="text-teal-4"
      active-color="blue"
      indicator-color="blue"
      align="justify"
      narrow-indicator
    >
      <q-tab name="January" label="January" />
      <q-tab name="February" label="February" />
      <q-tab name="March" label="March" />
      <q-tab name="April" label="April" />
      <q-tab name="May" label="May" />
      <q-tab name="June" label="June" />
      <q-tab name="July" label="July" />
      <q-tab name="August" label="August" />
      <q-tab name="September" label="September" />
      <q-tab name="October" label="October" />
      <q-tab name="November" label="November" />
      <q-tab name="December" label="December" />
    </q-tabs>
    <q-separator />

    <q-tab-panels v-model="MonthTab" animated>
      <q-tab-panel name="January">
        <q-table
          title="January Expenses"
          :rows="getJanExpFilter"
          :columns="columns"
          table-header-class="bg-teal-4 text-white"
          row-key="name"
        />
      </q-tab-panel>
      <q-tab-panel name="February">
        <q-table
          title="February Expenses"
          :rows="getFebExpFilter"
          :columns="columns"
          table-header-class="bg-teal-4 text-white"
          row-key="name"
        />
      </q-tab-panel>
      <q-tab-panel name="March">
        <q-table
          title="March Expenses"
          :rows="getMarchExpFilter"
          :columns="columns"
          table-header-class="bg-teal-4 text-white"
          row-key="name"
        />
      </q-tab-panel>
      <q-tab-panel name="April">
        <q-table
          title="April Expenses"
          :rows="getAprilExpFilter"
          :columns="columns"
          table-header-class="bg-teal-4 text-white"
          row-key="name"
        />
      </q-tab-panel>
      <q-tab-panel name="May">
        <q-table
          title="May Expenses"
          :rows="getMayExpFilter"
          :columns="columns"
          table-header-class="bg-teal-4 text-white"
          row-key="name"
        />
      </q-tab-panel>
      <q-tab-panel name="June">
        <q-table
          title="June Expenses"
          :rows="getJuneExpFilter"
          :columns="columns"
          table-header-class="bg-teal-4 text-white"
          row-key="name"
        />
      </q-tab-panel>
      <q-tab-panel name="July">
        <q-table
          title="July Expenses"
          :rows="getJulyExpFilter"
          :columns="columns"
          table-header-class="bg-teal-4 text-white"
          row-key="name"
        />
      </q-tab-panel>
      <q-tab-panel name="August">
        <q-table
          title="August Expenses"
          :rows="getAugExpFilter"
          :columns="columns"
          table-header-class="bg-teal-4 text-white"
          row-key="name"
        />
      </q-tab-panel>
      <q-tab-panel name="September">
        <q-table
          title="September Expenses"
          :rows="getSeptExpFilter"
          :columns="columns"
          table-header-class="bg-teal-4 text-white"
          row-key="name"
        />
      </q-tab-panel>
      <q-tab-panel name="October">
        <q-table
          title="October Expenses"
          :rows="getOctExpFilter"
          :columns="columns"
          table-header-class="bg-teal-4 text-white"
          row-key="name"
        />
      </q-tab-panel>
      <q-tab-panel name="November">
        <q-table
          title="November Expenses"
          :rows="getNovExpFilter"
          :columns="columns"
          table-header-class="bg-teal-4 text-white"
          row-key="name"
        />
      </q-tab-panel>
      <q-tab-panel name="December">
        <q-table
          title="December Expenses"
          :rows="getDecExpFilter"
          :columns="columns"
          table-header-class="bg-teal-4 text-white"
          row-key="name"
        />
      </q-tab-panel>
    </q-tab-panels>
    <div class="q-pa-lg"></div>
  </q-card>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import ExpensesChart from 'components/Charts/ExpensesReportChart.vue';
import { mapGetters, mapState } from 'vuex';
import { ExpensesDto } from 'src/services/rest-api';
import MonthlyExpense from 'src/components/Charts/monthlyExp.vue';

@Options({
  components: { ExpensesChart, MonthlyExpense },
  computed: {
    ...mapState('expenses', ['allExpenses']),
    ...mapGetters('expenses', [
      'getJanExpFilter',
      'getFebExpFilter',
      'getMarchExpFilter',
      'getAprilExpFilter',
      'getMayExpFilter',
      'getJuneExpFilter',
      'getJulyExpFilter',
      'getAugExpFilter',
      'getSeptExpFilter',
      'getOctExpFilter',
      'getNovExpFilter',
      'getDecExpFilter',
    ]),
  },
})
export default class ExpensesMonth extends Vue {
  allExpenses!: ExpensesDto[];
  getJanExpFilter!: ExpensesDto[];
  getFebExpFilter!: ExpensesDto[];
  getMarchExpFilter!: ExpensesDto[];
  getAprilExpFilter!: ExpensesDto[];
  getMayExpFilter!: ExpensesDto[];
  getJuneExpFilter!: ExpensesDto[];
  getJulyExpFilter!: ExpensesDto[];
  getAugExpFilter!: ExpensesDto[];
  getSeptExpFilter!: ExpensesDto[];
  getOctExpFilter!: ExpensesDto[];
  getNovExpFilter!: ExpensesDto[];
  getDecExpFilter!: ExpensesDto[];
  getAllExpenses!: () => Promise<void>;
  MonthTab = 'January';

  async mounted() {
    await this.getAllExpenses();
  }

  columns = [
    {
      name: 'expensesID',
      align: 'left',
      label: 'Expenses Reference',
      field: 'expensesID',
      sortable: true,
    },
    {
      name: 'expensesName',
      required: true,
      label: 'Expenses Name',
      align: 'center',
      field: (row: ExpensesDto) => row.expensesName,
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
      field: (row: ExpensesDto) => row.supplier?.company || 'None',
    },
    {
      name: 'expensesDate',
      align: 'center',
      label: 'Date',
      field: 'expensesDate',
      sortable: true,
    },

    {
      name: 'amount',
      align: 'center',
      label: 'Amount',
      field: (row: ExpensesDto) => '₱ ' + this.formatPrice(row.amount),
    },
  ];

  formatPrice(value: number) {
    let val = (value / 1).toFixed(2).replace(',', '.');
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
</script>
