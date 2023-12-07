<template>
    <Transition
        enter-active-class="transition-all duration-200"
        enter-from-class="translate-x-full opacity-0"
        leave-active-class="transition-all duration-200"
        leave-to-class="translate-x-full opacity-0"
    >
        <div v-if="show" class="absolute top-12 inset-x-0 p-2 max-h-screen bg-light-soft/90 dark:bg-dark-soft/80 shadow-sm shadow-dark-soft/20 dark:shadow-light-soft/20 filter backdrop-blur transition-all duration-500 border-t border-accent">
            <ul class="flex flex-col items-center" >

                <li class="w-4/6 border-b dark:border-light/30 border-dark/30 py-2">
                    <RouterLink :to="{ name: 'home' }"
                        class="hover:underline underline-offset-8 transition-all duration-200"
                        @click="$emit('close')"
                    >Home
                    </RouterLink>
                </li>

                <li class="w-4/6 border-b dark:border-light/30 border-dark/30 py-2">
                    <RouterLink :to="{ name: 'chats' }"
                        class="hover:underline underline-offset-8 transition-all duration-200"
                        @click="$emit('close')"
                    >Natter Chat
                    </RouterLink>
                </li>

                <li v-if="!props.userStore.isLoggedIn" class="w-4/6 border-b dark:border-light/30 border-dark/30 py-2">
                    <RouterLink :to="{ name: 'auth' }"
                        class="hover:underline underline-offset-8 transition-all duration-200"
                        @click="$emit('close')"
                    >Login / Register
                    </RouterLink>
                </li>

                <li v-else class="w-4/6 border-b dark:border-light/30 border-dark/30 py-2">
                    <RouterLink :to="{ name: 'profile' }"
                        class="hover:underline underline-offset-8 transition-all duration-200"
                        @click="$emit('close')"
                    >Hello, {{ props.userStore.username }}
                    </RouterLink>
                </li>
                
                <li class="w-4/6 flex items-center justify-between py-2">
                    Theme <ToggleDarkMode />
                </li>
            </ul>
        </div>
    </Transition>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import ToggleDarkMode from './ToggleDarkMode.vue'; 

const props = defineProps({
    show: Boolean,
    userStore: Object
})
</script>