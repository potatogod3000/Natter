<template>
    <div class="form-card">

        <h1 class="flex justify-center text-xl pt-4">Change Password</h1>

        <form @submit.prevent class="flex flex-col gap-4 px-4 pb-4 pt-2">
            <div class="flex flex-col">
                <label>Current Password</label>
                <input type="password" v-model="currentPassword" class="input" />
            </div>

            <div class="flex flex-col">
                <label>New Password</label>
                <input type="password" v-model="newPassword" class="input" />
            </div>

            <div class="flex flex-col">
                <label>Re-enter New Password</label>
                <input type="password" v-model="newPasswordConfirm" class="input" />
            </div>

            <div class="flex justify-center">
                <button type="button" @click="submitChanges" class="px-4 py-2 border"
                    :disabled="buttonDisable">Update</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { profileUrl } from '@/scripts/apiUrls.js'

const props = defineProps({
    email: {
        required: true,
        type: String
    },
})

const currentPassword = ref("")
const newPassword = ref("")
const newPasswordConfirm = ref("")

const buttonDisable = computed(() => {
    if (currentPassword.value === '') return true
    if (newPassword.value === '' && newPasswordConfirm.value === '') return true
    if (newPassword.value !== newPasswordConfirm.value) return true
    return false
})
const validationError = ref("")

async function submitChanges() {
    const body = {
        "email": props.email,
        "currentPassword": currentPassword.value,
        "newPassword": newPassword.value
    }

    const response = await fetch(`${profileUrl}/update-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        credentials: 'include'
    })
    const received = response.json()

    if (response.ok) {
        console.log(received)
    }
    else {
        console.log(received)
    }
}
</script>