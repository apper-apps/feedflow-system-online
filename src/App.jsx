import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import HomePage from "@/components/pages/HomePage"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastStyle={{
            borderRadius: "8px",
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            minHeight: "56px",
            padding: "16px"
          }}
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  )
}

export default App