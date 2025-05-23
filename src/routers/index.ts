import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/layout',
    },
    {
        path: '/layout',
        name: 'Layout',
        component: () => import('@/views/layout/index.vue'),
        children: [
            {
                path: '',
                name: 'Home',
                component: () => import('@/views/layout/home/index.vue'),
            },
            {
                path: 'repos',
                name: 'Repos',
                component: () => import('@/views/layout/repositories/index.vue'),
            },
            {
                path: 'about',
                name: 'About',
                component: () => import('@/views/layout/blog/index.vue'),
            }
        ]
    },
    {
        path: '/blog',
        name: 'Blog',
        component: () => import('@/views/blog/index.vue'),
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router