<template>
    <div class="form-card p-4">
        <h1 class="text-2xl text-center">Messages</h1>

        <div v-if="messages.length === 0 && error === ''">
            <p class="text-center mt-2 text-sm text-gray-500">You haven't sent any message in any server yet.</p>
        </div>

        <div v-else-if="messages.length === 0 && error !== ''">
            <p class="text-center mt-2 text-sm text-red-500">{{ error }}</p>
        </div>

        <div v-else>
            <div v-for="message in messages" :key="message.id">

            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { profileUrl } from '@/scripts/apiUrls.js'

const messages = ref([])
const error = ref("Oh No! Error Occurred!")

onMounted(getMessages)

async function getMessages() {
    try {
        const response = await fetch(`${profileUrl}/get-messages`, {
            method: "GET",
            credentials: "include"
        })

        if (response.ok || response.status === 200) {
            messages.value = await response.json()
        }
        else if (response.status >= 400) {
            error.value = await response.text()
        }
    }
    catch (exc) {
        error.value = exc.message
    }
}
</script>