<script>
import { defineComponent } from "vue";
import { Bar } from "vue3-chart-v2";

export default defineComponent({
  name: "Grafics",
  extends: Bar,
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      required: false,
    },
  },
  mounted() {
    this.renderBarChart();
  },
  computed: {
    charD() {
      return this.chartData;
    },
  },
  methods: {
    renderBarChart() {
      this.renderChart(this.chartData, {
        resposive: true,
        maintainAspectRatio: false,
      });
    },
  },
  watch: {
    data: function () {
      //this._chart.destroy();
      this.renderBarChart();
    },
  },
});
</script>
