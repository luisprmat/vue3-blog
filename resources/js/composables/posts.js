import { ref } from 'vue'

export default function usePosts() {
  const posts = ref({})

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

  return {
    posts,
    getPosts,
  }
}
