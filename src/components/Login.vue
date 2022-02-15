<template>
  <div class="px-5 flex w-1/2 justify-end items-center">
    <div v-if="accountId">
      <div class="flex items-center justify-between">
        <div
          class="flex items-center justify-center h-12 w-36 rounded-md bg-gray-500 text-white mx-2"
        >
          <UserIcon class="w-6 h-6 text-black-500" />
          <h4 class="mr-2">{{ accountId }}</h4>
        </div>
        <button
          class="flex items-center justify-center h-12 w-12 rounded-md bg-gray-500 text-white mx-2"
          @click="signOut"
        >
          <LogoutIcon class="w-6 h-6 text-black-500" />
        </button>
      </div>
    </div>
    <button
      v-else
      @click="signIn"
      class="self-end rounded-3xl  py-3 px-10 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      Log In
    </button>
  </div>
</template>

<script>
import { UserIcon, LogoutIcon } from "@heroicons/vue/outline"
import { ref } from "vue";
import { wallet, CONTRACT_ID } from "@/services/near"
export default {
  components: {
    UserIcon,
    LogoutIcon,
  },
  setup() {
    const accountId = ref("");
    accountId.value = wallet.getAccountId()
    return {
      accountId,
      signIn: () =>
        wallet.requestSignIn({
          contractId: CONTRACT_ID,
          methodNames: [], // add methods names to restrict access
        }),
      signOut: () => {
        wallet.signOut();
        localStorage.removeItem(
          `near-api-js:keystore:${accountId.value}:testnet`
        )
        accountId.value = wallet.getAccountId()
        window.location.reload()
      },
    }
  },
}
</script>
