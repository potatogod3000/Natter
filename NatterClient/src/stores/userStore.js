import { defineStore } from 'pinia'
import router from '../router'

export const useUserStore = defineStore('userStore', {
    state: () => {
        return {
            username: String,
            isLoggedIn: Boolean
        }    
    },
})