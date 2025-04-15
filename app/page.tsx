"use client"

import MoodGrid from "@/components/mood-grid"
import YouTubeSearch from "@/components/youtube-search"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { moods } from "@/lib/mood-mapping"

export default function Home() {
  const router = useRouter()

  const handleSurpriseMe = () => {
    // Get a random mood
    const randomMood = moods[Math.floor(Math.random() * moods.length)]
    router.push(`/results?mood=${randomMood.id}`)
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-10">
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
          How are you feeling today?
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover the perfect movie based on your current mood, not just genres or titles.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="w-full max-w-md"
      >
        <YouTubeSearch />
      </motion.div>

      <MoodGrid />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Button
          variant="outline"
          size="lg"
          className="w-full group relative overflow-hidden rounded-full border-dashed border-2 hover:border-solid transition-all duration-300"
          onClick={handleSurpriseMe}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          <span className="relative flex items-center justify-center gap-2">
            <span className="animate-spin-slow">🎲</span>
            Surprise Me!
          </span>
        </Button>
      </motion.div>
    </div>
  )
}
