<template>
    <form @submit.prevent class="flex flex-col">
        <label for="emailField">E-Mail</label>
        <div v-text="userInfo.email"></div>

        <label for="usernameField">Username</label>
        <input type="text" v-model="userInfo.username" id="usernameField" />

        <label for="countryField">Country</label>
        <select v-model="userInfo.country" class="dark:text-dark text-light">
            <option value="" :selected='userInfo.country === "" ? true : false' disabled>Please select a country</option>
            <option
                :value="countryInfo.cca2"
                v-for="countryInfo in countries"
                :key="countryInfo.cca2"
            >
                {{countryInfo.flag }} {{ countryInfo.name.common }}</option>
        </select>

        <label for="phoneNumberField">Phone Number</label>
        <input type="text" v-model="phoneNumberAreaCode" />
        <input type="text" pattern="[0-9][+,-, ]" v-model="userInfo.phoneNumber" id="phoneNumberField" />

        <button type="button" @click="submitChanges">Update</button>
    </form>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue';
import { profileUrl } from '@/assets/contents/apiUrls.js'

const props = defineProps({
    userInfo: {
        required: true,
        type: Object
    }
})

// Get details (Name, CCA2, Flag and IDD) of all countries in the world before mount
onBeforeMount(async () => {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,flag,idd", { method: "GET" })
    countries.value = await response.json()
})

const userInfo = reactive(props.userInfo)

const phoneNumberAreaCode = ref("")
const countries = ref({})

async function getCountryCallingCode(country) {
    const callingCode = ref("")
    countries.value.forEach(countryInfo => {
        if(countryInfo.cca2 === country) {
            callingCode.value = countryInfo.idd.root
        }
    })
    
    return callingCode
}

// Submit function
async function submitChanges()  {
    const body = {
        email: userInfo.email,
        username: userInfo.username,
        phoneNumber: userInfo.phoneNumber,
        country: userInfo.country
    }

    try {
        const response = await fetch(`${profileUrl}/updateUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
            credentials: "include"
        })
        const data = await response.json()

        if(response.ok) {
            console.log(data)
        }
    }
    catch(error) {
        console.log(error)
    }
}
</script>