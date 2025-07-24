import React from "react"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ onCreatePost }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="MessageCircle" className="w-12 h-12 text-primary" />
      </div>
      
      <h3 className="text-2xl font-semibold text-gray-900 mb-3 font-display gradient-text">
        Welcome to FeedFlow!
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        Your feed is looking a little quiet. Why not share your first thought and get the conversation started?
      </p>
      
      <button
        onClick={onCreatePost}
        className="gradient-button text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
      >
        <ApperIcon name="Plus" className="w-5 h-5" />
        <span>Share Your First Post</span>
      </button>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl text-sm text-gray-500">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
            <ApperIcon name="Edit3" className="w-5 h-5 text-blue-600" />
          </div>
          <span>Share your thoughts</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
            <ApperIcon name="Users" className="w-5 h-5 text-green-600" />
          </div>
          <span>Connect with others</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
            <ApperIcon name="Heart" className="w-5 h-5 text-purple-600" />
          </div>
          <span>Discover great content</span>
        </div>
      </div>
    </div>
  )
}

export default Empty