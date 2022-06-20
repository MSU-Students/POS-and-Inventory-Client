<template>
  <q-page>
    <div class="q-pa-lg bg-grey-1">
      <div
        class="text-h4 text-teal-4 q-pb-lg q-pt-md text-bold flex flex-center"
      >
        <q-icon
          class="bi bi-graph-down q-pr-sm"
          color="teal-4"
          style="font-size: 3rem"
        />
        Expenses Report
      </div>
      <div class="row q-col-gutter-lg q-pt-xl">
        <div class="col">
          <q-card>
            <q-card-section
              :class="$q.dark.isActive ? 'teal-4_dark' : 'bg-teal-4'"
              class="text-white"
            >
              <div class="row">
                <div class="col-10">
                  <div class="text-h6">Today's Expense</div>
                  <div class="text-h5 text-bold">₱ {{ getDailyExpenses }}</div>
                </div>
                <div class="col-2">
                  <q-icon size="50px" class="bi bi-cash-stack" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col">
          <q-card>
            <q-card-section
              :class="$q.dark.isActive ? 'red_dark' : 'bg-teal-4'"
              class="text-white"
            >
              <div class="row">
                <div class="col-10">
                  <div class="text-h6">Monthly Expense</div>
                  <div class="text-h5 text-bold">
                    ₱ {{ getMonthlyExpenses }}
                  </div>
                </div>
                <div class="col-2">
                  <q-icon size="50px" class="bi bi-cash-stack" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col">
          <q-card>
            <q-card-section
              :class="$q.dark.isActive ? 'red_dark' : 'bg-teal-4'"
              class="text-white"
            >
              <div class="row">
                <div class="col-10">
                  <div class="text-h6">Yearly Expense</div>
                  <div class="text-h5 text-bold">₱ {{ getYearlyExpenses }}</div>
                </div>
                <div class="col-2" align="right">
                  <q-icon size="50px" class="bi bi-cash-stack" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="q-py-lg">
        <q-table
          title="Expenses List"
          :rows="allExpenses"
          :columns="columns"
          row-key="reference"
          :search="search"
        >
          <template v-slot:top-right>
            <div>
              <q-fab
                color="teal-4"
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
            <q-btn
              color="teal-4"
              icon-right="archive"
              label="Export to csv"
              @click="exportTable()"
            />
          </template>
        </q-table>
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
import { mapActions, mapGetters, mapState } from 'vuex';
import { ExpensesDto } from 'src/services/rest-api';
import { date, exportFile } from 'quasar';
const dateNow = new Date();
const CurrentDate = date.formatDate(dateNow, 'YYYY-MM-DD');
const CurrentMonth = date.formatDate(dateNow, 'YYYY-MM');
const CurrentYear = date.formatDate(dateNow, 'YYYY');

@Options({
  components: { ExpensesChart },
  computed: {
    ...mapState('expenses', ['allExpenses']),
    ...mapGetters('expenses', [
      'getDailyExpenses',
      'getMonthlyExpenses',
      'getYearlyExpenses',
    ]),
  },
  methods: {
    ...mapActions('expenses', ['getAllExpenses']),
  },
})
export default class ExpensesReport extends Vue {
  search = '';
  allExpenses!: ExpensesDto[];
  getMonthlyExpenses!: number;
  getYearlyExpenses!: number;
  getDailyExpenses!: number;
  getAllExpenses!: () => Promise<void>;

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

  wrapCsvValue(
    val: string,
    formatFn?: (v: string, r: any) => string,
    row?: any
  ) {
    let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

    formatted =
      formatted === void 0 || formatted === null ? '' : String(formatted);

    formatted = formatted.split('"').join('""');
    /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
    // .split('\n').join('\\n')
    // .split('\r').join('\\r')

    return `"${formatted}"`;
  }
  formatPrice(value: number) {
    let val = (value / 1).toFixed(2).replace(',', '.');
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  exportTable() {
    // naive encoding to csv format
    const header = [
      this.wrapCsvValue('Reference'),
      this.wrapCsvValue('Expenses Name'),
      this.wrapCsvValue('Date'),
      this.wrapCsvValue('Description'),
      this.wrapCsvValue('Total Amount'),
      this.wrapCsvValue('Category'),
      this.wrapCsvValue('Supplier'),
    ];
    const rows = [header.join(',')].concat(
      this.allExpenses.map((c) =>
        [
          this.wrapCsvValue(String(c.expensesID)),
          this.wrapCsvValue(String(c.expensesName)),
          this.wrapCsvValue(String(c.expensesDate)) +
            this.wrapCsvValue(String(c.description)),
          this.wrapCsvValue(String(c.amount)),
          this.wrapCsvValue(String(c.expensesCategory)),
          this.wrapCsvValue(String(c.supplier?.company)),
        ].join(',')
      )
    );

    const status = exportFile(
      'category-export.csv',
      rows.join('\r\n'),
      'text/csv'
    );

    if (status !== true) {
      this.$q.notify({
        message: 'Browser denied file download...',
        color: 'negative',
        icon: 'warning',
      });
    }
  }
}
</script>

<style></style>
