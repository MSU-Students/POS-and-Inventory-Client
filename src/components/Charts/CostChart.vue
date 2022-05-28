<template>
  <div>
    <canvas width="1400" height="600"></canvas>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Chart from 'chart.js/auto';
import { PurchaseDto } from 'src/services/rest-api';
import { date } from 'quasar';
import { mapActions, mapGetters } from 'vuex';
const dateNow = new Date();
const year = date.formatDate(dateNow, 'YYYY');
@Options({
  computed: {
    ...mapGetters('purchase', [
      'completePurchase',
      'getCostPurchaseJan',
      'getCostPurchaseFeb',
      'getCostPurchaseMarch',
      'getCostPurchaseApril',
      'getCostPurchaseMay',
      'getCostPurchaseJune',
      'getCostPurchaseJuly',
      'getCostPurchaseAug',
      'getCostPurchaseSept',
      'getCostPurchaseOct',
      'getCostPurchaseNov',
      'getCostPurchaseDec',
    ]),
  },

  methods: {
    ...mapActions('purchase', ['getAllPurchase']),
  },
})
export default class monthlyProductSales extends Vue {
  getCostPurchaseDec!: number;
  getCostPurchaseNov!: number;
  getCostPurchaseOct!: number;
  getCostPurchaseSept!: number;
  getCostPurchaseAug!: number;
  getCostPurchaseJuly!: number;
  getCostPurchaseJune!: number;
  getCostPurchaseMay!: number;
  getCostPurchaseApril!: number;
  getCostPurchaseMarch!: number;
  getCostPurchaseFeb!: number;
  getCostPurchaseJan!: number;

  chart?: Chart;
  completePurchase!: PurchaseDto[];
  getAllPurchase!: () => Promise<void>;
  async mounted() {
    await this.getAllPurchase();

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
            this.getCostPurchaseJan,
            this.getCostPurchaseFeb,
            this.getCostPurchaseMarch,
            this.getCostPurchaseApril,
            this.getCostPurchaseMay,
            this.getCostPurchaseJune,
            this.getCostPurchaseJuly,
            this.getCostPurchaseAug,
            this.getCostPurchaseSept,
            this.getCostPurchaseOct,
            this.getCostPurchaseNov,
            this.getCostPurchaseDec,
          ],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };

    const wrapper = this.$el as HTMLElement;
    const canvas = wrapper.querySelector('canvas') as HTMLCanvasElement;
    this.chart = new Chart(canvas, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
      },
    });
  }
}
</script>
