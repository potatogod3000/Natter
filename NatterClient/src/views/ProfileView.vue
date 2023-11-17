<script setup>
import { inject, onBeforeMount, onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/userStore'
import router from '@/router';

const apiUrl = inject('apiUrl')
const userStore = useUserStore()

const username = ref("")
const country = ref("")

onBeforeMount(() => {
    if(!userStore.isLoggedIn) {
        router.push({name: 'auth'})
    }
})
onMounted(getProfile)

async function getProfile() {
    try{
        const response = await fetch(`${apiUrl}/api/profile/getProfile?username=${userStore.username}`, {
            method: "GET",
            credentials: "include"
        })

        const data = await response.json()

        if(response.ok || response.status === 200) {
            username.value = data.userName
            country.value = data.country
        }
        else {
            const err = new Error()
            err.message = data.message
            throw err
        }
    }
    catch(err) {
        console.log(err)
    }
}

</script>

<template>
    <div class="pt-20">Username: {{ username }}</div>
    <div>Country: {{ country }}</div>
</template>