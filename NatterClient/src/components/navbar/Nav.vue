<script setup>
import { RouterLink } from "vue-router";
import { useUserStore } from '@/stores/userStore';
import ToggleDarkMode from '@/components/navbar/ToggleDarkMode.vue'

const userStore = useUserStore();

let prevScrollPos = window.pageYOffset;
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollPos = currentScrollPos;
};
</script>

<template>
  <header
    id="navbar"
    class="fixed top-0 left-0 right-0 z-10 bg-light-soft/90 dark:bg-dark-soft/80 shadow-sm shadow-dark-soft/20 dark:shadow-light-soft/20 filter backdrop-blur transition-all duration-500"
  >
    <nav class="container py-2">
      <ul>
        <div
          class="flex items-center justify-between text-dark dark:text-light font-bold"
        >
          <li>
            <RouterLink :to="{ name: 'home' }" class="flex gap-1">
              <img src="/favicon.ico" width="32" />
              <span class="font-palanquin text-lg text-accent">Natter</span>
            </RouterLink>
          </li>

          <div class="flex gap-8">
            <li>
              <RouterLink
                :to="{ name: 'chats' }"
                class="hover:underline underline-offset-8 transition-all duration-200"
                >Natter Chat</RouterLink
              >
            </li>

            <li v-if="!userStore.isLoggedIn">
              <RouterLink
                :to="{ name: 'auth' }"
                class="hover:underline underline-offset-8 transition-all duration-200"
                >Login / Register</RouterLink
              >
            </li>
            <li v-else>
              <RouterLink
                :to="{ name: 'profile' }"
                class="hover:underline underline-offset-8 transition-all duration-200"
                >Hello, {{ userStore.username }}</RouterLink
              >
            </li>
            <li class="border-l border-black dark:border-white pl-8">
              <ToggleDarkMode />
            </li>
          </div>
        </div>
      </ul>
    </nav>
  </header>
</template>
