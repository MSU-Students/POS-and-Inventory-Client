<template>
  <div>
    <canvas id="myChart" width="400" height="200"></canvas>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Chart from 'chart.js/auto';
import { mapActions, mapGetters } from 'vuex';
@Options({
  computed: {
    ...mapGetters('saleRecord', [
      'get2022Sale',
      'get2023Sale',
      'get2024Sale',
      'get2025Sale',
      'get2026Sale',
      'get2027Sale',
      'get2028Sale',
      'get2029Sale',
      'get2030Sale',
    ]),
  },
  methods: {
    ...mapActions('saleRecord', ['getAllSaleRecord']),
  },
})
export default class monthlyProductSales extends Vue {
  chart?: Chart;
  getAllSaleRecord!: () => Promise<void>;
  get2022Sale!: number;
  get2023Sale!: number;
  get2024Sale!: number;
  get2025Sale!: number;
  get2026Sale!: number;
  get2027Sale!: number;
  get2028Sale!: number;
  get2029Sale!: number;
  get2030Sale!: number;
  async mounted() {
    await this.getAllSaleRecord();
    const labels = [
      '2022',
      '2023',
      '2024',
      '2025',
      '2026',
      '2027',
      '2028',
      '2029',
      '2030',
    ];
    const data = {
      labels: labels,
      datasets: [
        {
          label: '2022',
          data: [this.get2022Sale],
          backgroundColor: 'teal',
          borderColor: 'teal',
        },
        {
          label: '2023',
          data: [this.get2023Sale],
          backgroundColor: 'teal',
          borderColor: 'teal',
        },
        {
          label: '2024',
          data: [this.get2024Sale],
          backgroundColor: 'teal',
          borderColor: 'teal',
        },
        {
          label: '2025',
          data: [this.get2025Sale],
          backgroundColor: 'teal',
          borderColor: 'teal',
        },
        {
          label: '2026',
          data: [this.get2026Sale],
          backgroundColor: 'teal',
          borderColor: 'teal',
        },
        {
          label: '2027',
          data: [this.get2027Sale],
          backgroundColor: 'teal',
          borderColor: 'teal',
        },
        {
          label: '2028',
          data: [this.get2028Sale],
          backgroundColor: 'teal',
          borderColor: 'teal',
        },
        {
          label: '2029',
          data: [this.get2029Sale],
          backgroundColor: 'teal',
          borderColor: 'teal',
        },
        {
          label: '2030',
          data: [this.get2030Sale],
          backgroundColor: 'teal',
          borderColor: 'teal',
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
            display: true,
            position: 'top',
          },
        },
      },
    });
  }
}
</script>
