<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore()

const email = ref('')
const password = ref('')
const received = ref(Object)

async function loginAction() {
    const params = {
        "email": email.value,
        "password": password.value
    }

    try {
        const response = await fetch(`http://localhost:5093/api/auth/login`, {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json"
            }
        })
        received.value = await response.json()

        if(response.ok) {
            userStore.getLoginStatus(true)
            userStore.getUsername(received.value.username)
            router.push('/')
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

<template>
    <div class="flex flex-col justify-center items-center">
        <form @submit.prevent class="flex flex-col gap-5">
            <div>
                <label> E-Mail
                    <input type="email"
                        class="outline-none border-2" :class="email === '' ? 'border-red-600' : 'border-green-600'"
                        v-model="email"
                    />
                </label>
            </div>

            <div>
                <label> Password
                    <input type="password"
                        class="outline-none border-2" :class="password.length <= 8 ? 'border-red-600' : 'border-green-600'"
                        v-model="password"
                    />
                </label>
            </div>

            <button @click="loginAction"
                :disabled="email === '' || password === '' || password.length <= 8 ? true : false"
            >Submit</button>
            
            <!-- For "errors" object generated when validation error at backend -->
            <div v-if="!userStore.isLoggedIn && received.errors" v-for="(error, index) in received.errors" v-text="error" :key="index"></div>
            
            <!-- For errors returned from backend due to invalid password/email -->
            <div v-else-if="!userStore.isLoggedIn && received.message" v-text="received.message"></div>
        </form>

        <p>Dont have a Natter Account? Click Here!</p>
    </div>
</template>

<style scoped>

</style>