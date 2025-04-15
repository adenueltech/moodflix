// This would normally use environment variables for the API key
// For this demo, we'll use a placeholder key that you would replace with your actual TMDB API key
const TMDB_API_KEY = "YOUR_TMDB_API_KEY" // Replace with your actual API key
const BASE_URL = "https://api.themoviedb.org/3"

import type { Movie } from "@/types/movie"
import { getMoodGenres } from "./mood-mapping"
import { mockMovies, mockTrailers } from "./mock-data"

// Check if we have a valid API key
const hasValidApiKey = TMDB_API_KEY && TMDB_API_KEY !== "YOUR_TMDB_API_KEY"

// Fetch movies by mood (which maps to specific genres)
export async function fetchMoviesByMood(moodId: string): Promise<Movie[]> {
  // If we don't have a valid API key, use mock data
  if (!hasValidApiKey) {
    console.log("Using mock data for movies (no valid API key)")
    return mockMovies[moodId] || mockMovies.happy
  }

  const genres = getMoodGenres(moodId)

  if (!genres || genres.length === 0) {
    throw new Error("Invalid mood or no genres mapped to this mood")
  }

  // Join genres with comma for the API
  const genreParam = genres.join(",")

  const url = `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreParam}&sort_by=popularity.desc&vote_count.gte=100`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("Failed to fetch movies from TMDB")
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error fetching movies:", error)

    // Fallback to mock data if API request fails
    console.log("Falling back to mock data after API error")
    return mockMovies[moodId] || mockMovies.happy
  }
}

// Fetch movie trailer by movie ID
export async function fetchMovieTrailer(movieId: number): Promise<string | null> {
  // If we don't have a valid API key, use mock data
  if (!hasValidApiKey) {
    console.log("Using mock data for trailers (no valid API key)")
    return mockTrailers[movieId] || mockTrailers[1]
  }

  const url = `${BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("Failed to fetch trailer")
    }

    const data = await response.json()

    // Find YouTube trailers
    const trailers = data.results.filter(
      (video: any) => (video.type === "Trailer" || video.type === "Teaser") && video.site === "YouTube",
    )

    // Return the key of the first trailer, or null if none found
    return trailers.length > 0 ? trailers[0].key : null
  } catch (error) {
    console.error("Error fetching trailer:", error)

    // Fallback to mock trailer data after API error
    console.log("Falling back to mock trailer data after API error")
    return mockTrailers[movieId] || mockTrailers[1]
  }
}
