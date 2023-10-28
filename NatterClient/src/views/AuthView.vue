<script setup>
import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue';
</script>

<template>
    <div class="absolute top-2/4 -translate-y-2/4 w-full">
        <div class="flex gap-8 items-center justify-center">
            <button>Login</button>
            <button>Register</button>
        </div>

        <Login />
        <Register />
    </div>

</template>

<style scoped>

</style>