<template>
    <div class="container dark:text-light pt-20 text-dark">
        <UpdateUser :userInfo="userInfo" />
        <UpdatePassword :email="userInfo.email" />
        <DeleteUser :email="userInfo.email" />
    </div>
</template>

<script setup>
import { onBeforeMount, reactive } from 'vue';
import { useUserStore } from '@/stores/userStore'
import router from '@/router';
import { profileUrl } from '@/assets/contents/apiUrls.js'
import UpdateUser from '../components/profile/UpdateUser.vue';
import UpdatePassword from '../components/profile/UpdatePassword.vue';
import DeleteUser from '../components/profile/DeleteUser.vue';

const userStore = useUserStore()

const userInfo = reactive({
    email: "",
    username: "",
    country: "",
    phoneNumber: ""
})

// Get Current User Profile Info before mount lifecycle
onBeforeMount(async () => {
    try {
        const response = await fetch(`${profileUrl}/getProfile`, {
            method: "GET",
            credentials: "include"
        })

        if (response.ok || response.status === 200) {
            const data = await response.json()
            userInfo.username = data.userName
            userInfo.email = data.email
            userInfo.country = data.country
            userInfo.phoneNumber = data.phoneNumber
        }
        else {
            router.push({name: "auth"})
        }
    }
    catch (err) {
        console.log(err)
    }
})
</script>