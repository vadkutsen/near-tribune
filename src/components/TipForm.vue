<template>
  <form
    v-if="accountId && accountId !== owner"
    @submit.prevent="handleTipAuthor(form)"
    class="flex justify-center items-center list-none"
  >
    <p><i>Like the article?</i></p>
    <input
      v-model="form.tips"
      id="tips"
      class="form-control border px-1 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none"
      type="number"
      placeholder="1 NEAR"
      min="0.01"
      step="0.01"
      required
    />
    <button
      class="flex items-center justify-center h-12 w-40 rounded-md bg-gray-500 text-white mx-2"
      type="submit"
    >
      <h4 class="mr-2">Tip Author Ⓝ</h4>
    </button>
  </form>
</template>

<script>
import { reactive } from 'vue'
import { useTips } from "@/composables/tips"

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
      tips: 0
    })
    return {
      props,
      form,
      ...useTips(),
    }
  },
  updated() {
    this.form.author = this.props.author
  }
}
</script>
