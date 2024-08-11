'use client'
import React from 'react'

const page = () => {
  return (
    <div className="relative w-full h-88 md:h-96 rounded-xl overflow-hidden bg-gray-800 text-white flex items-center justify-center">
  <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }}></div>
  <div className="relative z-10 text-center px-6">
    <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-pulse">🚧 Work in Progress 🚧</h1>
    <p className="text-lg md:text-2xl">We&apos;re crafting something amazing. Stay tuned!</p>
    <p className="text-sm md:text-base mt-4">Thank you for your patience. We&apos;ll be live soon!</p>
  </div>
</div>
  )
}

export default page;