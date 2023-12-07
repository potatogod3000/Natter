<template>
    <div class="dark:bg-dark-soft bg-light-soft text-dark dark:text-light border-t border-accent">
        <div class="container divide-y dark:divide-light divide-dark">
            <div class="flex max-sm:flex-col items-center justify-between py-10 max-sm:py-3 gap-2 text-center">
                <p>&copy; {{ year }} Natter</p>
                <p>Connecting the World, One Chat at a Time</p>
            </div>
            <div
                class="flex max-sm:flex-col items-center justify-center max-sm:divide-y sm:divide-x dark:divide-light divide-dark max-sm:py-3 sm:py-8">
                <RouterLink :to="{ name: 'home' }" class="max-sm:py-2 max-sm:w-36 text-center sm:px-5">Home</RouterLink>
                <RouterLink :to="{ name: 'chats' }" class="max-sm:py-2 max-sm:w-36 text-center sm:px-5">Natter Chat
                </RouterLink>
                <RouterLink v-if="!props.isLoggedIn" :to="{ name: 'auth' }"
                    class="max-sm:py-2 max-sm:w-36 text-center sm:px-5">Login /
                    Register
                </RouterLink>
                <RouterLink v-else :to="{ name: 'profile' }" class="max-sm:py-2 max-sm:w-36 text-center sm:px-5">Profile
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
    isLoggedIn: {
        type: Boolean,
        default: false,
        required: true
    }
})

const year = new Date().getUTCFullYear()
</script>