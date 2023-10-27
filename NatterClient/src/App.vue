<script setup>
import { RouterView } from 'vue-router'
import Nav from './components/navbar/Nav.vue'
import NavFooter from './components/navbar/NavFooter.vue'
</script>

<template>
  <Nav v-if="!$route.meta.hideNav" />

  <RouterView />

  <NavFooter v-if="!$route.meta.hideNav" />
</template>
