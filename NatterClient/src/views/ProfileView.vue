<template>
    <div class="container dark:text-light pt-20 text-dark">
        <div class="form-card p-4">
            <div class="flex gap-3 justify-center">
                <h1 class="text-2xl">{{ userInfo.username }}'s Profile</h1>
                <PencilIcon class="w-3 cursor-pointer" title="Edit" />
            </div>

            <div>
                <img :src="userInfo.profileImageSrc" width="32" />
            </div>

            <div>{{ userInfo.email }}</div>

            <div>{{ userInfo.username }}, {{ userInfo.country }}</div>

            <div>{{ userInfo.phoneNumberAreaCode }} {{ userInfo.phoneNumber }}</div>
            
        </div>
        <UpdateUser :userInfo="userInfo" />
        <UpdatePassword :email="userInfo.email" />
        <DeleteUser :email="userInfo.email" />
    </div>
</template>

<script setup>
import { onBeforeMount, reactive } from 'vue';
import { useUserStore } from '@/stores/userStore'
import { PencilIcon } from '@heroicons/vue/24/solid'
import router from '@/router';
import { profileUrl } from '@/scripts/apiUrls.js'
import UpdateUser from '../components/profile/UpdateUser.vue';
import UpdatePassword from '../components/profile/UpdatePassword.vue';
import DeleteUser from '../components/profile/DeleteUser.vue';

const userStore = useUserStore()

const userInfo = reactive({
    profileImageSrc: "",
    email: "",
    username: "",
    country: "",
    phoneNumber: "",
    phoneNumberAreaCode: ""
})

// Get Current User Profile Info before mount lifecycle
onBeforeMount(async () => {
    try {
        const response = await fetch(`${profileUrl}/get-profile`, {
            method: "GET",
            credentials: "include"
        })

        if (response.ok || response.status === 200) {
            const data = await response.json()
            userInfo.username = data.userName
            userInfo.email = data.email
            userInfo.country = data.country
            userInfo.phoneNumber = data.phoneNumber
            userInfo.phoneNumberAreaCode = data.phoneNumberAreaCode
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