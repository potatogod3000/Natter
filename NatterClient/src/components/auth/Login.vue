<template>
    <div class="form-card border border-accent flex flex-col justify-center items-center px-8">

        <h1 class="text-3xl pt-4">Login</h1>

        <div class="py-4">
            <form @submit.prevent class="flex flex-col gap-4">
                <div class="flex flex-col">
                    <label>E-Mail</label>
                    <input type="email"
                        class="input" :class="email === '' ? 'border-red-600' : 'border-green-600'"
                        v-model="email"
                    />
                </div>

                <div class="flex flex-col">
                    <label>Password</label>
                    <input type="password"
                        class="input" :class="password.length <= 8 ? 'border-red-600' : 'border-green-600'"
                        v-model="password"
                    />
                </div>

                <div class="flex justify-center">
                    <button @click="loginAction"
                        :disabled="email === '' || password === '' || password.length <= 8 ? true : false"
                        class="px-4 py-2 border"
                    >
                        Submit
                    </button>
                </div>
                
                <!-- For "errors" object generated when validation error at backend -->
                <div v-if="!userStore.isLoggedIn && received.errors" v-for="(error, index) in received.errors" v-text="error" :key="index"></div>
                
                <!-- For errors returned from backend due to invalid password/email -->
                <div v-else-if="!userStore.isLoggedIn && received.message" v-text="received.message"></div>
            </form>

            <p class="py-4 flex items-center gap-1 cursor-pointer hover:text-accent transition-all duration-150"
                @click="$emit('switchToRegister')"
            >
                Dont have a Natter Account?
                <span class="flex items-center gap-1">
                    Register
                    <ArrowRightIcon class="w-4"/>
                </span>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { authUrl } from '@/scripts/apiUrls.js';
import router from '@/router'
import { ArrowRightIcon } from '@heroicons/vue/24/solid'

const userStore = useUserStore()

// Bind variables
const email = ref('')
const password = ref('')

// Received from API
const received = ref(Object)

async function loginAction() {
    const params = {
        "email": email.value,
        "password": password.value
    }

    try {
        const response = await fetch(`${authUrl}/login`, {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json"
            }
        })
        received.value = await response.json()

        if(response.ok) {
            userStore.getLoginStatus(true)
            userStore.getUsername(received.value.username)
            router.push({name: 'home'})
        }
        else {
            userStore.getLoginStatus(false)
            userStore.getUsername("")
        }
    }
    catch(error) {
        received.value = error
    }
}

</script>