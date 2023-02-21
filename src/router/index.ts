import { createRouter, createWebHashHistory } from "vue-router"
import routes from "./routes"
import nprograss from 'nprogress'
import settings from "../settings"
import { getToken } from "../utils/cookie"

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {

    document.title = settings.title ? settings.title : "hao-admin-template"
    let token = getToken()
    nprograss.start()
    
    if (token) {
        if (to.path !== "/login") {
            // 验证逻辑
            next()
        } else {
            next({
                path: "/"
            })
        }
    } else {
        if (to.path === "/login") next()
        else next({
            name: "login"
        })
    }
})

router.afterEach((to, from, next) => {
    nprograss.done()
})

export default router