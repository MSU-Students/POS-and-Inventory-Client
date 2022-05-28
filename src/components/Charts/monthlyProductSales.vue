<template>
  <div>
    <canvas id="myChart" width="400" height="200"></canvas>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Chart from 'chart.js/auto';
import { date } from 'quasar';
import { mapActions, mapGetters, mapState } from 'vuex';
import { SaleRecordDto } from 'src/services/rest-api';
const dateNow = new Date();
const year = date.formatDate(dateNow, 'YYYY');
@Options({
  computed: {
    ...mapState('saleRecord', ['allSaleRecord']),
    ...mapGetters('saleRecord', [
      'getJanSale',
      'getFebSale',
      'getMarchSale',
      'getAprilSale',
      'getMaySale',
      'getJuneSale',
      'getJulySale',
      'getAugSale',
      'getSeptSale',
      'getOctSale',
      'getNovSale',
      'getDecSale',
    ]),
  },
  methods: {
    ...mapActions('saleRecord', ['getAllSaleRecord']),
  },
})
export default class monthlyProductSales extends Vue {
  chart?: Chart;
  allSaleRecord!: SaleRecordDto[];
  getDecSale!: number;
  getNovSale!: number;
  getOctSale!: number;
  getSeptSale!: number;
  getAugSale!: number;
  getJulySale!: number;
  getJuneSale!: number;
  getMaySale!: number;
  getAprilSale!: number;
  getMarchSale!: number;
  getFebSale!: number;
  getJanSale!: number;
  getAllSaleRecord!: () => Promise<void>;
  selectedYear = 2022;
  yearOption = [2020, 2021, 2022];
  date = '';
  menu = false;

  async mounted() {
    await this.getAllSaleRecord();

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
            this.getJanSale,
            this.getFebSale,
            this.getMarchSale,
            this.getAprilSale,
            this.getMaySale,
            this.getJuneSale,
            this.getJulySale,
            this.getAugSale,
            this.getSeptSale,
            this.getOctSale,
            this.getNovSale,
            this.getDecSale,
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
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  getSalesJan() {
    const result = this.allSaleRecord
      .filter((s) => s.sales_order_created.match(year + '-01'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  }
  getSalesFeb() {
    const result = this.allSaleRecord
      .filter((s) => s.sales_order_created.match(year + '-02'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  }
  getSalesMarch() {
    const result = this.allSaleRecord
      .filter((s) => s.sales_order_created.match(year + '-03'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  }
  getSalesApril() {
    const result = this.allSaleRecord
      .filter((s) => s.sales_order_created.match(year + '-04'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  }
  getSalesMay() {
    const result = this.allSaleRecord
      .filter((s) => s.sales_order_created.match(year + '-05'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  }
  getSalesJune() {
    const result = this.allSaleRecord
      .filter((s) => s.sales_order_created.match(year + '-06'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  }
  getSalesJuly() {
    const result = this.allSaleRecord
      .filter((s) => s.sales_order_created.match(year + '-07'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  }
  getSalesAug() {
    const result = this.allSaleRecord
      .filter((s) => s.sales_order_created.match(year + '-08'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  }
  getSalesSept() {
    const result = this.allSaleRecord
      .filter((s) => s.sales_order_created.match(year + '-09'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  }
  getSalesOct() {
    const result = this.allSaleRecord
      .filter((s) => s.sales_order_created.match(year + '-10'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  }
  getSalesNov() {
    const result = this.allSaleRecord
      .filter((s) => s.sales_order_created.match(year + '-11'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  }
  getSalesDec() {
    const result = this.allSaleRecord
      .filter((s) => s.sales_order_created.match(year + '-12'))
      .reduce<number>((accumulator, current) => {
        return accumulator + current.totalAmount;
      }, 0);
    return result;
  }
}
</script>
