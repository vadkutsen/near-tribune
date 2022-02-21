<template>
  <PostsList :posts="posts"/>
  <Loading v-model:active="isLoading" :is-full-page="true" />
</template>

<script>
import PostsList from "@/components/PostsList.vue"
import { usePosts } from "@/composables/posts"
import Loading from "vue-loading-overlay"
import "vue-loading-overlay/dist/vue-loading.css"

export default {
  components: {
    PostsList,
    Loading
  },
  setup() {
    return {
      ...usePosts(),
    }
  },
}
</script>

<style>
.vl {
  border-left: 1px solid rgb(192, 190, 190);
  height: 100%;
}
</style>
