<template>

    <div class="text-right">
    <Menu as="div" class="relative inline-block text-left">
        <div>
            <MenuButton
                class="inline-flex w-full items-center justify-center rounded-md dark:bg-light/20 bg-dark/20 px-4 py-2 text-sm font-medium dark:text-light text-dark hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                title="Theme Selector"
            >
                <MoonIcon class="w-5" v-if="isDark"/>
                <SunIcon class="w-5" v-else />
                <ChevronDownIcon
                class="-mr-2 ml-2 w-3"
                aria-hidden="true"
                />
            </MenuButton>
        </div>

        <Transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <MenuItems class="absolute right-0 mt-3 w-30 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">

                <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                        <button
                            :class="[
                                active ? 'bg-accent text-white' : 'text-gray-900',
                                'group flex gap-2 w-full justify-center items-center rounded-md px-2 py-2 text-sm'
                            ]"
                            @click="isDark = false"
                        >
                            <SunIcon class="w-5" /> Light
                        </button>
                    </MenuItem>

                    <MenuItem v-slot="{ active }">
                        <button
                            :class="[
                                active ? 'bg-accent text-white' : 'text-gray-900',
                                'group flex gap-2 w-full justify-center items-center rounded-md px-2 py-2 text-sm'
                            ]"
                            @click="isDark = true"
                        >
                            <MoonIcon class="w-5" /> Dark
                        </button>
                    </MenuItem>
                </div>

            </MenuItems>
        </Transition>
    </Menu>
</div>
</template>

<script setup>
import { useDark } from '@vueuse/core';
import { MoonIcon, SunIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';

const isDark = useDark();
</script>
