"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Youtube } from "lucide-react"

interface SearchResultsProps {
  results: any[]
}

export default function SearchResults({ results }: SearchResultsProps) {
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

  const openYouTube = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank")
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {results.map((result, index) => (
        <motion.div key={index} variants={item} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card
            className="overflow-hidden h-full flex flex-col group cursor-pointer"
            onClick={() => openYouTube(result.id.videoId)}
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={result.snippet.thumbnails.high.url || "/placeholder.svg"}
                alt={result.snippet.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Youtube className="h-12 w-12 text-red-600" />
              </div>
            </div>
            <CardContent className="flex-1 flex flex-col p-4">
              <h3 className="font-semibold line-clamp-2 mb-2">{result.snippet.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                {result.snippet.description || "No description available."}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
