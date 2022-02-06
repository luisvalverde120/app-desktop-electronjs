<template>
  <div class="container mx-auto h-full flex flex-col items-center">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/create-task">Create Task</router-link> |
      <router-link to="/cambiar-password">Cambiar contraseña</router-link>
    </div>
    <div
      class="max-w-fix min-w-md w-2/5 h-3/5 rounded-xl bg-white shadow-lg grid grid-rows-6 px-10 py-10"
    >
      <div>
        <div class="flex flex-col">
          <label class="text-3xl">Cambiar Contraseña</label>
        </div>
      </div>
      <div class="flex flex-col items-start mt-4 justify-center">
        <label class="mx-1 text-md text-gray-500">Constraseña Actual</label>
        <input
          type="password"
          v-model="dataUser.password"
          class="border-2 px-2 w-full rounded-md"
        />
      </div>
      <div class="flex flex-col items-start mt-4 justify-center">
        <label class="mx-1 text-md text-gray-500">Nueva Constraseña </label>
        <input
          type="password"
          v-model="dataUser.newPassword"
          class="border-2 px-2 w-full rounded-md"
        />
      </div>
      <div class="flex flex-col items-start mt-4 justify-center">
        <label class="mx-1 text-md text-gray-500">Confirmar Constraseña</label>
        <input
          type="password"
          v-model="dataUser.confirmNewPassword"
          class="border-2 px-2 w-full rounded-md"
        />
      </div>
      <div class="flex mt-4 items-center justify-start">
        <button
          class="border-2 px-2 w-full rounded-md bg-blue-500 text-white"
          @click="sendData"
        >
          Cambiar Contraseña
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "cambiar contraseña",
  data: () => {
    return {
      dataUser: {
        password: "",
        newPassword: "",
        confirmNewPassword: "",
      },
    };
  },
  methods: {
    ...mapActions(["updatePassword"]),
    sendData() {
      this.updatePassword(this.dataUser);
    },
  },
};
</script>
