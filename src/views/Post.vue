<template>
  <div class="py-16 overflow-hidden lg:py-24">
    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="font-bold text-3xl">{{ post.title }}</div>
      <span class="text-sm mb-2"><i>{{ new Date(post.created_at/1000000).toLocaleDateString() }} by @{{ post.author }}</i></span><br />
      <span>{{ post.text }}</span><br />
      <div v-if="accountId != post.author">
        <TipForm :author="post.author"/>
      </div>
      <button v-if="accountId === post.author"
        class="flex items-center justify-center h-12 w-40 rounded-md bg-gray-500 text-white mx-2"
        type="submit"
        @click="toggleEdit"
      >
        <span class="mr-2">Edit</span>
      </button>
      <div v-if="showEdit">
        <EditPostDialog :post="post" :postId="postId"/>
      </div>
    </div>
    <div>
            <p class="font-bold text-xl">Comments</p>
            <p class="text-l">No comments yet</p>
            <CommentForm :postId="postId"/>
          </div>
  </div>
  <Loading v-model:active="isLoading" :is-full-page="true" />
</template>

<script>
import TipForm from "@/components/TipForm.vue"
import EditPostDialog from "@/components/EditPostDialog.vue"
import Loading from "vue-loading-overlay"
import CommentForm from "@/components/CommentForm.vue"
import "vue-loading-overlay/dist/vue-loading.css"
import { usePosts } from "@/composables/posts"
import { useTips } from "@/composables/tips"
import { onMounted } from '@vue/runtime-core'
import { ref } from 'vue'
import { getPost } from '@/services/near'
import { useRoute } from "vue-router";

export default {
  components: {
    TipForm,
    Loading,
    EditPostDialog,
    CommentForm
  },
  setup() {
    const post = ref([])
    const err = ref(null)
    const route = useRoute()
    const isLoading = ref(false)
    const postId = route.params.id
    onMounted(async () => {
      isLoading.value = true
      try {
        post.value = await getPost(postId)
        isLoading.value = false
      } catch (e) {
        err.value = e
        isLoading.value = false
      alert(err.value)
      }
    })
    return {
      post,
      postId,
      isLoading,
      ...usePosts(),
      ...useTips()
    }
  },
}
</script>