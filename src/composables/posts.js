import { ref, onMounted, reactive } from "vue"
import { wallet, getPosts, addPost, updatePost } from "@/services/near"
import { useToast } from "vue-toastification"

const showModal = ref(false)
const showEdit = ref(false)
const posts = ref([])
const isLoading = ref(false)
const toast = useToast();

export const usePosts = () => {
  const accountId = wallet.getAccountId()
  const owner = process.env.VUE_APP_CONTRACT_ID
  const err = ref(null)
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
      toast.error(err.value)
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
      posts.value.reverse()
      isLoading.value = false
      showModal.value = false
      toast.success("Post added successfully", {
        timeout: 2000
      })
    } catch (e) {
      err.value = e
      isLoading.value = false
      console.log(err.value)
      // toast.error(err.value)
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
      showEdit.value = false
      toast.success("Post updated successfully", {
        timeout: 2000
      })
    } catch (e) {
      err.value = e
      isLoading.value = false
      // toast.error(err.value)
    }
  }

  return {
    accountId,
    owner,
    posts,
    isLoading,
    form,
    showModal,
    showEdit,
    toast,
    toggleModal,
    toggleEdit,
    handleAddPost,
    handleUpdatePost
  }
}
