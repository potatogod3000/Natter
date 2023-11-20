<script setup>
import { ref } from 'vue';

defineProps({
    serverData: {
        type: Object,
        required: false
    }
})

const chatMessage = ref("")

</script>

<template>
    <div class="flex flex-col h-full">
        <section class="flex-grow">
            <div v-text="serverData.name" class="text-center dark:text-light text-dark text-2xl"></div>
        </section>
        <section v-if="serverData.name !== 'Home'">
            <input class="w-full h-8 outline-none p-2 rounded-lg bg-gray-600 text-white" v-model="chatMessage">
        </section>
    </div>
</template>