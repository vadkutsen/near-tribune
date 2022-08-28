<template>
  <form
    v-if="accountId"
    @submit.prevent="handleAddComment(form)"
    class="flex justify-center items-center list-none"
  >
    <textarea
      v-model="form.comment"
      id="comment"
      class="form-control border px-1 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none"
      type="text"
      placeholder="Write a comment here..."
      required
    />
    <button
      class="flex items-center justify-center h-12 w-40 rounded-md bg-gray-500 text-white mx-2"
      type="submit"
    >
      <h4 class="mr-2">Add Comment</h4>
    </button>
  </form>
</template>

<script>
import { reactive } from 'vue'
import { useComments } from "@/composables/comments"

export default {
  components: {
  },
  props: {
    author: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const form = reactive ({
      author: null,
      comment: ''
    })
    return {
      props,
      form,
      ...useComments(),
    }
  },
  updated() {
    this.form.author = this.props.author
  }
}
</script>
