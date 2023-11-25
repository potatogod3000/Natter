<template>
    <div class="form-card">
        <h1 class="flex justify-center pt-4 text-red-500 text-xl">Delete Account</h1>

        <form class="flex flex-col gap-4 px-4 pb-4 pt-2">
            <div class="flex flex-col">
                <label>Password</label>
                <input type="password" class="input" v-model="password" />
            </div>
            
            <div class="flex justify-center gap-2">
                <input type="checkbox" value="true" id="confirmDelete" />
                <label for="confirmDelete">I confirm that I want to delete the account and all my user data</label>
            </div>

            <div class="flex justify-center">
                <button type="button"
                    @click="submitAction"
                    class="px-4 py-2 border border-red-500 text-red-500"
                    :disabled="password === '' ? true : false"
                >Delete Account</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { profileUrl } from '@/scripts/apiUrls.js'
import { ref } from 'vue';

const props = defineProps({
    email: {
        type: String,
        required: true
    }
})

const password = ref("")

async function submitAction() {
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