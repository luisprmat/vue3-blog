import { ref } from 'vue'

export default function usePosts() {
  const posts = ref({})

  const getPosts = async (page = 1, category = '') => {
    try {
      const categorySelected = category === '' ? '' : '&category=' + category

      const response = await axios.get(
        '/api/posts?page=' + page + categorySelected
      )
      posts.value = response.data
    } catch (error) {
      console.error(error)
    }
  }

  return {
    posts,
    getPosts,
  }
}
