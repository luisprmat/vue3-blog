import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default function usePosts() {
  const posts = ref({})
  const router = useRouter()
  const validationErrors = ref({})

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
    try {
      await axios.post('/api/posts', post)
      router.push({ name: 'posts.index' })
    } catch (error) {
      if (error.response?.data) {
        validationErrors.value = error.response.data.errors
      }
    }
  }

  return {
    posts,
    getPosts,
    storePost,
    validationErrors,
  }
}
