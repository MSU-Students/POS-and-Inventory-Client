<template>
  <div>
    <canvas id="myChart" width="600" height="600"></canvas>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Chart from 'chart.js/auto';
@Options({})
export default class ChartComponent extends Vue {
  chart?: Chart;
  mounted() {
    const labels = ['Amount'];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Revenue',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [15000],
        },
        {
          label: 'Purchase',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [4000],
        },
        {
          label: 'Expenses',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [5000],
        },
      ],
    };

    const wrapper = this.$el as HTMLElement;
    const canvas = wrapper.querySelector('canvas') as HTMLCanvasElement;
    this.chart = new Chart(canvas, {
      type: 'doughnut',
      data: data,
      options: {},
    });
  }
}
</script>
