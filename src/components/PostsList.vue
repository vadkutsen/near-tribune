<template>
    <div v-if="posts.length" class="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-1 lg:gap-8">
      <div v-for="post in posts" :key="post[0]">
        <div class="col-sm-6 col-md-4 col-lg-3">
          <router-link :to="/post/ + post[0]">
            <div class="font-bold text-3xl">{{ post[1].title }}</div>
            <span class="text-sm mb-2"><i>{{ new Date(post[1].created_at/1000000).toLocaleDateString() }} by @{{ post[1].author }}</i></span><br />
            <span>{{ post[1].text.slice(0, 180) }}...</span><br />
          </router-link>
        </div>
        <hr>
      </div>
    </div>
    <div v-else class="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center">
      <h2>No posts added yet</h2>
    </div>
    <Loading v-model:active="isLoading" :is-full-page="false" />
</template>

<script>
// import PostCard from "@/components/PostCard.vue"
import Loading from "vue-loading-overlay"
import "vue-loading-overlay/dist/vue-loading.css"
import { usePosts } from "@/composables/posts"
export default {
  components: {
    Loading,
    // PostCard
  },
  props: {
    posts: {
      typeof: Array,
    },
  },
  setup() {
    return {
      ...usePosts()
    }
  },
};
</script>
