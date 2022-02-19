<template>
    <Loading v-model:active="isLoading" :is-full-page="true" />
    <Navbar/>
    <main>
        <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <Header />
            <div class="flex flex-row">
                <div class="flex-1 pr-8">
                    <router-view />
                </div>
                <div class="flex-2 mt-4">
                    <div class="vl pl-4">
                        <CmcWidget/>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Header from "@/components/Header.vue"
import Loading from "vue-loading-overlay"
import "vue-loading-overlay/dist/vue-loading.css"
import { usePosts } from "@/composables/posts"
import { useTips } from "@/composables/tips"
import CmcWidget from "@/components/CmcWidget.vue"


export default {
components: {
    Header,
    CmcWidget,
    Loading,
    Navbar,
},
setup() {
    return {
        ...useTips(),
        ...usePosts()
    }
  },
}
</script>