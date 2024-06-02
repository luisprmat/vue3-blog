import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default function usePosts() {
  const posts = ref({})
  const post = ref({})
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

  const getPost = async (id) => {
    try {
      const response = await axios.get('/api/posts/' + id)
      post.value = response.data.data
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

  const updatePost = async (post) => {
    if (isLoading.value) return

    try {
      isLoading.value = true
      validationErrors.value = {}
      await axios.put('/api/posts/' + post.id, post)
      router.push({ name: 'posts.index' })
    } catch (error) {
      if (error.response?.data) {
        validationErrors.value = error.response.data.errors
      }
    } finally {
      isLoading.value = false
    }
  }

  return {
    posts,
    post,
    getPosts,
    getPost,
    storePost,
    updatePost,
    validationErrors,
    isLoading,
  }
}
