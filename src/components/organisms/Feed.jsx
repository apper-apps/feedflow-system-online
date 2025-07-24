import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import PostService from "@/services/api/postService";
import ApperIcon from "@/components/ApperIcon";
import Header from "@/components/organisms/Header";
import NewPostForm from "@/components/molecules/NewPostForm";
import PostCard from "@/components/molecules/PostCard";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";

const Feed = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
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
  
  const handleSearch = async (query) => {
    setSearchQuery(query)
    
    if (!query.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }
    
    try {
      setIsSearching(true)
      const results = await PostService.search(query)
      setSearchResults(results)
    } catch (err) {
      console.error("Error searching posts:", err)
      toast.error("Failed to search posts. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } finally {
      setIsSearching(false)
    }
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
  
const currentPosts = searchQuery ? searchResults : posts
return (
      <div className="min-h-screen bg-background">
    <div className="max-w-2xl mx-auto">
        {/* Header with Search */}
        <Header onSearch={handleSearch} isSearching={isSearching} />
        {/* New Post Form */}
        <div className="px-4 mb-6">
<NewPostForm onSubmit={handleCreatePost} isSubmitting={isSubmitting} />
        </div>
              
        {searchQuery ? <div className="space-y-6 mt-8">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 font-display">Search Results
                                </h2>
                <span className="text-sm text-gray-500">
                    {searchResults.length} {searchResults.length === 1 ? "result" : "results"} for "{searchQuery}"
                                </span>
            </div>
            {searchResults.length === 0 ? <div className="text-center py-12">
                <div
                    className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Search" className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                <p className="text-gray-500">Try adjusting your search terms or{" "}
                    <button
                        onClick={() => handleSearch("")}
                        className="text-primary hover:text-primary/80 underline">clear search
                                        </button>
                </p>
            </div> : <AnimatePresence mode="popLayout">
                {searchResults.map(post => <motion.div
                    key={post.Id}
                    layout
                    initial={{
                        opacity: 0,
                        scale: 0.9
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.9
                    }}
                    transition={{
                        duration: 0.2
                    }}>
                    <PostCard post={post} />
                </motion.div>)}
            </AnimatePresence>}
        </div> : currentPosts.length === 0 ? <Empty onCreatePost={scrollToNewPost} /> : <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 font-display">Recent Posts
                                </h2>
                <span className="text-sm text-gray-500">
                    {currentPosts.length} {currentPosts.length === 1 ? "post" : "posts"}
                </span>
            </div>
            <AnimatePresence mode="popLayout">
                {currentPosts.map(post => <motion.div
                    key={post.Id}
                    layout
                    initial={{
                        opacity: 0,
                        scale: 0.9
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.9
                    }}
                    transition={{
                        duration: 0.2
                    }}>
                    <PostCard post={post} />
                </motion.div>)}
            </AnimatePresence>
        </div>}
    </div></div>
  )
}

export default Feed