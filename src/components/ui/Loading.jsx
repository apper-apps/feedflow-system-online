import React from "react"

const Loading = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {[...Array(3)].map((_, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg shadow-card p-6 animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Author and timestamp skeleton */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
              </div>
            </div>
          </div>
          
          {/* Content skeleton */}
          <div className="space-y-3">
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-4/6"></div>
          </div>
          
          {/* Actions skeleton */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-gradient-to-br from-gray-200 to-gray-300 rounded"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-8"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Loading