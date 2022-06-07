<template>
  <q-page>
    <div class="q-pa-lg bg-grey-1">
      <div class="text-h4 text-teal q-pb-lg q-pt-md text-bold flex flex-center">
        <q-icon
          class="bi bi-graph-down q-pr-sm"
          color="teal"
          style="font-size: 3rem"
        />
        Expenses Report
      </div>
      <div class="q-py-lg q-gutter-lg row">
        <div class="col-8">
          <q-table
            title="Expenses List"
            :rows="allExpenses"
            :columns="columns"
            row-key="reference"
            :search="search"
            :rows-per-page-options="[0]"
            style="max-height: 600px"
          >
            <template v-slot:top-right>
              <div>
                <q-fab
                  color="teal-8"
                  icon="sort"
                  direction="left"
                  label="search by:"
                  label-position="top"
                  external-label
                  padding="xs"
                >
                  <q-fab-action
                    color="white"
                    text-color="black"
                    @click="search = 'Bills'"
                    label="Bills"
                  />
                  <q-fab-action
                    color="white"
                    text-color="black"
                    @click="search = 'Purchase Order'"
                    label="Purchase Order"
                  />
                  <q-fab-action
                    color="white"
                    text-color="black"
                    @click="search = 'Rent'"
                    label="Rent"
                  />
                  <q-fab-action
                    color="white"
                    text-color="black"
                    @click="search = 'Transportation'"
                    label="Transportation"
                  />
                  <q-fab-action
                    color="white"
                    text-color="black"
                    @click="search = 'Miscellaneous/Other'"
                    label="Miscellaneous/Other"
                  />

                  <q-fab-action
                    color="white"
                    text-color="black"
                    @click="search = ''"
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
                  v-model="search"
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
                  <q-item-label class="q-mt-sm">
                    Today's Expenses
                  </q-item-label>
                </q-item-section>

                <q-item-section top side>
                  <q-item-label class="q-mt-sm text-weight-bolder text-dark">
                    ₱ {{ this.getSumExpensesToday() }}</q-item-label
                  >
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar top>
                  <q-icon name="payment" color="teal" size="35px" />
                </q-item-section>

                <q-item-section top>
                  <q-item-label class="q-mt-sm">
                    Monthly Expenses
                  </q-item-label>
                </q-item-section>

                <q-item-section top side>
                  <q-item-label class="q-mt-sm text-weight-bolder text-dark">
                    ₱ {{ this.getSumExpensesMonthly() }}</q-item-label
                  >
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar top>
                  <q-icon name="payment" color="teal" size="35px" />
                </q-item-section>

                <q-item-section top>
                  <q-item-label class="q-mt-sm"> Yearly Expenses </q-item-label>
                </q-item-section>

                <q-item-section top side>
                  <q-item-label class="q-mt-sm text-weight-bolder text-dark">
                    ₱ {{ this.getSumExpensesYearly() }}</q-item-label
                  >
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
import { mapActions, mapState } from 'vuex';
import { ExpensesDto } from 'src/services/rest-api';
import { date } from 'quasar';
const dateNow = new Date();
const CurrentDate = date.formatDate(dateNow, 'YYYY-MM-DD');
const CurrentMonth = date.formatDate(dateNow, 'YYYY-MM');
const CurrentYear = date.formatDate(dateNow, 'YYYY');

@Options({
  components: { ExpensesChart },
  computed: {
    ...mapState('expenses', ['allExpenses']),
  },
  methods: {
    ...mapActions('expenses', ['getAllExpenses']),
  },
})
export default class ExpensesReport extends Vue {
  search = '';
  allExpenses!: ExpensesDto[];
  getAllExpenses!: () => Promise<void>;

  async mounted() {
    await this.getAllExpenses();
  }

  getSumExpensesToday() {
    const result = this.allExpenses
      .filter((s) => s.expensesDate.match(CurrentDate))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    return result;
  }

  getSumExpensesMonthly() {
    const result = this.allExpenses
      .filter((s) => s.expensesDate.match(CurrentMonth))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    return result;
  }

  getSumExpensesYearly() {
    const result = this.allExpenses
      .filter((s) => s.expensesDate.match(CurrentYear))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    return result;
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
      field: (row: ExpensesDto) => '₱ ' + row.amount,
    },
  ];
}
</script>

<style></style>
