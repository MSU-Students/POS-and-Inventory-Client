<template>
  <div>
    <canvas id="myChart" width="1400" height="510"></canvas>
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
          label:'Amount',
          data:[3400, 1030, 512, 2230, 2200, 7300, 4650, 567, 1000, 9900, 3450, 11500],
          backgroundColor: 'green',
        },
        
      ],
    };
    
       

    const wrapper = this.$el as HTMLElement;
    const canvas = wrapper.querySelector('canvas') as HTMLCanvasElement;
    this.chart = new Chart(canvas, {
      type: 'line',
      data: data,
      options: {
        responsive:true,
        plugins: {
          legend:{
           display: true,
           position: 'top',

          }

        }
      },
      
    });
  }
}
</script>
