<script setup>
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
</script>

<template>
    <header class="bg-slate-300 dark:bg-gray-950 text-green-400 border-b border-green-400 font-bold">
        <ul class="container mx-auto">
            <div class="flex h-14 items-center justify-between">
                <li><RouterLink to="/"><img src="/favicon.ico" width="32" /></RouterLink></li>
                
                <div class="flex gap-8">
                    <li><RouterLink to="/about" class="hover:underline underline-offset-8 transition-all">About</RouterLink></li>
                    <li><RouterLink to="/chats" class="hover:underline underline-offset-8 transition-all">Natter Chat</RouterLink></li>
                </div>
                
                <li v-if="!userStore.isLoggedIn"><RouterLink to="/auth" class="hover:underline underline-offset-8 transition-all">Login / Register</RouterLink></li>
                <li v-else><RouterLink to="/profile" class="hover:underline underline-offset-8 transition-all">Hello, {{ userStore.username }}</RouterLink></li>
            </div>
        </ul>
    </header>
</template>