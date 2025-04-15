import type { Movie } from "@/types/movie"

const WATCHLIST_KEY = "moodflix-watchlist"

// Get watchlist from localStorage
export function getWatchlist(): Movie[] {
  if (typeof window === "undefined") return []

  try {
    const watchlist = localStorage.getItem(WATCHLIST_KEY)
    return watchlist ? JSON.parse(watchlist) : []
  } catch (error) {
    console.error("Error getting watchlist from localStorage:", error)
    return []
  }
}

// Add movie to watchlist
export function addToWatchlist(movie: Movie): void {
  if (typeof window === "undefined") return

  try {
    const watchlist = getWatchlist()

    // Check if movie is already in watchlist
    if (!watchlist.some((m) => m.id === movie.id)) {
      const updatedWatchlist = [...watchlist, movie]
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedWatchlist))
    }
  } catch (error) {
    console.error("Error adding to watchlist:", error)
  }
}

// Remove movie from watchlist
export function removeFromWatchlist(movieId: number): void {
  if (typeof window === "undefined") return

  try {
    const watchlist = getWatchlist()
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieId)
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedWatchlist))
  } catch (error) {
    console.error("Error removing from watchlist:", error)
  }
}

// Toggle movie in watchlist (add if not present, remove if present)
export function toggleWatchlist(movie: Movie): boolean {
  if (typeof window === "undefined") return false

  try {
    const watchlist = getWatchlist()
    const isInList = watchlist.some((m) => m.id === movie.id)

    if (isInList) {
      removeFromWatchlist(movie.id)
      return false
    } else {
      addToWatchlist(movie)
      return true
    }
  } catch (error) {
    console.error("Error toggling watchlist:", error)
    return false
  }
}

// Check if movie is in watchlist
export function isInWatchlist(movieId: number): boolean {
  if (typeof window === "undefined") return false

  try {
    const watchlist = getWatchlist()
    return watchlist.some((movie) => movie.id === movieId)
  } catch (error) {
    console.error("Error checking watchlist:", error)
    return false
  }
}
