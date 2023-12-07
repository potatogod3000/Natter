<template>
    <header id="navbar"
        class="fixed top-0 inset-x-0 z-10 bg-light-soft/90 dark:bg-dark-soft/80 shadow-sm shadow-dark-soft/20 dark:shadow-light-soft/20 filter backdrop-blur transition-all duration-500">

        <nav class="container py-2">

            <ul>
                <div class="flex items-center justify-between text-dark dark:text-light font-bold">
                    <li>
                        <RouterLink :to="{ name: 'home' }" class="flex gap-1">
                            <img src="/favicon.ico" width="32" />
                            <span class="font-palanquin text-xl text-accent">Natter</span>
                        </RouterLink>
                    </li>

                    <div class="max-md:hidden md:flex md:items-center md:gap-8 ">
                        <li>
                            <RouterLink :to="{ name: 'chats' }" active-class="text-accent"
                                class="hover:underline hover:text-accent-light underline-offset-8 transition-all duration-200">
                                Natter Chat
                            </RouterLink>
                        </li>

                        <li v-if="!props.userStore.isLoggedIn">
                            <RouterLink :to="{ name: 'auth' }" active-class="text-accent"
                                class="hover:underline hover:text-accent-light underline-offset-8 transition-all duration-200">
                                Login / Register
                            </RouterLink>
                        </li>

                        <li v-else>
                            <RouterLink :to="{ name: 'profile' }" active-class="text-accent"
                                class="hover:underline hover:text-accent-light underline-offset-8 transition-all duration-200">
                                Hello, {{
                                    props.userStore.username }}
                            </RouterLink>
                        </li>

                        <li class="border-l border-black dark:border-white pl-8">
                            <ToggleDarkMode />
                        </li>
                    </div>

                    <div class="max-md:block md:hidden">

                        <Transition mode="out-in" enter-active-class="transition-all duration-200"
                            enter-from-class="transform rotate-90" leave-active-class="transition-all duration-200"
                            leave-to-class="transform -rotate-90" title="Open Navbar">
                            <Bars3Icon class="w-5 cursor-pointer" v-if="!showCollapsedNav"
                                @click="showCollapsedNav = true" />
                            <XMarkIcon class="w-5 cursor-pointer" v-else @click="showCollapsedNav = false" />
                        </Transition>
                        <NavCollapsed :show="showCollapsedNav" :userStore="props.userStore"
                            @close="showCollapsedNav = false" />

                    </div>

                </div>
            </ul>

        </nav>

    </header>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/solid'
import ToggleDarkMode from "./ToggleDarkMode.vue";
import NavCollapsed from "./NavCollapsed.vue";

const props = defineProps({
    userStore: {
        type: Object,
        required: true
    }
});

const showCollapsedNav = ref(false)

let prevScrollPos = window.pageYOffset;
window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
    } else {
        if (!showCollapsedNav.value) {
            document.getElementById("navbar").style.top = "-55px";
        }
    }
    prevScrollPos = currentScrollPos;
};
</script>