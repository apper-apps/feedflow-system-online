import React from "react"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="AlertTriangle" className="w-10 h-10 text-red-500" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2 font-display">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {message}. We're sorry for the inconvenience. Please try again or refresh the page.
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="gradient-button text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
        >
          <ApperIcon name="RefreshCw" className="w-5 h-5" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  )
}

export default Error