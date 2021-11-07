<template>
  <div>
<<<<<<< HEAD
    <canvas class="q-pl-md" id="myChart" style="height: 450px;  width: 70px;"></canvas>
=======
    <canvas id="myChart" width="600" height="250"></canvas>
>>>>>>> 4c86981e3da8a94cc5a605bb241ba79ff7cd2554
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
<<<<<<< HEAD
import Chart, { layouts } from 'chart.js/auto';
=======
import Chart from 'chart.js/auto';
>>>>>>> 4c86981e3da8a94cc5a605bb241ba79ff7cd2554
@Options({})
export default class ChartComponent extends Vue {
  chart?: Chart;
  mounted() {
    const labels = ['Revenue', 'Purchase', 'Expenses'];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Revenue',
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
          data: [15000, 4000, 5000],
          hoverOffset: 40,
        },
      ],
    };

    const wrapper = this.$el as HTMLElement;
    const canvas = wrapper.querySelector('canvas') as HTMLCanvasElement;
    this.chart = new Chart(canvas, {
      type: 'doughnut',
      data: data,
<<<<<<< HEAD
      options: {
          aspectRatio: 1,
          responsive: true,
          cutout: 90,
          maintainAspectRatio: false

      },
=======
      options: {},
>>>>>>> 4c86981e3da8a94cc5a605bb241ba79ff7cd2554
    });
  }
}
</script>
