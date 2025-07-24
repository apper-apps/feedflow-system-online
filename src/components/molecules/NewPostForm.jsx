import React, { useState } from "react"
import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import Textarea from "@/components/atoms/Textarea"
import ApperIcon from "@/components/ApperIcon"

const NewPostForm = ({ onSubmit, isSubmitting }) => {
  const [content, setContent] = useState("")
  const [authorName, setAuthorName] = useState("")
  const maxLength = 500
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!content.trim() || !authorName.trim()) return
    
    onSubmit({
      content: content.trim(),
      author: authorName.trim()
    })
    
    setContent("")
  }
  
  const remainingChars = maxLength - content.length
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-card p-6 mb-8"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
          <ApperIcon name="Edit3" className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 font-display">
          Share your thoughts
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {!authorName && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your name
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What's on your mind?
          </label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts with the community..."
            rows={4}
            maxLength={maxLength}
            className="resize-none"
            required
          />
          <div className="flex justify-between items-center mt-2">
            <span className={`text-sm ${remainingChars < 50 ? 'text-orange-500' : remainingChars < 20 ? 'text-red-500' : 'text-gray-500'}`}>
              {remainingChars} characters remaining
            </span>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!content.trim() || !authorName.trim() || isSubmitting}
            className="flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
                <span>Posting...</span>
              </>
            ) : (
              <>
                <ApperIcon name="Send" className="w-4 h-4" />
                <span>Share Post</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  )
}

export default NewPostForm