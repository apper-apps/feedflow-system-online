import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"
import PostCard from "@/components/molecules/PostCard"
import NewPostForm from "@/components/molecules/NewPostForm"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import PostService from "@/services/api/postService"

const Feed = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const newPostFormRef = useRef(null)
  
  const loadPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await PostService.getAll()
      setPosts(data)
    } catch (err) {
      setError("Failed to load posts. Please try again.")
      console.error("Error loading posts:", err)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadPosts()
  }, [])
  
  const handleCreatePost = async (postData) => {
    try {
      setIsSubmitting(true)
      const newPost = await PostService.create(postData)
      setPosts(prevPosts => [newPost, ...prevPosts])
      toast.success("Post shared successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } catch (err) {
      toast.error("Failed to share post. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
      console.error("Error creating post:", err)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const scrollToNewPost = () => {
    newPostFormRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "center"
    })
  }
  
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-card p-6 animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full"></div>
              <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20"></div>
              <div className="h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
              <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 ml-auto"></div>
            </div>
          </div>
        </div>
        <Loading />
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Error message={error} onRetry={loadPosts} />
      </div>
    )
  }
  
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div ref={newPostFormRef}>
        <NewPostForm 
          onSubmit={handleCreatePost}
          isSubmitting={isSubmitting}
        />
      </div>
      
      {posts.length === 0 ? (
        <Empty onCreatePost={scrollToNewPost} />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 font-display">
              Recent Posts
            </h2>
            <span className="text-sm text-gray-500">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'}
            </span>
          </div>
          
          <AnimatePresence mode="popLayout">
            {posts.map((post) => (
              <motion.div
                key={post.Id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

export default Feed