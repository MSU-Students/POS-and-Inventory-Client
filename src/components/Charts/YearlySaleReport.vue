<template>
  <div>
    <canvas id="myChart" width="300" height="100"></canvas>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Chart from 'chart.js/auto';
@Options({})
export default class monthlyProductSales extends Vue {
  chart?: Chart;
  mounted() {
    const labels = ['2019', '2020', '2021'];
    const data = {
      labels: labels,
      datasets: [
        {
          label: '2019',
          data: [34, 281, 213],
          backgroundColor: 'grey',
          borderColor: 'grey',
        },
        {
          label: '2020',
          data: [34, 103, 512, 223],
          backgroundColor: 'green',
          borderColor: 'green',
        },
        {
          label: '2021',
          data: [299, 13, 40],
          backgroundColor: 'orange',
          borderColor: 'orange',
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
