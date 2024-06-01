import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default function usePosts() {
  const posts = ref({})
  const router = useRouter()
  const validationErrors = ref({})
  const isLoading = ref(false)

  const getPosts = async (page = 1, category = '', sort = '') => {
    try {
      const categorySelected = category === '' ? '' : '&category=' + category
      const sortField = sort === '' ? '' : '&sort=' + sort

      const response = await axios.get(
        '/api/posts?page=' + page + categorySelected + sortField
      )
      posts.value = response.data
    } catch (error) {
      console.error(error)
    }
  }

  const storePost = async (post) => {
    if (isLoading.value) return

    try {
      isLoading.value = true
      validationErrors.value = {}

      let serializedPost = new FormData()

      for (let item in post) {
        if (post.hasOwnProperty(item)) {
          serializedPost.append(item, post[item])
        }
      }

      await axios.post('/api/posts', serializedPost)
      router.push({ name: 'posts.index' })
    } catch (error) {
      if (error.response?.data) {
        validationErrors.value = error.response.data.errors
        isLoading.value = false
      }
    }
  }

  return {
    posts,
    getPosts,
    storePost,
    validationErrors,
    isLoading,
  }
}
