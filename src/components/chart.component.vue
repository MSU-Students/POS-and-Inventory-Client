<template>
  <div > 
      <canvas></canvas>


  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Chart from 'chart.js/auto';
@Options({


})
export default class ChartComponent extends Vue {
  chart?: Chart;
  mounted(){

     const labels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
    ];
    const data = {
      labels: labels,
      datasets: [{
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
      }]
    };
    
    const wrapper = this.$el as HTMLElement
    const canvas = wrapper.querySelector('canvas') as HTMLCanvasElement;
    this.chart = new Chart(
        canvas,
        {
        type: 'bar',
        data: data,
        options: {
          maintainAspectRatio: false,
          scales: {
            y: {
              stacked: true,
              grid: {
                display: true,
                color: "rgba(255,99,132,0.2)"
              }
            },
            x: {
              grid: {
                display: false
              }
            }
        }

        }
        }
    );
  }

}
</script>
