import React from "react"
import Header from "@/components/organisms/Header"
import Feed from "@/components/organisms/Feed"

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Feed />
      </main>
    </div>
  )
}

export default HomePage