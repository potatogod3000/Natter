<template>
    <form @submit.prevent class="flex flex-col">
        <label for="emailField">E-Mail</label>
        <div v-text="userInfo.email"></div>

        <label for="usernameField">Username</label>
        <input type="text" v-model="userInfo.username" id="usernameField" class="input" />

        <label for="countryField">Country</label>
        <select v-model="userInfo.country" class="input">
            <option value="" :selected='userInfo.country === "" ? true : false' disabled>Please select a country</option>
            <option
                v-for="countryInfo in countries"
                :value="countryInfo.cca2"
                :key="countryInfo.cca2"
            >
                {{countryInfo.flag }} {{ countryInfo.name.common }}
            </option>
        </select>

        <label for="phoneNumberField">Phone Number</label>
        <div class="flex gap-4">
            <select class="w-32 input text-center" v-model="userInfo.phoneNumberAreaCode">
                <option value="null">Calling Code</option>
                <option
                    v-for="(code, index) in phoneNumberAreaCodes"
                    :value="code"
                    :key="index"
                >
                    {{ code }}
                </option>
            </select>
            <input type="text" pattern="[0-9][+,-, ]" v-model="userInfo.phoneNumber" id="phoneNumberField" class="input w-full" />
        </div>

        <button type="button" @click="submitChanges">Update</button>
    </form>
</template>

<script setup>
import { computed, onBeforeMount, reactive, ref } from 'vue';
import { profileUrl } from '@/scripts/apiUrls.js';
import { getCountries, getAreaCodes } from '@/scripts/countryDetails.js';

const props = defineProps({
    userInfo: {
        required: true,
        type: Object
    }
})

// Get details (Name, CCA2, Flag and IDD) of all countries in the world before mount
onBeforeMount(async () => { countries.value = await getCountries() })

// Pass props.UserInfo to a reactive userInfo
const userInfo = reactive(props.userInfo)

const countries = ref([])
const searchCountriesText = ref("")
const phoneNumberAreaCodes = computed(() => { return getAreaCodes(countries.value, userInfo.country) })

// Submit function
async function submitChanges()  {
    const body = {
        "email": userInfo.email,
        "username": userInfo.username,
        "phoneNumber": userInfo.phoneNumber,
        "phoneNumberAreaCode": userInfo.phoneNumberAreaCode,
        "country": userInfo.country
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

// Search within countries array for a country name
/* function searchCountries(searchCountriesText) {
    countries.value.forEach(countryInfo => {
        if(countryInfo.name.common.contains(searchCountriesText)) {
            return countryInfo.name.common
        }
    })
} */
</script>