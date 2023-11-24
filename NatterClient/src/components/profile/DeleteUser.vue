<template>
    <h1 class="text-red-500">Delete Account</h1>
    <label>Password</label>
    <input type="password" />
    <button @click="submitAction">Delete Account</button>
</template>

<script setup>
import { profileUrl } from '@/scripts/apiUrls.js'

const props = defineProps({
    email: {
        type: String,
        required: true
    }
})

async function submitAction() {
    const body = {

    }

    const response = await fetch(`${profileUrl}/deleteUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
}
</script>