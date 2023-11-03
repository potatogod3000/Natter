<script setup>
import { features } from "@/assets/contents/features.js";
</script>

<template>
  <div v-for="feature in features" :key="feature.title">
    <div class="flex flex-col items-center justify-center shadow-md py-12 px-6 dark:bg-dark-soft bg-light-soft rounded-md">
      
        <div class="text-2xl mb-2 font-palanquin text-accent font-bold text-center">
            {{ feature.title }}
        </div>

        <div class="text-lg dark:text-light-soft text-dark-soft font-montserrat text-center">
            {{ feature.content }}
        </div>

    </div>
  </div>
</template>
