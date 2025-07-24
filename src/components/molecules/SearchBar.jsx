import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import { Input } from "@/components/atoms/Input"

const SearchBar = ({ onSearch, isSearching }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const inputRef = useRef(null)

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchValue.trim()) {
        onSearch(searchValue)
      } else if (searchValue === "") {
        onSearch("")
      }
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchValue, onSearch])

  const handleExpand = () => {
    setIsExpanded(true)
  }

  const handleCollapse = () => {
    setIsExpanded(false)
    setSearchValue("")
    onSearch("")
  }

  const handleInputChange = (e) => {
    setSearchValue(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleCollapse()
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.button
            key="search-button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={handleExpand}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ApperIcon name="Search" className="w-5 h-5" />
          </motion.button>
        ) : (
          <motion.div
            key="search-input"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "280px" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex items-center bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
          >
            <div className="pl-3 pr-2">
              {isSearching ? (
                <div className="animate-spin">
                  <ApperIcon name="Loader2" className="w-4 h-4 text-gray-400" />
                </div>
              ) : (
                <ApperIcon name="Search" className="w-4 h-4 text-gray-400" />
              )}
            </div>
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search posts..."
              value={searchValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-1 border-0 bg-transparent px-0 py-2 text-sm focus:ring-0 focus:outline-none"
            />
            <button
              onClick={handleCollapse}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <ApperIcon name="X" className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchBar