"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { moods } from "@/lib/mood-mapping"
import { cn } from "@/lib/utils"

export default function MoodGrid() {
  const router = useRouter()

  const handleMoodSelect = (moodId: string) => {
    router.push(`/results?mood=${moodId}`)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-4xl"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {moods.map((mood) => (
        <motion.div
          key={mood.id}
          variants={item}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "flex flex-col items-center justify-center p-6 rounded-xl cursor-pointer transition-all",
            "bg-gradient-to-br shadow-md hover:shadow-lg",
            "from-background to-muted border border-border",
            "hover:border-primary/50",
          )}
          onClick={() => handleMoodSelect(mood.id)}
        >
          <span className="text-4xl mb-3">{mood.emoji}</span>
          <span className="font-medium text-center">{mood.title}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}
