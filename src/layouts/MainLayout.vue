<template>
    <Loading v-model:active="isLoading" :is-full-page="true" />
    <Navbar/>
    <main>
        <div>
          <router-view />
        </div>
    </main>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Loading from "vue-loading-overlay"
import "vue-loading-overlay/dist/vue-loading.css"
import { usePosts } from "@/composables/posts"

export default {
components: {
    Loading,
    Navbar,
},
setup() {
    return {
        ...usePosts()
    }
  },
}
</script>