<template>
  <PostsList :posts="posts"/>
</template>

<script>
import PostsList from "@/components/PostsList.vue"
import { usePosts } from "@/composables/posts"

export default {
  components: {
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
  border-left: 1px solid rgb(192, 190, 190);
  height: 100%;
}
</style>
