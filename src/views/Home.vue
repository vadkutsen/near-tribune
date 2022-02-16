<template>
  <div class="py-16 bg-gray-50 overflow-hidden lg:py-24">
    <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
      <Header />
      <div class="flex flex-row">
        <div class="basis-2/3 pr-8">
          <PostsList :posts="posts"/>
        </div>
        <div class="basis-1/3">
          <div class="vl">
            <p>News feed widget template</p>
            <p>News feed widget template News feed widget template</p>
            <p>News feed widget template</p>
            <p>News feed widget template</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import PostsList from "@/components/PostsList.vue"
import { usePosts } from "@/composables/posts"

export default {
  components: {
    Header,
    PostsList,
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
  border-left: 1px solid rgb(158, 155, 155);
  height: 100%;
}
</style>
