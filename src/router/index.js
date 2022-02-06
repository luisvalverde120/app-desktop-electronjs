import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import CreateTask from "../views/CreateTask.vue";
import store from "../store/index";
import ChangePassword from "../views/ChangePassword.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/create-task",
    name: "CreateTask",
    component: CreateTask,
  },
  {
    path: "/cambiar-password",
    name: "ChangePassword",
    component: ChangePassword,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  store.dispatch("fetchAccessToken");
  if (to.fullPath === "/" || to.fullPath === "/create-task") {
    if (!store.state.auth.token) {
      next("/login");
    }
  }
  if (to.fullPath === "/login" || to.fullPath === "/register") {
    if (store.state.auth.token) {
      next("/");
    }
  }
  next();
});

export default router;
