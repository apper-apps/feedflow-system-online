import postsData from "@/services/mockData/posts.json"

class PostService {
  constructor() {
    this.posts = [...postsData]
  }
  
  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Return posts sorted by timestamp (newest first)
    return [...this.posts].sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    )
  }
  
  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const post = this.posts.find(p => p.Id === parseInt(id))
    if (!post) {
      throw new Error("Post not found")
    }
    return { ...post }
  }
  
  async create(postData) {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const newId = Math.max(...this.posts.map(p => p.Id), 0) + 1
    const newPost = {
      Id: newId,
      author: postData.author,
      content: postData.content,
      timestamp: new Date().toISOString(),
      likes: 0
    }
    
    this.posts.push(newPost)
    return { ...newPost }
  }
  
  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const index = this.posts.findIndex(p => p.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Post not found")
    }
    
    this.posts[index] = { ...this.posts[index], ...updateData }
    return { ...this.posts[index] }
  }
  
  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250))
    
    const index = this.posts.findIndex(p => p.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Post not found")
    }
    
    const deletedPost = { ...this.posts[index] }
    this.posts.splice(index, 1)
return deletedPost
  }
  
  async search(keywords) {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    if (!keywords || keywords.trim() === '') {
      return []
    }
    
    const searchTerms = keywords.toLowerCase().trim().split(/\s+/)
    const filteredPosts = this.posts.filter(post => {
      const content = post.content.toLowerCase()
      const author = post.author.toLowerCase()
      
      return searchTerms.some(term => 
        content.includes(term) || author.includes(term)
      )
    })
    
    return [...filteredPosts].sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    )
  }
}

export default new PostService()