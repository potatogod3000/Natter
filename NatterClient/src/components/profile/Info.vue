<template>
    <div class="form-card">

        <div>
            <img src="/images/placeholder-user-bg.jpg" class="rounded-lg h-[150px] w-full" />
            <div class="text-center">
                <p class="inline-block px-6 py-4 text-4xl font-extrabold rounded-full bg-accent -translate-y-8 border shadow-lg">
                    {{ firstLetter }}
                </p>
            </div>
        </div>

        <div class="p-4 flex flex-col items-center -translate-y-8">
            <div class="flex gap-3">
                <h1 class="text-2xl">{{ props.userInfo.username }}</h1>
            </div>

            <div>
                <img :src="props.userInfo.profileImageSrc" width="32" />
            </div>

            <div>{{ props.userInfo.email }}</div>

            <div>{{ props.userInfo.username }}, {{ props.userInfo.country }}</div>

            <div>{{ props.userInfo.phoneNumberAreaCode }} {{ props.userInfo.phoneNumber }}</div>
        </div>
        
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({ userInfo: Object }) 
const firstLetter = computed(() => {
    if(props.userInfo.username) {
        return props.userInfo.username[0]
    }
    else {
        return "N"
    }
})
</script>