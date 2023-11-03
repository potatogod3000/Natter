<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
    <div class="max-h-screen dark:bg-dark-soft bg-light-soft">
        <div class="container flex flex-1 flex-col items-center justify-center py-40 text-white text-center">
            <h1 class="text-7xl font-palanquin font-extrabold py-5 text-accent">Stay Connected, Anytime, Anywhere!</h1>
            <p class="text-xl font-montserrat font-bold dark:text-light text-dark">Experience the Ultimate Chatting App - Instant Communication, Rich Features, and More!</p>
            <RouterLink :to="{name: 'chats'}"><button class="button-hero-accent">Start Chatting</button></RouterLink>
        </div>
    </div>
</template>