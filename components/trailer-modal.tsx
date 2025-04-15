"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { searchMovieTrailer } from "@/lib/youtube-api"
import type { Movie } from "@/types/movie"
import { Skeleton } from "@/components/ui/skeleton"

interface TrailerModalProps {
  movie: Movie | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function TrailerModal({ movie, open, onOpenChange }: TrailerModalProps) {
  const [trailerKey, setTrailerKey] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadTrailer() {
      if (!movie || !open) return

      try {
        setLoading(true)
        setError(null)

        // Use YouTube API to search for the movie trailer
        const key = await searchMovieTrailer(movie.title)
        setTrailerKey(key)
      } catch (err) {
        console.error("Failed to fetch trailer:", err)
        setError("Could not load trailer. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadTrailer()
  }, [movie, open])

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setTrailerKey(null)
      setError(null)
    }
  }, [open])

  if (!movie) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>Trailer: {movie.title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="aspect-video w-full overflow-hidden rounded-md">
          {loading ? (
            <Skeleton className="h-full w-full" />
          ) : error ? (
            <div className="h-full w-full flex items-center justify-center bg-muted">
              <p className="text-muted-foreground">{error}</p>
            </div>
          ) : trailerKey ? (
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title={`${movie.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-muted">
              <p className="text-muted-foreground">No trailer available</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
