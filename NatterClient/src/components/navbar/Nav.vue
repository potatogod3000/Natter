<script setup>
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
</script>

<template>
    <header class="fixed top-0 left-0 right-0 z-10 bg-light-soft/95 dark:bg-dark-soft/95 filter backdrop-blur">
        <nav class="container py-2">
            <ul>
                <div class="flex items-center justify-between font-bold text-black dark:text-white">
                    <li>
                        <RouterLink :to="{name: 'home'}" class="flex items-center gap-1">
                            <img src="/favicon.ico" width="32" />
                            <span class="text-lg">Natter</span>
                        </RouterLink>
                    </li>
                    
                    <div class="flex gap-8">

                        <li>
                            <RouterLink :to="{name: 'about'}" class="hover:underline underline-offset-8 transition-all duration-200">About</RouterLink>
                        </li>
                        <li>
                            <RouterLink :to="{name: 'chats'}" class="hover:underline underline-offset-8 transition-all duration-200">Natter Chat</RouterLink>
                        </li>

                        <li v-if="!userStore.isLoggedIn">
                            <RouterLink :to="{name: 'auth'}" class="hover:underline underline-offset-8 transition-all duration-200">Login / Register</RouterLink>
                        </li>
                        <li v-else>
                            <RouterLink :to="{name: 'profile'}" class="hover:underline underline-offset-8 transition-all duration-200">Hello, {{ userStore.username }}</RouterLink>
                        </li>
                    
                    </div>
                </div>
            </ul>
        </nav>
    </header>
</template>