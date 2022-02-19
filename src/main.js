import { createApp } from 'vue'
import App from './App.vue'
import Home from '@/views/Home'
import Post from '@/views/Post'
import 'tailwindcss/tailwind.css'
import './assets/tailwind.css'
import { createRouter, createWebHistory } from 'vue-router'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/posts/:id', component: Post },
    ]
})

const options = {
    // You can set your default options here
};

createApp(App).use(router).use(Toast, options).mount('#app')
