<script setup>
import { reactive, ref } from 'vue'

defineProps({
  msg: String,
})

const state = reactive({
  message: {
    name: "Loading...",
    members: "Loading...",
    area: "Loading..."
  },
})

const params = {
  name: "PotatoGod",
  members: 200,
  area: "seas"
}

fetch(`http://localhost:5093/Chats/Server?name=${params.name}&members=${params.members}&area=${params.area}`)
  
  .then((response) => response.json())
  
  .then(function(json) {
    state.message = JSON.parse(json)
  })

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <div class="state">
      <div>Name: {{ state.message.name }}</div>
      <div>Members: {{ state.message.members }}</div>
      <div>Area: {{ state.message.area }}</div>
    </div>
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.state {
  margin-top: 13px;
  margin-bottom: 13px;
}
</style>
