<script setup>
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const year = new Date().getUTCFullYear()
</script>

<template>
    <div class="dark:bg-dark bg-light text-dark dark:text-light border-t border-accent">
        <div class="container divide-y dark:divide-light divide-dark">
            <div class="flex items-center justify-between py-10 text-center">
                <p>&copy; {{ year }} Natter</p>
                <p>Connecting the World, One Chat at a Time</p>
            </div>
            <div class="flex items-center justify-center divide-x dark:divide-light divide-dark py-10">
                <RouterLink :to="{name: 'home'}" class="px-5">Home</RouterLink>
                <RouterLink :to="{name: 'chats'}" class="px-5">Natter Chat</RouterLink>
                <RouterLink v-if="!userStore.isLoggedIn" :to="{name: 'auth'}" class="px-5">Login / Register</RouterLink>
                <RouterLink v-else :to="{name: 'profile'}" class="px-5">Profile</RouterLink>
            </div>
        </div>
    </div>

</template>

<style scoped>

</style>