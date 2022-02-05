<template>
  <div class="container mx-auto h-full flex items-center justify-center p-4">
    <div
      class="max-w-fix min-w-md w-2/5 h-3/5 rounded-xl bg-white shadow-lg grid grid-rows-5 px-10 py-10"
    >
      <div class="flex flex-col">
        <label class="text-3xl">Gestor de Tareas</label>
        <label class="text-xl">Login</label>
      </div>
      <div class="flex flex-col items-start justify-center">
        <label class="mx-1 text-md text-gray-500">Usuario</label>
        <input
          type="text"
          v-model="dataUser.username"
          class="border-2 px-2 w-full rounded-md"
        />
      </div>
      <div class="flex flex-col items-start justify-center">
        <label class="mx-1 text-md text-gray-500">Constraseña</label>
        <input
          type="password"
          v-model="dataUser.password"
          class="border-2 px-2 w-full rounded-md"
        />
      </div>
      <div class="flex items-center justify-start">
        <button
          class="border-2 px-2 w-full rounded-md bg-blue-500 text-white"
          @click="sendData"
        >
          Ingresar
        </button>
      </div>
      <div v-if="errorAuth !== null">
        <div
          class="w-full p-2 rounded-md bg-red-200 flex flex-col items-center"
        >
          <div class="w-full flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-red-500 inline mx-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
            <label class="text-red-700 text-sm">Error Autienticacion</label>
          </div>
          <p class="text-red-500 text-xs justify-center text-left ml-9 pr-1">
            Error en autenticacion por favor verifique si las credenciales son
            correctas
          </p>
        </div>
      </div>
      <div class="mt-8">
        <a
          href="/register"
          class="text-sm text-blue-600 underline decoration-solid"
          >Register</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Login",
  data: () => {
    return {
      dataUser: {
        username: "",
        password: "",
      },
      errorAuth: null,
    };
  },
  methods: {
    ...mapActions(["login"]),
    ...mapGetters(["getErrorAuth"]),
    sendData() {
      this.login(this.dataUser);
      this.errorAuth = this.getErrorAuth();
    },
  },
};
</script>
