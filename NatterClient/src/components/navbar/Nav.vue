<script setup>
import { RouterLink } from 'vue-router';


</script>

<template>
    <header class="dark:bg-darkBlue dark:text-lightBlueShadow bg-lightBlueShadow shadow-sm shadow-darkBlue dark:shadow-lightBlueShadow font-bold">
        <ul class="container mx-auto">
            <div class="flex h-14 items-center justify-between">
                <li><RouterLink to="/"><img src="/favicon.ico" width="32" /></RouterLink></li>
                
                <div class="flex gap-8">
                    <li><RouterLink to="/about" class="hover:underline underline-offset-8 transition-all">About</RouterLink></li>
                    <li><RouterLink to="/chats" class="hover:underline underline-offset-8 transition-all">Natter Chat</RouterLink></li>
                </div>
                
                <li><RouterLink to="/auth" class="hover:underline underline-offset-8 transition-all">Login / Register</RouterLink></li>
            </div>
        </ul>
    </header>
</template>