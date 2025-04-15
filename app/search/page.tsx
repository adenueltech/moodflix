"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { searchMovies } from "@/lib/youtube-api"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SearchResults from "@/components/search-results"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchResults() {
      if (!query) return

      try {
        setLoading(true)
        setError(null)
        const searchResults = await searchMovies(query)
        setResults(searchResults)
      } catch (err) {
        console.error("Failed to fetch search results:", err)
        setError("Failed to load search results. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [query])

  if (!query) {
    return (
      <div className="text-center py-20">
        <p className="text-xl">No search query provided. Please enter a search term.</p>
        <Link href="/" className="mt-4 inline-block">
          <Button>Go Back Home</Button>
        </Link>
      </div>
    )
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
        <h1 className="text-3xl md:text-4xl font-bold">Search Results for "{query}"</h1>
        <p className="text-muted-foreground mt-2">Click on any result to watch on YouTube</p>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-[200px] w-full rounded-xl" />
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
      ) : results.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl">No results found for "{query}"</p>
          <Link href="/" className="mt-4 inline-block">
            <Button>Try Another Search</Button>
          </Link>
        </div>
      ) : (
        <SearchResults results={results} />
      )}
    </div>
  )
}
