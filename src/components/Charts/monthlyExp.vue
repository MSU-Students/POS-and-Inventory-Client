<template>
  <div>
    <canvas id="myChart" width="300" height="100"></canvas>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Chart from 'chart.js/auto';
import { date } from 'quasar';
import { mapActions, mapGetters, mapState } from 'vuex';
import { ExpensesDto } from 'src/services/rest-api';
const dateNow = new Date();
const year = date.formatDate(dateNow, 'YYYY');
@Options({
  computed: {
    ...mapState('expenses', ['allExpenses']),
    ...mapGetters('expenses', [
      'getJanExp',
      'getFebExp',
      'getMarchExp',
      'getAprilExp',
      'getMayExp',
      'getJuneExp',
      'getJulyExp',
      'getAugExp',
      'getSeptExp',
      'getOctExp',
      'getNovExp',
      'getDecExp',
    ]),
  },
  methods: {
    ...mapActions('expenses', ['getAllExpenses']),
  },
})
export default class MonthlyExpense extends Vue {
  chart?: Chart;
  allExpenses!: ExpensesDto[];
  getDecExp!: number;
  getNovExp!: number;
  getOctExp!: number;
  getSeptExp!: number;
  getAugExp!: number;
  getJulyExp!: number;
  getJuneExp!: number;
  getMayExp!: number;
  getAprilExp!: number;
  getMarchExp!: number;
  getFebExp!: number;
  getJanExp!: number;
  getAllExpenses!: () => Promise<void>;
  selectedYear = 2022;
  yearOption = [2020, 2021, 2022];
  date = '';
  menu = false;

  async mounted() {
    await this.getAllExpenses();

    const labels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'Decemeber',
    ];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Amount',
          data: [
            this.getJanExp,
            this.getFebExp,
            this.getMarchExp,
            this.getAprilExp,
            this.getMayExp,
            this.getJuneExp,
            this.getJulyExp,
            this.getAugExp,
            this.getSeptExp,
            this.getOctExp,
            this.getNovExp,
            this.getDecExp,
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgb(54, 162, 235)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 205, 86, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            '#fff',
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(255, 99, 132)',
            'rgb(255, 205, 86)',
          ],
        },
      ],
    };

    const wrapper = this.$el as HTMLElement;
    const canvas = wrapper.querySelector('canvas') as HTMLCanvasElement;
    this.chart = new Chart(canvas, {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}
</script>
