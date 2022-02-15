import { createApp } from 'vue'
import App from './App.vue'
import Home from '@/views/Home'
import Post from '@/views/Post'
import 'tailwindcss/tailwind.css'
import './assets/tailwind.css'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/post/:id', component: Post },
    ]
})
createApp(App).use(router).mount('#app')
