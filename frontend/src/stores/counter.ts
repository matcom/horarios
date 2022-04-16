import {defineStore} from 'pinia'

export const useCounterStore = defineStore({
    id: 'counter',
    state: () => ({
        counter: 0
    }),
    getters: {
        doubleCount: (state) => state.counter * 2
    },
    actions: {
        increment() {
            this.counter++
        }
    }
})

export const useLoginStore = defineStore({
    id: 'token',
    state: () => ({
        token: localStorage.getItem('acces_token')
    }),
    getters: {
        getToken: (state) => state.token
    },
    actions: {
        setToken(newToken: string) {
            localStorage.setItem('acces_token', newToken)
            //this.token = newToken
        }
    }
})
