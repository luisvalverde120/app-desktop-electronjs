import { createStore } from "vuex";
import Axios from "axios";
import router from "../router";

export default createStore({
  state: {
    auth: {
      token: null,
      loginIn: false,
      loginError: null,
    },
    taskData: {
      task: [],
      totalHours: null,
      datesTask: [],
      errorTask: null,
    },
    taskMessageState: null,
  },
  mutations: {
    loginStart(state) {
      state.auth.loginIn = true;
    },
    loginStop(state, errorMessage) {
      state.auth.loginIn = false;
      state.auth.loginError = errorMessage;
    },
    updateToken(state, token) {
      state.auth.token = token;
    },
    logout(state) {
      state.auth.token = null;
    },
    taskUpdate(state, tasks) {
      state.taskData.task = tasks;
    },
    taskHoursUpdate(state, tasks) {
      let i = 0;
      let auxList = [];
      while (i < tasks.length) {
        auxList.push(tasks[i].totalHoursDay);
        i++;
      }
      state.taskData.totalHours = auxList;
      console.log(state.taskData.totalHours);
    },
    taskDatesUpdate(state, tasks) {
      let i = 0;
      let auxList = [];
      while (i < tasks.length) {
        auxList.push(tasks[i].date);
        i++;
      }
      state.taskData.datesTask = auxList;
    },
    taskMessage(state, message) {
      state.taskMessageState = message;
    },
  },
  actions: {
    taskHoursTotal(context, dates) {
      Axios.post("http://localhost:5000/api/v1/get-task-by-range-date", dates, {
        headers: {
          "access-token": localStorage.getItem("access-token"),
        },
      })
        .then((res) => {
          localStorage.setItem("access-token", res.headers["access-token"]);
          context.commit("taskUpdate", res.data.listTask);
          context.commit("taskHoursUpdate", res.data.listTask);
          context.commit("taskDatesUpdate", res.data.listTask);
        })
        .catch((err) => {
          console.log(err);
          context.commit("errorTask", err.message);
        });
    },
    login(context, dataUser) {
      context.commit("loginStart");

      Axios.post("http://localhost:5000/api/v1/login", dataUser)
        .then((res) => {
          localStorage.setItem("access-token", res.headers["access-token"]);
          context.commit("updateToken", res.headers["access-token"]);
          context.commit("loginStop", null);
          router.push("/");
        })
        .catch((err) => {
          context.commit("loginStop", err.message);
        });
    },
    register(context, dataUser) {
      Axios.post("http://localhost:5000/api/v1/register", dataUser)
        .then((res) => {
          alert("usuario creado exitosamente");
        })
        .catch((err) => {
          alert("Error al crear un usuario");
        });
    },
    createTask(context, datas) {
      Axios.post("http://localhost:5000/api/v1/create-task", datas, {
        headers: {
          "access-token": localStorage.getItem("access-token"),
        },
      })
        .then((res) => {
          localStorage.setItem("access-token", res.headers["access-token"]);
          context.commit("taskMessage", res.data.message);
        })
        .catch((err) => {
          context.commit("taskMessage", null);
        });
    },
    fetchAccessToken(context) {
      context.commit("updateToken", localStorage.getItem("access-token"));
    },
    logout(context) {
      localStorage.removeItem("access-token");
      context.commit("logout");
      router.push("/login");
    },
  },
  getters: {
    getErrorAuth(state) {
      return state.auth.loginError;
    },
    getHours(state) {
      return state.taskData.totalHours;
    },
    getTask(state) {
      console.log(state.taskData.task);
      return state.taskData.task;
    },
    getDates(state) {
      return state.taskData.datesTask;
    },
    getTaskMessage(state) {
      return state.taskMessageState;
    },
  },
  modules: {},
});
