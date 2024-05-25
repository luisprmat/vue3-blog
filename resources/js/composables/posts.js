import { ref } from 'vue'

export default function usePosts() {
  const posts = ref({})

  const getPosts = async (page = 1) => {
    try {
      const response = await axios.get('/api/posts?page=' + page)
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
