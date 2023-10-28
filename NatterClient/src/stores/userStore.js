import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
    state: () => {
        return {
            username: "",
            isLoggedIn: false
        }
    },
    getters: {
        getLoginStatus: (state) => {
            return(isLoggedIn) => state.isLoggedIn = isLoggedIn
        },
        getUsername: (state) => {
            return(username) => state.username = username
        }
    }
})