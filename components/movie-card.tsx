"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Bookmark, BookmarkCheck, Star, Youtube, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Movie } from "@/types/movie"
import { toggleWatchlist, isInWatchlist } from "@/lib/local-storage"
import { useToast } from "@/hooks/use-toast"
import { searchMovieTrailer } from "@/lib/youtube-api"

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { toast } = useToast()
  const [inWatchlist, setInWatchlist] = useState(() => isInWatchlist(movie.id))
  const [loading, setLoading] = useState(false)

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click event
    const newState = toggleWatchlist(movie)
    setInWatchlist(newState)

    toast({
      title: newState ? "Added to watchlist" : "Removed from watchlist",
      description: movie.title,
      duration: 2000,
    })
  }

  const openYouTube = async () => {
    setLoading(true)
    try {
      // Search for the full movie on YouTube
      const videoId = await searchMovieTrailer(`${movie.title} full movie`)
      if (videoId) {
        // Open YouTube in a new tab
        window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank")
      } else {
        toast({
          title: "Movie not found",
          description: "Could not find this movie on YouTube",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error opening YouTube:", error)
      toast({
        title: "Error",
        description: "Could not open YouTube",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={item} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="overflow-hidden h-full flex flex-col group cursor-pointer" onClick={openYouTube}>
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : `/placeholder.svg?height=450&width=300&text=${encodeURIComponent(movie.title)}`
            }
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
            <Button
              variant="secondary"
              size="sm"
              className="w-full gap-1 bg-red-600 hover:bg-red-700 text-white"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">Loading...</span>
              ) : (
                <span className="flex items-center gap-2">
                  <Youtube className="h-4 w-4" /> Watch on YouTube
                </span>
              )}
            </Button>
          </div>

          <div className="absolute top-2 right-2 z-10">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-background transition-colors"
              onClick={handleWatchlistToggle}
            >
              {inWatchlist ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            </motion.button>
          </div>

          {movie.vote_average > 0 && (
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs">
              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          )}
        </div>

        <CardContent className="flex-1 flex flex-col p-4">
          <h3 className="font-semibold line-clamp-1 mb-1 flex items-center gap-2">
            {movie.title}
            <ExternalLink className="h-3 w-3 text-muted-foreground" />
          </h3>

          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {new Date(movie.release_date).getFullYear()}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
            {movie.overview || "No description available."}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
