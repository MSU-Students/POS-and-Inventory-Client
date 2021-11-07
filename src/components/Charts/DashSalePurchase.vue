<template>
  <div>
<<<<<<< HEAD
    <canvas class="q-pr-md" id="myChart" style="height: 70px;  width: 100px;"></canvas>
=======
    <canvas id="myChart" width="400" height="150"></canvas>
>>>>>>> 4c86981e3da8a94cc5a605bb241ba79ff7cd2554
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Chart from 'chart.js/auto';
@Options({})
export default class ChartComponent extends Vue {
  chart?: Chart;
  mounted() {
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
          label: 'Sale',
          backgroundColor: 'blue',
          borderColor: 'blue',
          data: [330, 110, 435, 232, 120, 350, 345, 343, 789, 674, 332, 534],
        },
        {
          label: 'Purchase',
          backgroundColor: 'yellow',
          borderColor: 'yellow',
          data: [990, 130, 532, 342, 209, 307, 945, 456, 923, 367, 921, 213],
        },
      ],
    };

    const wrapper = this.$el as HTMLElement;
    const canvas = wrapper.querySelector('canvas') as HTMLCanvasElement;
    this.chart = new Chart(canvas, {
      type: 'line',
      data: data,
      options: {},
    });
  }
}
</script>
