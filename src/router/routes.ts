import {RouteRecordRaw} from "vue-router"
import PagesRoutes from "./pagesRoutes"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/pages"
    },
    {
        path: "/pages",
        component: () => import("../views/Layout/index.vue"),
        name: "pages",
        redirect: "/pages/home",
        children: PagesRoutes
    },
    {
        path: "/login",
        component: () => import("../views/Login/index.vue"),
        name: "login",
        meta: {
            hidden: true
        }
    },
    {
        path: "/404",
        component: () => import("../views/404/index.vue"),
        name: "error",
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/404"
    },
]

export default routes