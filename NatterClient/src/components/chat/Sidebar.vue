<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
    <div class="top-0 left-0 fixed h-screen flex flex-col gap-5 py-3 items-center w-16 shadow-md bg-slate-600">
        <RouterLink to="/"><img src="/favicon.ico"></RouterLink>
        <font-awesome-icon icon="fa-solid fa-server" class=""></font-awesome-icon>
    </div>
</template>