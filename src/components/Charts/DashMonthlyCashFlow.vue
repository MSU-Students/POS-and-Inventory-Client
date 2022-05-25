<template>
  <div>
    <canvas
      class="q-pl-md"
      id="myChart"
      style="height: 450px; width: 70px"
    ></canvas>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Chart from 'chart.js/auto';
import { mapActions, mapState } from 'vuex';
import { ExpensesDto, SaleRecordDto } from 'src/services/rest-api';
import { date } from 'quasar';
const dateNow = new Date();
const TodayDate = date.formatDate(dateNow, 'YYYY-MM-DD');
@Options({
  computed: {
    ...mapState('saleRecord', ['allSaleRecord']),
    ...mapState('expenses', ['allExpenses']),
  },
  methods: {
    ...mapActions('saleRecord', ['getAllSaleRecord']),
    ...mapActions('expenses', ['getAllExpenses']),
  },
})
export default class ChartComponent extends Vue {
  chart?: Chart;
  allSaleRecord!: SaleRecordDto[];
  allExpenses!: ExpensesDto[];
  getAllSaleRecord!: () => Promise<void>;
  getAllExpenses!: () => Promise<void>;
  async mounted() {
    await this.getAllSaleRecord();
    await this.getAllExpenses();
    const labels = ['Revenue', 'Expenses'];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Revenue',
          backgroundColor: ['rgb(255, 205, 86)', 'rgb(255, 99, 132)'],
          data: [this.getSumSaleToday(), this.getSumExpenses()],
          hoverOffset: 30,
        },
      ],
    };

    const wrapper = this.$el as HTMLElement;
    const canvas = wrapper.querySelector('canvas') as HTMLCanvasElement;
    this.chart = new Chart(canvas, {
      type: 'doughnut',
      data: data,
      options: {
        aspectRatio: 1,
        responsive: true,
        cutout: 90,
        maintainAspectRatio: false,
      },
    });
  }

  getSumSaleToday() {
    const result = this.allSaleRecord
      .filter((s) => s.sales_order_created.match(TodayDate))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  }

  getSumExpenses() {
    const result = this.allExpenses
      .filter((s) => s.expensesDate.match(TodayDate))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.amount;
      }, 0);
    return result;
  }
}
</script>
