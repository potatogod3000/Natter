<template>
    <div class="container dark:text-light pt-20 text-dark">

        <!-- Profile Nav -->
        <ul class="flex gap-8 mb-10 text-lg font-bold">
            <li class="cursor-pointer" @click="toggleInfo"
                :class="[{ 'text-accent': info }, 'hover:text-accent-light transition-all duration-150']">Profile
                Info</li>

            <li class="cursor-pointer" @click="toggleActivity"
                :class="[{ 'text-accent': activity }, 'hover:text-accent-light transition-all duration-150']">My
                Activity</li>

            <li class="cursor-pointer" @click="toggleUpdate"
                :class="[{ 'text-accent': updateUser }, 'hover:text-accent-light transition-all duration-150']">Update
                Account</li>
        </ul>

        <Transition enter-active-class="transition-all duration-200" enter-from-class="opacity-0 translate-x-10"
            leave-active-class="transition-all duration-200" leave-to-class="opacity-0 translate-x-10" mode="out-in">
            <div v-if="info">
                <Info :userInfo="userInfo" />
            </div>

            <div class="col-span-2" v-else-if="activity">
                <UserActivity />
            </div>

            <div v-else-if="updateUser">
                <UpdateUser :userInfo="userInfo" />
                <UpdatePassword :email="userInfo.email" />
                <DeleteUser :email="userInfo.email" />
            </div>
        </Transition>

    </div>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue';
import { useUserStore } from '@/stores/userStore'
import router from '@/router';
import { profileUrl } from '@/scripts/apiUrls.js'
import Info from '../components/profile/Info.vue';
import UpdateUser from '../components/profile/UpdateUser.vue';
import UpdatePassword from '../components/profile/UpdatePassword.vue';
import DeleteUser from '../components/profile/DeleteUser.vue';
import UserActivity from '../components/profile/UserActivity.vue';

const userStore = useUserStore()

// Display States of various components
const info = ref(true)
const activity = ref(false)
const updateUser = ref(false)

const userInfo = reactive({
    profileImageSrc: "",
    email: "",
    username: "",
    country: "",
    phoneNumber: "",
    phoneNumberAreaCode: "",
    serversJoined: []
})

function toggleInfo() {
    info.value = true
    activity.value = false
    updateUser.value = false
}

function toggleActivity() {
    info.value = false
    activity.value = true
    updateUser.value = false
}

function toggleUpdate() {
    info.value = false
    activity.value = false
    updateUser.value = true
}

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
            userInfo.serversJoined = data.serversJoined
        }
        else {
            router.push({ name: "auth" })
        }
    }
    catch (err) {
        console.log(err)
    }
})
</script>