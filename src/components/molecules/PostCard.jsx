import React from "react"
import { motion } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import Avatar from "@/components/atoms/Avatar"
import ApperIcon from "@/components/ApperIcon"

const PostCard = ({ post }) => {
  const formatTimestamp = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1 p-6"
    >
      {/* Author and timestamp */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Avatar name={post.author} size="md" />
          <div>
            <h3 className="font-semibold text-gray-900 font-display">
              {post.author}
            </h3>
            <p className="text-sm text-gray-500">
              {formatTimestamp(post.timestamp)}
            </p>
          </div>
        </div>
      </div>
      
      {/* Post content */}
      <div className="mb-6">
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </div>
      
      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors duration-200 group">
            <ApperIcon 
              name="Heart" 
              className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" 
            />
            <span className="text-sm font-medium">{post.likes || 0}</span>
          </button>
          
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-200 group">
            <ApperIcon 
              name="MessageCircle" 
              className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" 
            />
            <span className="text-sm font-medium">Reply</span>
          </button>
          
          <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors duration-200 group">
            <ApperIcon 
              name="Share" 
              className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" 
            />
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default PostCard