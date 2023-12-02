<template>
    <div class="form-card">
        <h1 class="flex justify-center pt-4 text-red-500 text-xl">Delete Account</h1>

        <form class="flex flex-col gap-4 px-4 pb-4 pt-2">
            <div class="flex flex-col">
                <label>Password</label>
                <input type="password" class="input" v-model="password" />
            </div>

            <div class="flex justify-center">
                <button type="button"
                    @click="isOpen = true"
                    class="px-4 py-2 border border-red-500 text-red-500"
                    :disabled="password === '' ? true : false"
                >Delete Account</button>
            </div>
        </form>
    </div>

    <ModalDialog :isOpen="isOpen" @cancel="isOpen = false">
        <template #title>
            <h1 class="inline-flex gap-2 items-center text-red-500">
                <TrashIcon class="w-4" />Delete User Account
            </h1>
        </template>

        <template #body>
            <p class="flex flex-col gap-2">
                Are you sure you want to delete your account?
                <div class="flex gap-2 border border-red-500 text-red-500 p-2">
                    <input type="checkbox" value="true" id="confirmDelete" v-model="confirmDelete" />
                    <label for="confirmDelete">I confirm that I want to delete the account and all my user data</label>
                </div>
            </p>
        </template>

        <template #button1>
            <button class=""
                @click="isOpen = false"
            >
                Cancel
            </button>
        </template>

        <template #button2>
            <button class="px-2 py-1 bg-red-500 text-white disabled:border-gray-500 disabled:bg-gray-500 hover:bg-red-500/90 active:bg-red-500/70 rounded-md transition-all duration-200"
                @click="submitAction" :disabled="!confirmDelete"
            >
                Delete
            </button>
        </template>
    </ModalDialog>

</template>

<script setup>
import { profileUrl } from '@/scripts/apiUrls.js'
import { ref } from 'vue';
import { TrashIcon } from '@heroicons/vue/24/solid'
import ModalDialog from '../templates/ModalDialog.vue';

const props = defineProps({
    email: {
        type: String,
        required: true
    }
})

const password = ref("")
const isOpen = ref(false)
const confirmDelete = ref(false)

async function submitAction() {
    isOpen.value = false
    
    const body = {

    }

    const response = await fetch(`${profileUrl}/delete-user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
}
</script>