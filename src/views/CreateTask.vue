<template>
  <div class="h-full mx-auto">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/create-task">Create Task</router-link> |
      <router-link to="/cambiar-password">Cambiar contraseña</router-link>
    </div>
    <div class="w-full h-auto flex justify-center">
      <label class="text-2xl">Crear Nueva Tarea</label>
    </div>
    <div class="w-full flex justify-center pt-5" v-if="message !== null">
      <div class="w-2/4 p-2 rounded-md bg-red-200 flex flex-col items-center">
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
          Error en la creacion de la nueva tarea verifique si las credenciales
          son correctas
        </p>
      </div>
    </div>
    <div class="w-full h-full flex justify-center mt-10">
      <div class="w-2/4">
        <div>
          <Listbox
            as="div"
            class="flex flex-col items-start"
            v-model="selected"
          >
            <ListboxLabel class="block text-sm font-medium ml-6 text-gray-700">
              Tarea:
            </ListboxLabel>
            <div class="mt-1 relative w-full">
              <ListboxButton
                class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <span class="flex items-center">
                  <span class="ml-3 block truncate">{{
                    selected.type_task
                  }}</span>
                </span>
                <span
                  class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                  </svg>
                </span>
              </ListboxButton>

              <transition
                leave-active-class="transition ease-in duration-100"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    as="template"
                    v-for="task in tasks"
                    :key="task.id"
                    :value="task"
                    v-slot="{ active, selected }"
                  >
                    <li
                      :class="[
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9',
                      ]"
                    >
                      <div class="flex items-center">
                        <span
                          :class="[
                            selected ? 'font-semibold' : 'font-normal',
                            'ml-3 block truncate',
                          ]"
                        >
                          {{ task.type_task }}
                        </span>
                      </div>

                      <span
                        v-if="selected"
                        :class="[
                          active ? 'text-white' : 'text-indigo-600',
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                        ]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          aria-hidden="true"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>
        <!--
          select task of type task
        -->
        <div class="mt-5" v-if="selected.type_task !== 'Otro'">
          <Listbox
            as="div"
            class="flex flex-col items-start"
            v-model="selectedTask"
          >
            <ListboxLabel class="text-sm font-medium ml-6 text-gray-700">
              tipo de tarea:
            </ListboxLabel>
            <div class="mt-1 relative w-full">
              <ListboxButton
                class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <span class="flex items-center">
                  <span class="ml-3 block truncate">{{
                    selectedTask.name
                  }}</span>
                </span>
                <span
                  class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                  </svg>
                </span>
              </ListboxButton>

              <transition
                leave-active-class="transition ease-in duration-100"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    as="template"
                    v-for="task in selected.task"
                    :key="task.id"
                    :value="task"
                    v-slot="{ active, selectedTask }"
                  >
                    <li
                      :class="[
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9',
                      ]"
                    >
                      <div class="flex items-center">
                        <span
                          :class="[
                            selectedTask ? 'font-semibold' : 'font-normal',
                            'ml-3 block truncate',
                          ]"
                        >
                          {{ task.name }}
                        </span>
                      </div>

                      <span
                        v-if="selectedTask"
                        :class="[
                          active ? 'text-white' : 'text-indigo-600',
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                        ]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          aria-hidden="true"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>
        <div class="mt-5" v-if="selected.type_task === 'Otro'">
          <div class="flex flex-col items-start">
            <label class="text-sm ml-6">Nombre de la Actividad:</label>
            <input
              class="h-9 pl-6 pr-4 mt-2 w-full border-2 shadow-sm rounded-lg"
              type="text"
              placeholder="eje: recuperar disco duro"
              v-model="taskData.tasksOther"
            />
          </div>
        </div>
        <div class="mt-5">
          <Listbox
            as="div"
            class="flex flex-col items-start"
            v-model="selectedState"
          >
            <ListboxLabel class="text-sm font-medium ml-6 text-gray-700">
              tipo de tarea:
            </ListboxLabel>
            <div class="mt-1 relative w-full">
              <ListboxButton
                class="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <span class="flex items-center">
                  <span class="ml-3 block truncate">{{
                    selectedState.name
                  }}</span>
                </span>
                <span
                  class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                  </svg>
                </span>
              </ListboxButton>

              <transition
                leave-active-class="transition ease-in duration-100"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    as="template"
                    v-for="state in states"
                    :key="state.id"
                    :value="state"
                    v-slot="{ active, selectedState }"
                  >
                    <li
                      :class="[
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9',
                      ]"
                    >
                      <div class="flex items-center">
                        <span
                          :class="[
                            selectedState ? 'font-semibold' : 'font-normal',
                            'ml-3 block truncate',
                          ]"
                        >
                          {{ state.name }}
                        </span>
                      </div>

                      <span
                        v-if="selectedState"
                        :class="[
                          active ? 'text-white' : 'text-indigo-600',
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                        ]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          aria-hidden="true"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>
        <div class="mt-5" v-if="selectedState.name === 'terminado'">
          <div class="flex flex-col items-start">
            <label class="text-sm ml-6">Horas Trabajadas:</label>
            <input
              class="h-9 pl-6 pr-4 mt-2 w-full border-2 shadow-sm rounded-lg"
              type="Number"
              placeholder="eje: 1"
              v-model="taskData.time_finish"
            />
          </div>
        </div>
        <div class="mt-5" v-if="selectedState.name !== 'terminado'">
          <div class="flex flex-col items-start">
            <label class="text-sm ml-6">Observaciones:</label>
            <textarea
              id="observations"
              class="h-24 pl-6 pr-4 py-2 mt-2 w-full border-2 text-sm shadow-sm rounded-lg"
              placeholder="eje: comprar disco duro"
              v-model="taskData.observations"
            ></textarea>
          </div>
        </div>
        <div class="mt-5">
          <div class="flex flex-col items-start">
            <label class="text-sm ml-6">Nombre del Usuario:</label>
            <input
              class="h-9 pl-6 pr-4 mt-2 w-full border-2 shadow-sm rounded-lg"
              type="text"
              placeholder="eje: Marco Ortiz"
              v-model="taskData.name"
            />
          </div>
        </div>
        <div class="mt-5">
          <div class="flex flex-col items-start">
            <label class="ml-6 text-sm">fecha:</label>
            <input
              type="date"
              class="h-9 pl-6 pr-4 mt-2 w-full border-2 shadow-sm rounded-lg"
              v-model="taskData.date"
            />
          </div>
        </div>
        <div class="mt-5">
          <button
            class="h-9 w-full border-2 shadow-sm rounded-lg bg-blue-500 text-white"
            @click="sendData"
          >
            Crear Tarea
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";

const tasks = [
  {
    id: 1,
    type_task: "Mantenimiento",
    task: [
      { id: 1, name: "recarga de cartuchos de impresora" },
      { id: 2, name: "recarga de papel de impresora" },
      { id: 3, name: "actualizacion de computadoras" },
      { id: 4, name: "cambio de discos duros" },
      { id: 5, name: "actualizacion del fireware" },
    ],
  },
  {
    id: 2,
    type_task: "Programacion",
    task: [
      { id: 1, name: "modificacion de microservicios" },
      { id: 2, name: "creacion de microservicios" },
      { id: 3, name: "modificacion de frontend" },
      { id: 4, name: "creacion del frontend" },
      { id: 5, name: "creacion del backend" },
      { id: 6, name: "modificacion del backend" },
      { id: 7, name: "sistemas de compra" },
      { id: 8, name: "test unitarios" },
      { id: 9, name: "test de integracion" },
      { id: 10, name: "modelado de base de datos" },
      { id: 11, name: "creacion de base de datos" },
    ],
  },
  {
    id: 3,
    type_task: "Reparacion",
    task: [
      { id: 1, name: "areglo de bux del sistema" },
      { id: 2, name: "areglo de rendimiento del sistema" },
      { id: 3, name: "areglo de seguridad del sistema" },
      { id: 4, name: "areglo de vulnerabilidades en la base de datos" },
      { id: 5, name: "reparacion de computadoras" },
      { id: 6, name: "reparacion de impresora" },
    ],
  },
  {
    id: 4,
    type_task: "Configuracion",
    task: [
      { id: 1, name: "configuracion de contenedores docker" },
      { id: 2, name: "configuracion de red de computadoras" },
      { id: 3, name: "configuracion de variables de entorno" },
      { id: 4, name: "configuracion de git" },
      { id: 5, name: "configuracion de servidores" },
    ],
  },
  {
    id: 5,
    type_task: "Otro",
  },
];

const states = [
  { id: 1, name: "pendiente" },
  { id: 2, name: "en progreso" },
  { id: 3, name: "terminado" },
];

export default {
  name: "CreateTask",
  data: () => {
    return {
      message: null,
      taskData: {
        observations: "",
        tasksOther: "",
        name: "",
        date: "",
        time_finish: 0,
      },
    };
  },
  components: {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
  },
  methods: {
    ...mapActions(["createTask"]),
    ...mapGetters(["getTaskMessage"]),
    sendData() {
      let task = this.selectedTask.name;

      if (this.selectedState.name !== "terminado") {
        this.taskData.time_finish = 0;
      }

      if (this.selected.type_task === "Otro") {
        task = this.taskData.tasksOther;
      }

      let data = {
        state: this.selectedState.name,
        type_task: this.selected.type_task,
        task,
        user: this.taskData.name,
        observations: this.taskData.observations,
        time_finish: Number(this.taskData.time_finish),
        date: this.taskData.date,
      };
      this.createTask(data);
      this.message = this.getTaskMessage();
    },
  },
  setup() {
    const selected = ref(tasks[0]);
    const selectedTask = ref(selected.value.task[0]);
    const selectedState = ref(states[0]);

    return {
      tasks,
      states,
      selected,
      selectedTask,
      selectedState,
    };
  },
};
</script>
