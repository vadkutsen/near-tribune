import { ref, onMounted } from "vue"
import { tipAuthor, getTips, withdrawTips, wallet } from "@/services/near"

const isLoading = ref(false)
const totalTips = ref(0)
const owner = process.env.VUE_APP_CONTRACT_ID

export const useTips = () => {
  const accountId = wallet.getAccountId()
  // const owner = process.env.VUE_APP_CONTRACT_ID
  const tips = ref(null)
  const err = ref(null)

  onMounted(async () => {
    try {
      totalTips.value = await getTips(accountId)
    } catch (e) {
      err.value = e
      alert(err.value)
    }
  })


  const handleTipAuthor = async () => {
    try {
      isLoading.value = true
      await tipAuthor(tips.value)
      totalTips.value = await getTips()
      isLoading.value = false
    } catch (e) {
      err.value = e
      alert(err.value)
      isLoading.value = false
    }
  }

  const handleWithdraw = async () => {
    try {
      isLoading.value = true
      await withdrawTips()
      totalTips.value = await getTips()
      isLoading.value = false
    } catch (e) {
      err.value = e
      alert(err.value)
      isLoading.value = false
    }
  }

  return {
    accountId,
    owner,
    isLoading,
    tips,
    totalTips,
    handleTipAuthor,
    handleWithdraw
}
}
