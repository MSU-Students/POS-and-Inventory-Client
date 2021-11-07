<template>
  <div>
    <canvas id="myChart" width="400" height="200"></canvas>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Chart from 'chart.js/auto';
@Options({})
export default class monthlyProductSales extends Vue {
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
          data:[34, 281, 213, 67, 123, 443, 8, 338, 231, 312, 555, 131],
          backgroundColor: 'grey',  
        },
        {
          
          data:[34, 103, 512, 223, 220, 730, 465, 567, 100, 99, 345, 1000],
          backgroundColor: 'green',
        },
        {    
          data:[299, 13, 40, 875, 112, 30, 776, 900, 265, 552, 643, 100],
          backgroundColor: 'orange',
        },
      ],
    };
    
       

    const wrapper = this.$el as HTMLElement;
    const canvas = wrapper.querySelector('canvas') as HTMLCanvasElement;
    this.chart = new Chart(canvas, {
      type: 'bar',
      data: data,
      options: {
        responsive:true,
        plugins: {
          legend:{
           display: false

          }

        }
      },
      
    });
  }
}
</script>
