<script setup>
import { RouterView } from 'vue-router'
import Nav from './components/navbar/Nav.vue'
import NavFooter from './components/navbar/NavFooter.vue'
</script>

<template>
  <main class="flex flex-col min-h-screen">
    <Nav v-if="!$route.meta.hideNav" />

    <section class="flex-grow">
      <RouterView />
    </section>

    <NavFooter v-if="!$route.meta.hideNav" />
  </main>
</template>
