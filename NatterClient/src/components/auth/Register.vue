<template>
    <div class="form-card border border-accent flex flex-col justify-center items-center px-8">
        
        <h1 class="text-3xl pt-4">Register</h1>

        <form @submit.prevent class="flex flex-col gap-4 py-4">

            <div class="flex flex-col">
                <label>EMail</label>
                <input type="email" v-model="userInfo.email" class="input" />
            </div>
            
            <div class="flex flex-col">
                <label>Username</label>
                <input type="text" v-model="userInfo.username" class="input" />
            </div>

            <div class="flex flex-col">
                <label>Password</label>
                <input type="password" v-model="userInfo.password" class="input" />
            </div>

            <div class="flex flex-col">
                <label>Country</label>
                <select name="country" v-model="userInfo.country" class="input" >
                    <option value="" selected>Select a country</option>
                    <option v-for="country in countries"
                        :value="country.cca2"
                        :key="country.cca2">{{ country.flag }} {{ country.name.common }}</option>
                </select>
            </div>
            
            <div class="flex flex-col">
                <label>Phone Number</label>
                <div class="flex gap-4">
                    <select v-model="userInfo.phoneNumberAreaCode" class="w-32 text-center input" >
                        <option value="">Calling Code</option>
                        <option v-for="(code, index) in phoneNumberAreaCodes"
                            :value="code"
                            :key="index"
                        >{{ code }}</option>
                    </select>
                    <input type="tel" v-model="userInfo.phoneNumber" pattern="[0-9]{10}" class="w-full input" />
                </div>
            </div>

            <div class="flex justify-center">
                <button @click="submitAction" class="px-4 py-2 border">Submit</button>
            </div>
        </form>

        <div class="text-red-400" v-if="!registrationSuccessful && received.message" v-text="received.message"></div>
        <div class="text-red-400" v-if="!registrationSuccessful && received.errors" v-for="(error, index) in received.errors" v-text="error" :key="index"></div>

        <p class="pb-4 flex items-center justify-center gap-1 cursor-pointer hover:text-accent transition-all duration-150"
            @click="$emit('switchToLogin')"
        >
            Already have a Natter Account?
            <span class="flex items-center gap-1">
                Login
                <ArrowRightIcon class="w-4" />
            </span>
        </p>
    </div>

</template>

<script setup>
import { computed, onMounted, ref, reactive } from 'vue';
import { ArrowRightIcon } from '@heroicons/vue/24/solid'
import { getAreaCodes, getCountries } from '@/scripts/countryDetails';

const countries = ref(null)
const phoneNumberAreaCodes = computed(() => { return getAreaCodes(countries.value, userInfo.country) })

onMounted(async () => { countries.value = await getCountries() })

const userInfo = reactive({
    email: "",
    username: "",
    password: "",
    country: "",
    phoneNumber: "",
    phoneNumberAreaCode: ""
})

const received = ref(Object)
const registrationSuccessful = ref(Boolean)

async function submitAction() {
    const params = {
        "email": userInfo.email,
        "username": userInfo.username,
        "password": userInfo.password,
        "country": userInfo.country,
        "phoneNumberAreaCode": userInfo.phoneNumberAreaCode,
        "phoneNumber": userInfo.phoneNumber
    }

    try{
        const response = await fetch(`http://localhost:5000/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
        received.value = await response.json()

        if(response.ok) {
            registrationSuccessful.value = true
        }
        else {
            registrationSuccessful.value = false
        }
    }
    catch(error) {
        received.value = error
        registrationSuccessful.value = false
    }
}

</script>