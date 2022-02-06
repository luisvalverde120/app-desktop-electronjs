<template>
  <div>
    <ApexCharts
      width="600"
      type="bar"
      :options="chartOptions"
      :series="series"
    />
  </div>
  <div>
    <button @click="updateChart">Update!</button>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "Chart",
  components: {
    ApexCharts: VueApexCharts,
  },
  props: {
    categoriesProps: {
      type: Array,
    },
    datasets: {
      type: Array,
    },
  },
  data: function () {
    return {
      chartOptions: {},
      series: [
        {
          name: "horas trabajadas",
          data: [0],
        },
      ],
    };
  },
  methods: {
    updateChart() {
      this.chartOptions = {
        chart: {
          id: "vuechart-tasks",
        },
        xaxis: {
          categories: this.categoriesProps,
        },
        dataLabels: {
          enabled: true,
        },
      };
      this.series = [
        {
          data: this.datasets,
        },
      ];
    },
  },
};
</script>
