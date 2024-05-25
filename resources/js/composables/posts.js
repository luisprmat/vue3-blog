import { ref } from 'vue'

export default function usePosts() {
  const posts = ref([])

  const getPosts = async () => {
    try {
      const response = await axios.get('/api/posts')
      posts.value = response.data.data
    } catch (error) {
      console.error(error)
    }
  }

  return {
    posts,
    getPosts,
  }
}
