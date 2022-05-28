<template>
  <div>
    <canvas id="myChart" width="400" height="150"></canvas>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Chart from 'chart.js/auto';
import { date } from 'quasar';
import { mapActions, mapGetters, mapState } from 'vuex';
import { ExpensesDto } from 'src/services/rest-api';
const dateNow = new Date();
const CurrentMonth = date.formatDate(dateNow, 'YYYY-MM');
@Options({
  computed: {
    ...mapState('expenses', ['allExpenses']),
    ...mapGetters('expenses', [
      'getRentExpenses',
      'getBillExpenses',
      'getPurchaseExpenses',
      'getTranspoExpenses',
      'getOtherExpenses',
    ]),
  },

  methods: {
    ...mapActions('expenses', ['getAllExpenses']),
  },
})
export default class ExpensesChart extends Vue {
  getRentExpenses!: number;
  getBillExpenses!: number;
  getPurchaseExpenses!: number;
  getTranspoExpenses!: number;
  getOtherExpenses!: number;
  chart?: Chart;
  allExpenses!: ExpensesDto[];
  getAllExpenses!: () => Promise<void>;

  async mounted() {
    await this.getAllExpenses();

    const labels = [
      'Bill',
      'Purchase Order',
      'Rent',
      'Transportation',
      'Miscellaneous/Other',
    ];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Monthly/Category',
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          data: [
            this.getBillExpenses,
            this.getPurchaseExpenses,
            this.getRentExpenses,
            this.getTranspoExpenses,
            this.getOtherExpenses,
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
        responsive: true,
      },
    });
  }
}
</script>
