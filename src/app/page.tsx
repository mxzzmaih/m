"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import "./globals.css"

export default function Home() {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })

  const moveNoButton = () => {
    const x = Math.random() * 300 - 150
    const y = Math.random() * 200 - 100
    setNoPosition({ x, y })
  }

  const handleYes = async () => {
    try {
      await fetch("/api/yes", { method: "POST" })
      alert("Thank You 💫")
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const container = document.querySelector(".stars")
    if (!container) return

    const interval = setInterval(() => {
      const star = document.createElement("div")
      star.classList.add("star")
      star.style.left = `${Math.random() * 100}%`
      star.style.animationDuration = `${3 + Math.random() * 3}s`
      container.appendChild(star)
      setTimeout(() => star.remove(), 5000)
    }, 400)

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="sky-container">
      <div className="stars"></div>
      <h1 className="title">Would you like to go on a date with me? 🌌</h1>

      <div className="buttons">
        <button onClick={handleYes} className="yes-btn">
          Yes 
        </button>

        <motion.button
          onMouseEnter={moveNoButton}
          className="no-btn"
          animate={{ x: noPosition.x, y: noPosition.y }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
        >
          No 😅
        </motion.button>
      </div>

      
    </main>
  )
}
