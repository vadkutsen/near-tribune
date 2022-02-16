<template>
    <div id="nav" class="py-4 p-0 flex justify-center bg-cyan-500">
    <span class="mt-4 max-w-3xl mx-auto text-l">{{new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}}</span>
    <router-link to="/">
        <h2 class="mt-4 max-w-3xl mx-auto text-5xl"><strong>NEAR TRIBUNE</strong></h2>
    </router-link>
    <div class="flex w-1/4 justify-start items-center list-none">
      <h2 class="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">Your Tips: {{(totalTips/1000000000000000000000000).toFixed(4)}} Ⓝ</h2>
      <button
        v-if="accountId"
        class="flex items-center justify-center h-12 w-24 rounded-md bg-gray-500 text-white mx-2"
        @click.prevent="handleWithdraw"
      >
        Withdraw
      </button>
    </div>
    <div class="flex w-1/2 justify-end items-center list-none">
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
</template>
<script>
import Login from "@/components/Login.vue"
import { PlusIcon } from "@heroicons/vue/outline"
import { usePosts } from "@/composables/posts"
import { useTips } from "@/composables/tips"
import AddPostDialog from "@/components/AddPostDialog.vue"

export default {
  components: {
    PlusIcon,
    Login,
    AddPostDialog,

  },
  setup() {
    return {
      ...usePosts(),
      ...useTips()
    }
  },
}
</script>