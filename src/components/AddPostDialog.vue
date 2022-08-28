<template>
    <div
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <!--content-->
        <div
          class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          <!--header-->
          <div
            class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t"
          >
            <h3 class="text-3xl font-semibold">
              Add New Post
            </h3>
          </div>
          <!--body-->
          <form @submit.prevent="handleAddPost">
            <div class="relative p-6 flex-auto">
              <div class="col-span-1 lg:col-span-6">
                <div class="mb-4 px-6 w-full">
                  <label class="block mb-1 text-sm" for="title">Title</label>
                  <input
                    id="title"
                    v-model="form.title"
                    class="form-control w-full border px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none"
                    type="text"
                    placeholder="Post title..."
                    required
                  />
                </div>
                <div class="mb-4 px-2 w-full">
                  <label class="block mb-1 text-sm" for="text"
                    >Text</label
                  >
                  <textarea
                    id="text"
                    v-model="form.text"
                    class="w-full border px-4 py-2 rounded focus:border-blue-500 focus:shadow-outline outline-none"
                    type="text"
                    placeholder="Text..."
                    required
                  />
                </div>
                <IpfsUploader />
              </div>
            </div>
            <!--footer-->
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
        </div>
      </div>
    </div>
</template>

<script>
import { usePosts } from "@/composables/posts"
import IpfsUploader from "@/components/IpfsUploader.vue"

export default {
  components: {
  },
  setup() {
    return {
      ...usePosts(),
    }
  },
}
</script>
