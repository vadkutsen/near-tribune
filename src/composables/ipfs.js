import { ref, reactive, onMounted } from "vue"
// import { tipAuthor, getTips, withdrawTips, wallet } from "@/services/near"
import { useToast } from "vue-toastification"
import { NFTStorage } from 'nft.storage'

const isLoading = ref(false)
// const totalTips = ref(0)
const owner = process.env.VUE_APP_CONTRACT_ID
const toast = useToast();

export const useUpload = () => {
//   const accountId = wallet.getAccountId()
  const err = ref(null)

  onMounted(async () => {
    try {
    //   totalTips.value = await getTips()
    } catch (e) {
      err.value = e
      console.log(err.value)
      // toast.error('Something went wrong. PLease check your console logs')
    }
  })

  const uploadImage = async (form) => {
    const NFT_STORAGE_TOKEN = process.env.VUE_APP_NFTSTORAGETOKEN
    const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })
    try {
      isLoading.value = true
      const data = new Blob([form])
      const cid = await client.storeBlob(data)
      isLoading.value = false
      toast.success("Image uploaded successfully", {
        timeout: 20000
      })
      return cid
    } catch (e) {
      err.value = e
      isLoading.value = false
      console.log(err.value)
      // toast.error('Something went wrong. PLease check your console logs')
    }
  }

//   const handleTipAuthor = async (form) => {
//     try {
//       isLoading.value = true
//       await tipAuthor(form)
//       isLoading.value = false
//       toast.success("Tips sent successfully", {
//         timeout: 20000
//       })
//     } catch (e) {
//       err.value = e
//       isLoading.value = false
//       console.log(err.value)
//       // toast.error('Something went wrong. PLease check your console logs')
//     }
//   }

//   const handleWithdraw = async () => {
//     try {
//       isLoading.value = true
//       await withdrawTips()
//       totalTips.value = await getTips()
//       isLoading.value = false
//       toast.success("Tips withdrawal succeeded", {
//         timeout: 2000
//       })
//     } catch (e) {
//       err.value = e
//       isLoading.value = false
//       console.log(err.value)
//       // toast.error('Something went wrong. PLease check your console logs')
//     }
//   }

  return {
    // accountId,
    owner,
    isLoading,
    // totalTips,
    toast,
    // handleTipAuthor,
    // handleWithdraw
}
}
