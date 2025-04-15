"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import MovieGrid from "@/components/movie-grid"
import { fetchMoviesByMood } from "@/lib/tmdb"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Movie } from "@/types/movie"
import { getMoodEmoji, getMoodTitle } from "@/lib/mood-mapping"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const mood = searchParams.get("mood")
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadMovies() {
      if (!mood) return

      try {
        setLoading(true)
        const results = await fetchMoviesByMood(mood)
        setMovies(results)
      } catch (err) {
        console.error("Failed to fetch movies:", err)
        setError("Failed to load movies. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [mood])

  if (!mood) {
    return (
      <div className="text-center py-20">
        <p className="text-xl">No mood selected. Please go back and select a mood.</p>
        <Link href="/" className="mt-4 inline-block">
          <Button>Go Back Home</Button>
        </Link>
      </div>
    )
  }

  const moodEmoji = getMoodEmoji(mood)
  const moodTitle = getMoodTitle(mood)

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
            Back
          </Button>
        </Link>
        <div className="text-sm text-muted-foreground">Showing movies for your mood</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
          <span className="text-4xl md:text-5xl">{moodEmoji}</span>
          <span>Movies for when you feel {moodTitle}</span>
        </h1>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-[300px] w-full rounded-xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-red-500">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      ) : (
        <MovieGrid movies={movies} />
      )}
    </div>
  )
}
