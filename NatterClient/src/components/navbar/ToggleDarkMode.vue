<script setup>
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
    <div class="ml-8 cursor-pointer" @click="toggleDark()">
        {{ isDark ? "Dark" : "Light" }}
    </div>
</template>