import {
    Document,
    Location,
    User,
} from '@element-plus/icons-vue'

import {RouteRecordRaw} from "vue-router"

const routes: Array<RouteRecordRaw> = [
    {
        path: "home",
        component: () => import("../views/Home/index.vue"),
        name: "home",
        meta: {
            title: "Home",  // 对应aside menu的title属性
            icon: Document, // 只有第一级需要icon
            disable: false, // 可不写
        }
    },
    {
        path: "menu",
        name: "menu",
        meta: {
            title: "Menu",
            icon: Location,
            disable: false,
        },
        children: [
            {
                path: "menu1",
                name: "menu1",
                meta: {
                    title: "Menu1",
                },
                children: [
                    {
                        path: "menu1-1",
                        name: "menu1-1",
                        component: () => import("../views/Menus/Menu1s/Menu1-1/index.vue"),
                        meta: {
                            title: "Menu1-1",
                        },
                    },
                    {
                        path: "menu1-2",
                        name: "menu1-2",
                        meta: {
                            title: "Menu1-2",
                        },
                        children: [
                            {
                                path: "menu1-2-1",
                                name: "menu1-2-1",
                                component: () => import("../views/Menus/Menu1s/Menu1-2s/Menu1-2-1/index.vue"),
                                meta: {
                                    title: "Menu1-2-1",
                                },
                            },
                            {
                                path: "menu1-2-2",
                                name: "menu1-2-2",
                                component: () => import("../views/Menus/Menu1s/Menu1-2s/Menu1-2-2/index.vue"),
                                meta: {
                                    title: "Menu1-2-2",
                                },
                            },
                        ]
                    }
                ]
            },
            {
                path: "menu2",
                name: "menu2",
                component: () => import("../views/Menus/Menu2/index.vue"),
                meta: {
                    title: "Menu2",
                },
            }
        ]
    },
    {
        path: "user-info",
        component: () => import("../views/UserInfo/index.vue"),
        name: "userInfo",
        meta: {
            title: "UserInfo",
            icon: User,
            disable: false,
        }
    }
]

export default routes