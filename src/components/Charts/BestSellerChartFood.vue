<template>
  <div>
    <canvas id="myChart" width="1400" height="500"></canvas>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Chart from 'chart.js/auto';
@Options({})
export default class monthlyProductSales extends Vue {
  chart?: Chart;
  mounted() {
    const labels = ['Tuna sandwich', 'Beef Burger', 'Grilled cheese sandwich'];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'products',
          data: [50, 40, 90],
          backgroundColor: [
            'rgba(201, 203, 207, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgb(201, 203, 207)',
            'rgb(255, 159, 64)',
            'rgb(153, 102, 255)',
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
