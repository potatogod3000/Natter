<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import { chatServersUrl } from "@/assets/contents/apiUrls.js";
import chatHub from "../signalr/ChatHub";
import Sidebar from "../components/chat/Sidebar.vue";
import Server from "../components/chat/Server.vue";

const userStore = useUserStore()

const serversJoined = ref({})
const serverData = ref({
    name: "Home"
})
const error = ref(false)
const errorMessage = ref("")

onBeforeMount(async () => {
    try {
        const response = await fetch(`${chatServersUrl}/serversJoined?userName=${userStore.userName}`, {
            method: "GET",
        })

        const data = await response.json()

        if (response.ok) {
            serversJoined.value = data
        }
        else {
            const err = new Error();
            err.message = data.message
            throw err
        }
    }
    catch (err) {
        error.value = true
        errorMessage.value = err.message
    }
})

onMounted(async () => {
    chatHub.start()

    chatHub.connection.on("ReceiveMessage", (message) => {
        console.log(message)
    })
})

async function loadServer(name) {
    if (name !== 'home') {
        try {
            const response = await fetch(`${chatServersUrl}/getServerInfo?serverName=${name}`, {
                method: "GET"
            })

            const data = await response.json()

            if (response.ok) {
                serverData.value = data.serverData
            }
            else {
                const err = new Error()
                err.message = data.message
                throw err
            }
        }
        catch (err) {
            error.value = true
            errorMessage.value = err.message
            console.log(err)
        }
    }
}

</script>

<template>
    <Sidebar :serversJoined="serversJoined" @selectedServer="loadServer" />

    <div
        class="fixed top-2 bottom-2 left-[80px] right-2 bg-light-soft dark:bg-dark-soft rounded-2xl overflow-y-scroll border hover:border-accent border-accent/10">
        <div class="absolute bottom-0 top-0 right-0 left-0 w-full p-4">
            <Server :serverData="serverData" />
        </div>
    </div>
</template>