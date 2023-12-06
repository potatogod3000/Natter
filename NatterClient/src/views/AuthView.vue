<template>
    <div class="flex h-screen items-center justify-center">
        <div class="flex items-center justify-center text-dark dark:text-light">
            <Transition enter-from-class="opacity-0" enter-active-class="transition-all duration-200"
                leave-to-class="opacity-0" leave-active-class="transition-all duration-200" mode="out-in">
                <Login v-if="viewLogin" @switchToRegister="switchToRegister" />
                <Register v-else-if="viewRegister" @switchToLogin="switchToLogin" />
            </Transition>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue';

const viewLogin = ref(true)
const viewRegister = ref(false)

function switchToLogin() {
    viewLogin.value = !viewLogin.value
    viewRegister.value = !viewRegister.value
}

function switchToRegister() {
    viewRegister.value = !viewRegister.value
    viewLogin.value = !viewLogin.value
}
</script>