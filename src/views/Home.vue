<template>
  <div class="h-full">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/create-task">Create Task</router-link> |
      <router-link to="/cambiar-password">Cambiar contraseña</router-link>
    </div>
    <div class="flex flex-col items-center">
      <label class="mt-5 text-2xl">Inicio</label>
      <button
        class="mt-5 w-52 border-2 bg-red-600 text-white px-2 p-y4 rounded-lg transition hover:bg-red-700"
        @click="logout"
      >
        Cerrar Sesion
      </button>
    </div>
    <div class="h-auto pt-5">
      <div class="flex flex-row items-start mb-4">
        <div class="flex flex-col items-start">
          <label class="ml-10 px-2 text-xs">fecha inicial</label>
          <input
            type="date"
            v-model="datesSearch.startDate"
            class="w-44 ml-10 border-2 rounded-md px-2"
          />
        </div>
        <div class="flex flex-col items-start">
          <label class="ml-10 px-2 text-xs">fecha final</label>
          <input
            type="date"
            v-model="datesSearch.endDate"
            class="w-44 mx-10 border-2 rounded-md px-2"
          />
        </div>
        <div class="flex items-end h-full mt-4">
          <button
            class="w-32 h-7 rounded-md bg-esmerald-400 transition hover:bg-esmerald-500 hover:border-esmerald-700"
            @click="sendData"
          >
            Buscar
          </button>
        </div>
      </div>
      <!--
        esta parte genera muchos bug en su implementacion 
        devido a eso no esta integrada
      -->
      <div class="flex flex-col items-start mx-10" style="display: none">
        <label class="cursor-pointer" id="byHour">
          <input
            type="radio"
            name="typeSearch"
            @click="changeTypeSearch"
            id="byHourCheck"
            checked
          />
          Total de horas
        </label>
        <label class="cursor-pointer" id="byUser">
          <input
            type="radio"
            name="typeSearch"
            @click="changeTypeSearch"
            id="byUserCheck"
          />
          Por trabajador
        </label>
        <label class="cursor-pointer" id="byTask">
          <input
            type="radio"
            name="typeSearch"
            @click="changeTypeSearch"
            id="byTaskCheck"
          />
          Por tarea
        </label>
      </div>
    </div>
    <div class="h-full mx-10">
      <Chart
        :datasets="chartData.datasets"
        :categoriesProps="chartData.categoriesChart"
      />
    </div>
  </div>
</template>

<script>
import Chart from "../components/Grafics.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  data: () => {
    return {
      renderComponent: true,
      datesSearch: {
        startDate: null,
        endDate: null,
      },
      typeSearch: {
        byHours: true,
        byUser: false,
        byTask: false,
      },
      chartData: {
        datasets: [0],
        categoriesChart: [],
      },
    };
  },
  methods: {
    ...mapActions(["taskHoursTotal", "logout"]),
    changeTypeSearch(event) {
      let targetId = event.currentTarget.id;
      if (targetId === "byHour" || targetId === "byHourCheck") {
        this.typeSearch.byHours = true;
        this.typeSearch.byUser = false;
        this.typeSearch.byTask = false;
      }
      if (targetId === "byUser" || targetId === "byUserCheck") {
        this.typeSearch.byHours = false;
        this.typeSearch.byUser = true;
        this.typeSearch.byTask = false;
      }
      if (targetId === "byTask" || targetId === "byTaskCheck") {
        this.typeSearch.byHours = false;
        this.typeSearch.byUser = false;
        this.typeSearch.byTask = true;
      }
    },
    getDataChart() {},
    sendData() {
      this.taskHoursTotal({
        dateInit: this.datesSearch.startDate,
        dateEnd: this.datesSearch.endDate,
      });

      this.handleDataChart();
      this.forceRender();
    },
    ...mapGetters(["getHours", "getDates", "getTask"]),
    handleDataChart() {
      this.chartData.categoriesChart = JSON.parse(
        JSON.stringify(this.getDates())
      );
      this.chartData.datasets = JSON.parse(JSON.stringify(this.getHours()));
    },
    forceRender() {
      this.renderComponent = false;
      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
  },
  components: {
    Chart,
  },
};
</script>
