import { defineStore } from 'pinia'
import { login, logout } from "../api/getUser"
import { getToken, setToken, removeToken } from "../utils/cookie"

const store = defineStore("asideMenu", {
    state: () => {
        return {
            token: getToken()
        }
    },

    actions: {
        async login(params: object) {
            let res = await login(params)

            if (res.status === 200 && res.data.code === 200) {
                this.token = res.data.data
                setToken(this.token as string)
                return true

            } else {
                return false
            }
        },

        async logout() {
            let res = await logout()

            if (res.status === 200 && res.data.code === 200) {
                this.token = undefined
                removeToken()

                return true
            }else {
                return false
            }
        }
    }
})

export default store