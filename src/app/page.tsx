"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import "./globals.css"

export default function Home() {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [hoverCount, setHoverCount] = useState(0)

  const moveNoButton = () => {
    setHoverCount((prev) => prev + 1)
    const intensity = Math.min(hoverCount * 20 + 150, 400)
    const x = Math.random() * intensity - intensity / 2
    const y = Math.random() * intensity - intensity / 2
    setNoPosition({ x, y })
  }

  const handleNoClick = () => {
    alert("Too slow 😜 You can’t say no!")
    const x = (Math.random() - 0.5) * 600
    const y = (Math.random() - 0.5) * 400
    setNoPosition({ x, y })
  }

  const handleYes = async () => {
    try {
      await fetch("/api/yes", { method: "POST" })
      alert("Thank You 🙇")
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

      <h1 className="title glow-text">
        Would you like to go on a date with me? 🌌
      </h1>

      <div className="buttons">
        <button onClick={handleYes} className="yes-btn">
          Yes 🫡
        </button>

        <motion.button
          onMouseEnter={moveNoButton}
          onClick={handleNoClick}
          className="no-btn"
          animate={{ x: noPosition.x, y: noPosition.y }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 12,
          }}
          whileTap={{ scale: 0.8, rotate: 10 }}
        >
          No 😅
        </motion.button>
      </div>
    </main>
  )
}
