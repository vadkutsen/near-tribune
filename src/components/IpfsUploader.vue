<template>
  <form
    v-if="accountId"
    @submit.prevent="uploadImage(form)"
    class="flex justify-center items-center list-none"
  >
    <div class="mb-4 px-2 w-full">
        <label class="block mb-1 text-sm" for="image">Image</label>
        <input
            id="image"
            type="file"
            ref="file"
            @change="onFileChanged($event)"
            accept="image/*"
            capture
        />
    </div>
    <div
              class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b"
            >
              <button
                class="text-gray-500 bg-transparent border border-solid border-gray-500 hover:bg-gray-500 hover:text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                @click.prevent="toggleModal"
              >
                Cancel
              </button>
              <button
                class="text-gray-700 bg-transparent border border-solid border-gray-700 hover:bg-gray-700 hover:text-white active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
              >
                Add
              </button>
            </div>
  </form>
</template>

<script>
import { reactive } from 'vue'
import { useUpload } from "@/composables/ipfs"

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
    //   tips: 0
    })
    return {
      props,
      form,
      ...useUpload(),
    }
  },
  updated() {
    this.form.author = this.props.author
  }
}
</script>
