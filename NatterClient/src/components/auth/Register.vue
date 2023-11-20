<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const email = ref('')
const username = ref('')
const password = ref('')
const country = ref('')
const phoneNumber = ref()
const received = ref(Object)
const registrationSuccessful = ref(Boolean)

async function submitAction() {
    const params = {
        "email": email.value,
        "username": username.value,
        "password": password.value,
        "country": country.value,
        "phoneNumber": phoneNumber.value
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

<template>
    <div class="flex flex-col justify-center items-center">
        <form @submit.prevent class="flex flex-col gap-5">
            <label> EMail
                <input type="email" v-model="email" />
            </label>
            <label> Username
                <input type="text" v-model="username"  />
            </label>
            <label> Password
                <input type="password" v-model="password" />
            </label>
            <label> Country
                <select name="country" v-model="country">
                    <option selected>Select a country</option>
                    <option value="IN">India</option>
                </select>
            </label>
            <label> Phone Number
                <input type="tel" v-model="phoneNumber" placeholder="Enter phone number" pattern="[0-9]{10}"/>
            </label>

            <button @click="submitAction">Submit</button>
        </form>

        <div class="text-red-400" v-if="!registrationSuccessful && received.message" v-text="received.message"></div>
        <div class="text-red-400" v-if="!registrationSuccessful && received.errors" v-for="(error, index) in received.errors" v-text="error" :key="index"></div>

        <p>Already have a Natter Account? Click Here!</p>
    </div>

</template>