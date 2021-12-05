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
    const labels = [
     'Milk Tea',
      'Beef Burger',
      'Mango Shake',
      'Black Tea',
    ];
    const data = {
      
      labels: labels,
      datasets: [
       {
          label: 'products',
          data:[3400, 1030, 512, 2230],
          backgroundColor: 'green',
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
           display: true,
           position: 'top',

          }

        }
      },
      
    });
  }
}
</script>
