<template>
    <form @submit.prevent class="flex flex-col">
        <label>Current Password</label>
        <input type="password" v-model="currentPassword" />
        
        <label>New Password</label>
        <input type="password" v-model="newPassword" />

        <label>Re-enter New Password</label>
        <input type="password" v-model="newPasswordConfirm" />

        <button @click="submitChanges">Update</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { profileUrl } from '@/assets/contents/apiUrls.js'

const props = defineProps({
    email: {
        required: true,
        type: String
    },
})

const currentPassword = ref("")
const newPassword = ref("")
const newPasswordConfirm = ref("")

async function submitChanges() {
    const body = {
        "email": props.email,
        "currentPassword": currentPassword.value,
        "newPassword": newPassword.value
    }

    const response = await fetch(`${profileUrl}/updatePassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        credentials: 'include'
    })
    const received = response.json()

    if(response.ok) {
        console.log(received)
    }
    else {
        console.log(received)
    }
}
</script>