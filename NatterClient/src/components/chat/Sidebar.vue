<script setup>
import { RouterLink } from "vue-router";
import ToggleDarkMode from "../navbar/ToggleDarkMode.vue";

defineProps({
  serversJoined: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="fixed top-2 left-2 bottom-2 rounded-2xl flex flex-col gap-5 py-3 items-center w-16 bg-light-soft dark:bg-dark-soft border hover:border-accent border-accent/10 overflow-y-scroll"
  >
    <RouterLink to="/"><img src="/favicon.ico" width="32" /></RouterLink>

    <div
      class="flex items-center justify-center w-10 h-10 bg-light dark:bg-dark hover:bg-accent hover:dark:bg-accent border border-accent rounded-lg hover:rounded-full transition-all duration-200 cursor-pointer"
      title="Home"
      @click="$emit('selectedServer', 'home')"
    >
      <font-awesome-icon
        icon="fa-solid fa-server"
        class="p-2 text-dark dark:text-light"
      ></font-awesome-icon>
    </div>

    <div class="border-t dark:border-light border-dark w-4/5"></div>

    <div v-for="server in serversJoined" :key="server.Name">
      <div
        class="flex flex-grow items-center justify-center w-10 h-10 bg-light dark:bg-dark hover:bg-accent hover:dark:bg-accent border border-accent rounded-lg hover:rounded-full transition-all duration-200 cursor-pointer"
        @click="$emit('selectedServer', server.name)"
      >
        <img
            v-if="server.img"
            :src="server.img"
            width="28"
            class="p-2"
            :title="server.name"
        />
        <font-awesome-icon
            v-else
            icon="fa-solid fa-server"
            class="p-2"
            :title="server.name"
        ></font-awesome-icon>
      </div>
    </div>

    <ToggleDarkMode class="absolute bottom-3" />
    
  </div>
</template>
