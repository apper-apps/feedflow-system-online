import React from "react"
import { cn } from "@/utils/cn"

const Avatar = ({ 
  src, 
  alt, 
  name, 
  size = "md", 
  className 
}) => {
  const sizes = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl"
  }
  
  const getInitials = (name) => {
    if (!name) return "?"
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }
  
  const gradients = [
    "from-blue-400 to-blue-600",
    "from-green-400 to-green-600", 
    "from-purple-400 to-purple-600",
    "from-pink-400 to-pink-600",
    "from-indigo-400 to-indigo-600",
    "from-orange-400 to-orange-600"
  ]
  
  const getGradient = (name) => {
    if (!name) return gradients[0]
    const index = name.charCodeAt(0) % gradients.length
    return gradients[index]
  }
  
  if (src) {
    return (
      <img
        src={src}
        alt={alt || name || "Avatar"}
        className={cn(
          "rounded-full object-cover",
          sizes[size],
          className
        )}
      />
    )
  }
  
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center text-white font-medium bg-gradient-to-br",
        sizes[size],
        getGradient(name),
        className
      )}
    >
      {getInitials(name)}
    </div>
  )
}

export default Avatar