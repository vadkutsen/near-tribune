<template>
  <div>
    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="panel panel-default panel-pet">
        <div class="panel-body">
          <div class="font-bold text-3xl">{{ post[1].title }}</div>
          <span class="text-sm mb-2"><i>{{ new Date(post[0]/1000000).toLocaleDateString() }} by @{{ post[1].author }}</i></span><br />
          <span>{{ post[1].text.slice(0, 180) }}...</span><br />
        </div>
        <div class="panel-footer">
          <div v-if="accountId != post[1].author">
            <DonateForm/>
          </div>
          <button v-if="accountId === post[1].author"
            class="flex items-center justify-center h-12 w-40 rounded-md bg-gray-500 text-white mx-2"
            type="submit"
            @click="toggleEdit"
          >
            <span class="mr-2">Edit</span>
          </button>
          <div v-if="showEdit">
            <EditPostDialog :post="post"/>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Loading v-model:active="isLoading" :is-full-page="true" />
</template>

<script>
import DonateForm from "@/components/DonateForm.vue"
import EditPostDialog from "@/components/EditPostDialog.vue"
import Loading from "vue-loading-overlay"
import "vue-loading-overlay/dist/vue-loading.css"
import { usePosts } from "@/composables/posts"

export default {
  components: {
    DonateForm,
    Loading,
    EditPostDialog
  },
  props: {
    post: {
      typeof: Array,
      required: true,
    },
  },
  setup(props) {
    return {
      ...usePosts(props)
    }
  },
}
</script>