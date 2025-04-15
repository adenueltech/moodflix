"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import MovieGrid from "@/components/movie-grid"
import { getWatchlist } from "@/lib/local-storage"
import type { Movie } from "@/types/movie"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<Movie[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setWatchlist(getWatchlist())
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return null // Prevent flash of empty content
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <Link href="/">
          <Button variant="ghost" className="group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold">Your Watchlist</h1>
        <p className="text-muted-foreground mt-2">Movies you've saved for later</p>
      </motion.div>

      {watchlist.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16 space-y-6"
        >
          <div className="text-6xl">🍿</div>
          <h2 className="text-2xl font-semibold">Your watchlist is empty</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Start adding movies to your watchlist by clicking the bookmark icon on any movie card.
          </p>
          <Link href="/">
            <Button size="lg" className="mt-4">
              Discover Movies
            </Button>
          </Link>
        </motion.div>
      ) : (
        <MovieGrid movies={watchlist} />
      )}
    </div>
  )
}
