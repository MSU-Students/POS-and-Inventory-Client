<template>
  <div>
    <canvas id="myChart" width="1400" height="500"></canvas>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Chart from 'chart.js/auto';
@Options({})
export default class BestSellerChartDrinks extends Vue {
  chart?: Chart;
  mounted() {
    const labels = ['Banana Milk Tea', 'Mango Shake', 'Black Tea'];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'products',
          data: [80, 110, 55],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(255, 205, 86, 0.2)',
          ],
          borderColor: [
            'rgb(54, 162, 235)',
            'rgb(201, 203, 207)',
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
            display: true,
            position: 'top',
          },
        },
      },
    });
  }
}
</script>
