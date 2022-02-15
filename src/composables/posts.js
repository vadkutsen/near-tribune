import { ref, onMounted, reactive } from "vue"
import { wallet, getPosts, addPost, updatePost, getDonations } from "@/services/near"

const showModal = ref(false)
const showEdit = ref(false)
const posts = ref([])

export const usePosts = () => {
  const accountId = wallet.getAccountId()
  const owner = process.env.VUE_APP_CONTRACT_ID
  const err = ref(null)
  const isLoading = ref(false)
  const form = reactive({
    title: "",
    text: "",
  })

  onMounted(async () => {
    isLoading.value = true
    try {
      posts.value = await getPosts()
      posts.value.reverse()
      isLoading.value = false
    } catch (e) {
      err.value = e
      isLoading.value = false
      alert(err.value)
    }
  })

  const toggleModal = () => {
    showModal.value = !showModal.value
  }

  const handleAddPost = async () => {
    const post = {
      title: form.title.trim(),
      text: form.text.trim(),
    }
    try {
      isLoading.value = true
      await addPost(post)
      posts.value = await getPosts()
      isLoading.value = false
      showModal.value = false
    } catch (e) {
      err.value = e
      isLoading.value = false
      alert(err.value)
    }
  }

  const toggleEdit = () => {
    showEdit.value = !showEdit.value
  }

  const handleUpdatePost = async (post) => {
    try {
      isLoading.value = true
      await updatePost(post)
      posts.value = await getPosts()
      isLoading.value = false
      showModal.value = false
    } catch (e) {
      err.value = e
      isLoading.value = false
      alert(err.value)
    }
  }

  // const handleAdopt = async (props) => {
  //   try {
  //     isLoading.value = true
  //     await adopt(props)
  //     pets.value = await getPets()
  //     isLoading.value = false
  //   } catch (e) {
  //     err.value = e
  //     isLoading.value = false
  //     alert(err.value)
  //   }
  // }

  return {
    accountId,
    owner,
    posts,
    isLoading,
    form,
    showModal,
    showEdit,
    toggleModal,
    toggleEdit,
    handleAddPost,
    handleUpdatePost
  }
}
