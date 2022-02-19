import { ref, reactive, onMounted } from "vue"
import { tipAuthor, getTips, withdrawTips, wallet } from "@/services/near"
import { useToast } from "vue-toastification"

const isLoading = ref(false)
const totalTips = ref(0)
const owner = process.env.VUE_APP_CONTRACT_ID
const toast = useToast();

export const useTips = () => {
  const accountId = wallet.getAccountId()
  const err = ref(null)

  onMounted(async () => {
    try {
      totalTips.value = await getTips()
    } catch (e) {
      err.value = e
      toast.error(err.value)
    }
  })

  const handleTipAuthor = async (form) => {
    try {
      isLoading.value = true
      await tipAuthor(form)
      totalTips.value = await getTips()
      isLoading.value = false
      toast.success("Tips sent successfully", {
        timeout: 2000
      })
    } catch (e) {
      err.value = e
      isLoading.value = false
      toast.error(err.value)
    }
  }

  const handleWithdraw = async () => {
    try {
      isLoading.value = true
      await withdrawTips()
      totalTips.value = await getTips()
      isLoading.value = false
      toast.success("Tips withdrawal succeeded", {
        timeout: 2000
      })
    } catch (e) {
      err.value = e
      isLoading.value = false
      toast.error(err.value)
    }
  }

  return {
    accountId,
    owner,
    isLoading,
    totalTips,
    toast,
    handleTipAuthor,
    handleWithdraw
}
}
