<script setup>
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
    <div class="cursor-pointer text-dark dark:text-light" @click="toggleDark()">
        {{ isDark ? "Dark" : "Light" }}
    </div>
</template>