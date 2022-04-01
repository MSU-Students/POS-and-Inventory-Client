<template>
  <div>
    <canvas id="myChart" width="400" height="200"></canvas>
    <q-select
      rounded
      outlined
      v-model="selectedYear"
      :options="yearOption"
      label="Year selected"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Chart from 'chart.js/auto';
@Options({})
export default class monthlyProductSales extends Vue {
  chart?: Chart;
  selectedYear = 2022;
  yearOption = [2020, 2021, 2022];
  date = '';
  menu = false;

  mounted() {
    const yearLabel = [
      2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
    ];
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
          data: [34, 22, 10, 67, 15, 42, 8, 76, 11, 74, 30, 40],
          year: 2022,
          backgroundColor: 'grey',
        },
        {
          data: [34, 100, 25, 76, 32, 27, 48, 52, 13, 45, 23, 74],
          year: 2022,
          backgroundColor: 'green',
        },
        {
          data: [44, 13, 40, 10, 12, 30, 89, 44, 76, 21, 65, 100],
          year: 2022,
          backgroundColor: 'orange',
        },
        //<------------------------------------>
        {
          data: [34, 12, 55, 88, 2, 56, 8, 31, 56, 75, 12, 65],
          year: 2021,
          backgroundColor: 'grey',
        },
        {
          data: [34, 11, 55, 88, 21, 56, 31, 65, 100, 99, 90, 12],
          year: 2021,
          backgroundColor: 'green',
        },
        {
          data: [12, 13, 40, 44, 56, 30, 66, 40, 52, 12, 22, 100],
          year: 2021,
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
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}
</script>
