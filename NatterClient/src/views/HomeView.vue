<script setup>
import Features from "../components/home/Features.vue";
import Hero from "../components/home/Hero.vue";
</script>

<template>
  <section>
    <Hero />
  </section>

  <section class="dark:bg-dark bg-light">
    <div class="container grid max-sm:grid-cols-1 lg:grid-cols-3 max-lg:grid-cols-2 gap-10 text-white pt-20">
      <Features />
    </div>
  </section>

  <section>Natter+</section>

  <section>Start Chatting</section>
</template>
