"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Youtube } from "lucide-react"
import { useRouter } from "next/navigation"

export default function YouTubeSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchTerm.trim()) return

    setLoading(true)
    // Navigate to search results page
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>
      <Button type="submit" disabled={loading || !searchTerm.trim()} className="bg-red-600 hover:bg-red-700">
        <Youtube className="h-4 w-4 mr-2" />
        Search
      </Button>
    </form>
  )
}
