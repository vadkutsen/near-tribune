<template>
  <div id="nav" class="py-4 p-0 flex justify-center bg-cyan-500">
    <span class="mt-4 max-w-3xl mx-auto text-l">{{new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}}</span>
    <h2 class="mt-4 max-w-3xl mx-auto text-5xl"><strong>NEAR TRIBUNE</strong></h2>
    <!-- <h2 class="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">Total Donated: {{(donations/1000000000000000000000000).toFixed(4)}} Ⓝ</h2> -->
    <div class="flex w-1/2 justify-end items-center list-none">
      <!-- <DonateForm /> -->
      <button
        v-if="accountId"
        class="flex items-center justify-center h-12 w-12 rounded-md bg-gray-500 text-white mx-2"
        @click.prevent="toggleModal"
      >
        <PlusIcon class="w-6 h-6 text-black-500" />
      </button>
      <Login />
    </div>
  </div>
  <div v-if="showModal">
    <AddPostDialog />
  </div>
  <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
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
import Login from "@/components/Login.vue"
import Header from "@/components/Header.vue"
import PostsList from "@/components/PostsList.vue"
import DonateForm from "@/components/DonateForm.vue"
import AddPostDialog from "@/components/AddPostDialog.vue"
import { PlusIcon } from "@heroicons/vue/outline"
import { usePosts } from "@/composables/posts"
import { useDonate } from "@/composables/donate"

export default {
  components: {
    Header,
    PlusIcon,
    PostsList,
    // DonateForm,
    Login,
    AddPostDialog,

  },
  setup() {
    return {
      ...usePosts(),
      ...useDonate()
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
